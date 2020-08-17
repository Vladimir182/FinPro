import api from '../api';
import { showError } from './error-screen';

const REQUEST_VOUCHER_START = 'REQUEST_VOUCHER_START';
const REQUEST_PRINT_LOADER_START = 'REQUEST_PRINT_LOADER_START';
const REQUEST_VOUCHER_LOGIN_SUCCESS = 'REQUEST_VOUCHER_LOGIN_SUCCESS';
const REQUEST_VOUCHER_PINCODE_SUCCESS = 'REQUEST_VOUCHER_PINCODE_SUCCESS';
const REQUEST_VOUCHER_FAILURE = 'REQUEST_VOUCHER_FAILURE';
const CLOSE_VOUCHER_SESSION_SUCCESS = 'CLOSE_VOUCHER_SESSION_SUCCESS';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  isLoading: false,
  isPrintLoading: false,
  isVoucherVerified: false,
  pincode: '',
  isPincodeVerified: false,
  voucherSessionKey: sessionStorage.getItem('finpro-voucher-session-key') ?? '',
  isError: false,
	errorMessage: ''
};

interface Action {
  type: string,
  payload: any
}

const voucher = (state = initialState, { type, payload }: Action) => {
	switch (type) {
		case REQUEST_VOUCHER_START:
			return {
				...state,
				voucherSessionKey: '',
        isLoading: true,
        isError: false,
      };
    case REQUEST_PRINT_LOADER_START:
      return {
        ...state,
        isPrintLoading: true
      };
		case REQUEST_VOUCHER_LOGIN_SUCCESS:
      sessionStorage.setItem('finpro-voucher-session-key', payload.msid);
			return {
				...state,
				voucherSessionKey: payload.msid,
				isLoading: false,
				isError: false,
				errorMessage: ''
      };
    case CLOSE_VOUCHER_SESSION_SUCCESS:
      sessionStorage.removeItem('finpro-voucher-session-key');
      return {
        ...state,
        voucherSessionKey: '',
        isLoading: false,
				isError: false,
      }
		case REQUEST_VOUCHER_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
        errorMessage: payload.message,
        isPrintLoading: false
			};
		case LOG_OUT:            
			return initialState;
		default:
			return state;
	}
};

export const logOut = () => (dispatch: any) => {
	return dispatch({
		type: LOG_OUT
	});
};

export const fetchVoucherLogin = (voucherLogin: string) => (dispatch: any) => {
  dispatch({ type: REQUEST_VOUCHER_START });
  const data = {
    login: voucherLogin
  };

  api.voucher.find(data).then((res: any) => {
    const data = res.data;

    if (!data.success) {
      dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: { message: data.error_message } });

      return;
    }

    dispatch({ type: REQUEST_VOUCHER_LOGIN_SUCCESS, payload: data });  
  })
  .catch((error: any) => {
    dispatch(showError());
    dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: { message: error } });
  })
};

export const fetchPin = (data: any) => (dispatch: any) => {
  dispatch({ type: REQUEST_VOUCHER_PINCODE_SUCCESS });
	// return API.auth
	// 	.logIn(data)
	// 	.then(response => {
	// 		Cookies.set('token', response.data.data.token);
	// 		dispatch(requestSuccess(response.data.data));
	// 	})
	// 	.catch(error => {
	// 		const res = error.response;

	// 		let formData = {};

	// 		if (res.data.errors) {
	// 			_.map(res.data.errors, item => {
	// 				formData[item.fieldName] = item.message;
	// 			});
	// 			throw new SubmissionError(formData);
	// 		} else {
	// 			formData = { _error: res.data.message };
	// 			throw new SubmissionError(formData);
	// 		}
	// 	});
};

export const fetchPrintVoucher = () => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});
  dispatch({ type: REQUEST_PRINT_LOADER_START });

  api.voucher
  .printVoucher()
  .then((res: any) => {
    const data = res.data;
    console.log(data);
    if (data.success) {
      dispatch({
        type: REQUEST_VOUCHER_LOGIN_SUCCESS,
        payload: data
      });
    } else {
      dispatch(showError());
      dispatch({type: REQUEST_VOUCHER_FAILURE,
        payload: data.messages_error
      });
    }
  })
  .catch((error: any) => {
    dispatch(showError());
    dispatch({type: REQUEST_VOUCHER_FAILURE,
      payload: error
    });
  });
};

export const fetchCloseVoucherSession = (voucherSessionKey: string) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});
  
  const data = {
    msid: voucherSessionKey
  }

  api.voucher.closeSession(data).then((res: any) => {
    const resData = res.data;

    if (resData.success === false) {
      dispatch(showError());
      dispatch({type: REQUEST_VOUCHER_FAILURE, payload: resData.message });
      
      return;
    }

    dispatch({ type: CLOSE_VOUCHER_SESSION_SUCCESS })
  }).catch((error: any) => {
    dispatch(showError());
    dispatch({type: REQUEST_VOUCHER_FAILURE, payload: error });
  })
};

export default voucher;
