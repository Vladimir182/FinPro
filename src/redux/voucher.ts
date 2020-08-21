import api from '../api';
import { WithdrawBody, PinBody } from '../api/types';
import { showError } from './error-screen';

const REQUEST_VOUCHER_START = 'REQUEST_VOUCHER_START';
const REQUEST_PRINT_LOADER_START = 'REQUEST_PRINT_LOADER_START';
const REQUEST_VOUCHER_LOGIN_SUCCESS = 'REQUEST_VOUCHER_LOGIN_SUCCESS';
const REQUEST_VOUCHER_FAILURE = 'REQUEST_VOUCHER_FAILURE';
const REQUEST_CASSETTE_INFO_SUCCESS = 'REQUEST_CASSETTE_INFO_SUCCESS';
const CLOSE_VOUCHER_SESSION_SUCCESS = 'CLOSE_VOUCHER_SESSION_SUCCESS';
const SET_AVAILABLE_WITHDRAW_SUM = 'SET_AVAILABLE_WITHDRAW_SUM';
const REQUEST_VOUCHER_PIN_SUCCESS = 'REQUEST_VOUCHER_PIN_SUCCESS';
const SET_VOUCHER_PIN = 'SET_VOUCHER_PIN';
const RESET_VOUCHER_PIN = 'RESET_VOUCHER_PIN';
const RESET_VOUCHER_ERROR_STATUS = 'RESET_VOUCHER_ERROR_STATUS';
const REQUEST_VOUCHER_WITHDRAW_SUCCESS = 'REQUEST_VOUCHER_WITHDRAW_SUCCESS';

const initialState = {
  isLoading: false,
  isPrintLoading: false,
  isPinVerified: false,
  balance: 0,
  pin: '',
  currency: sessionStorage.getItem('finpro-currency') ?? null,
  cassetteInfo: [],
  withdrawSum: null,
  availableWithdrawSum: null,
  waitingWithdrawSocket: false,
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
        // voucherSessionKey: '',
        availableWithdrawSum: null,
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
      sessionStorage.setItem('finpro-currency', payload.currency);

			return {
				...state,
        voucherSessionKey: payload.msid,
        currency: payload.currency,
				isLoading: false,
				isError: false,
				errorMessage: ''
      };
    case REQUEST_CASSETTE_INFO_SUCCESS: 
      return {
        ...state,
        cassetteInfo: payload.cassete_info,
        isLoading: false
      }  
    case CLOSE_VOUCHER_SESSION_SUCCESS:
      sessionStorage.removeItem('finpro-voucher-session-key');

      return {
        ...state,
        voucherSessionKey: '',
        isLoading: false,
				isError: false,
      }
    case SET_AVAILABLE_WITHDRAW_SUM:
      return {
        ...state,
        availableWithdrawSum: payload,
        isLoading: false
      }
    case REQUEST_VOUCHER_WITHDRAW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        waitingWithdrawSocket: true,
        isError: false,
        errorMessage: ''
      }  
    case SET_VOUCHER_PIN:
      return {
        ...state,
        pin: payload
      }
    case RESET_VOUCHER_PIN:
      return {
        ...state,
        pin: '',
        isPinVerified: false
      }  
    case REQUEST_VOUCHER_PIN_SUCCESS:
      return {
        ...state,
        pin: payload.pin,
        isPinVerified: true,
        isLoading: false
      }
		case REQUEST_VOUCHER_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
        errorMessage: payload.message,
        isPrintLoading: false
      };
    case RESET_VOUCHER_ERROR_STATUS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: false,
        isPrintLoading: false,
        isPinVerified: false,
      }
		default:
			return state;
	}
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
    dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: { message: error } });
    dispatch(showError());
  })
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
    dispatch({type: REQUEST_VOUCHER_FAILURE,
      payload: error
    });
    dispatch(showError());
  });
};

export const fetchCassetteInfo = (data: { msid: string }) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});
  
  api.voucher
  .cassetteInfo(data)
  .then((res: any) => {
    const data = res.data;
    
    if (data.success) {
      dispatch({
        type: REQUEST_CASSETTE_INFO_SUCCESS,
        payload: data
      });
    } else {
      dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: '' });
      dispatch(showError());
    }

    return;
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE,
      payload: error
    });
    dispatch(showError());
  });
};

export const fetchVoucherPin = (data: PinBody) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});

  api.voucher
  .pin(data)
  .then((res: any) => {
    const data = res.data;

    if (data.success) {
      dispatch({
        type: REQUEST_VOUCHER_PIN_SUCCESS,
        payload: data
      });  
    } else {
      dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: '' });
    }

    return;
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE,
      payload: error
    });
    dispatch(showError());
  });
}

export const fetchVoucherWithdraw = (data: WithdrawBody) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});

  api.voucher
  .withdraw(data)
  .then((res: any) => {
    const data = res.data;
    if (data.success) {
      dispatch({
        type: REQUEST_VOUCHER_WITHDRAW_SUCCESS,
      });
    } else {
      if (data.validation_errors) {
        dispatch({ 
          type: SET_AVAILABLE_WITHDRAW_SUM,
          payload: data.validation_errors?.cassette_info 
        });
        
        return;
      }
    }
  })
  .catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE,
      payload: error
    });
    dispatch(showError());
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

export const setVoucherPin = (pin: string) => ({
  type: SET_VOUCHER_PIN,
  payload: pin
});

export const resetVoucherPin = () => ({
  type: RESET_VOUCHER_PIN
});

export const resetVoucehrErrors = () => ({
  type: RESET_VOUCHER_ERROR_STATUS
});

export default voucher;