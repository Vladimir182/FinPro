import api from '../api';
console.log('API', api)

const REQUEST_VOUCHER_START = 'REQUEST_VOUCHER_START';
const REQUEST_VOUCHER_LOGIN_SUCCESS = 'REQUEST_VOUCHER_LOGIN_SUCCESS';
const REQUEST_VOUCHER_PINCODE_SUCCESS = 'REQUEST_VOUCHER_PINCODE_SUCCESS';
const REQUEST_VOUCHER_FAILURE = 'REQUEST_VOUCHER_ERROR';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  isLoading: false,
  isCreateLoading: false,
  login: '',
  isVoucherVerified: false,
  pincode: '',
  isPincodeVerified: false,
  sessionKey: '',
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
				sessionKey: '',
				isLoading: true
			};
		case REQUEST_VOUCHER_LOGIN_SUCCESS:
			return {
				...state,
				sessionKey: payload.mskey,
        isLoading: false,
        isError: false,
				errorMessage: ''
			};
		case REQUEST_VOUCHER_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: payload.message
			};
		case LOG_OUT:            
			return initialState;
		default:
			return state;
	}
};

const requestStart = () => ({
	type: REQUEST_VOUCHER_START
});

const requestFailure = (error: any) => ({
	type: REQUEST_VOUCHER_FAILURE,
	payload: error
});

export const logOut = () => (dispatch: any) => {
	return dispatch({
		type: LOG_OUT
	});
};

export const fetchVoucherLogin = (data: any) => (dispatch: any) => {
//   dispatch({ type: REQUEST_VOUCHER_LOGIN_SUCCESS });

	// api.auth
	// 	.login({})
	// 	.then((response: any) => {
	// 		// dispatch(requestSuccess(response.data.data));
	// 		console.log('LOGIN RESPONSE', response)
	// 	})
	// 	.catch((error: any) => {
	// 		// if (error.response.status == 401)
	// 		// 	dispatch({
	// 		// 		type: LOG_OUT
	// 		// 	});
	// 	});
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

export default voucher;
