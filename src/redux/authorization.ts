import api from '../api';
import { fetchTerminal } from './voucher';

const FETCH_AUTH_START = 'FETCH_AUTH_START';
const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';
const LOG_OUT = 'LOG_OUT';

const initialState = {
	isLoading: true,
	isAuth: false,
	isError: false,
	errorMessage: '',
	accessToken: localStorage.getItem('finpro_access_token')
};

interface Action {
  type: string,
  payload: any
}

const authorization = (state = initialState, { type, payload }: Action) => {
	switch (type) {
		case FETCH_AUTH_START:
			return {
				...state,
				isLoading: true
			};
		case FETCH_LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				errorMessage: '',
				accessToken: payload
			};
		case FETCH_LOGIN_FAILURE:
			return {
				...state,
				isAuth: false,
				isLoading: false,
				isError: false,
				errorMessage: ''
			};	
		case FETCH_AUTH_FAILURE:
			return {
				...state,
				isAuth: false,
				isLoading: false,
				isError: true,
				errorMessage: payload,
				accessToken: null
			};
		case LOG_OUT:            
			return {
				...initialState,
				isLoading: false
			};
		default:
			return state;
	}
};

export const fetchCheckAuth = () => (dispatch: any) => {
  dispatch({ type: FETCH_AUTH_START });

  let access_token = localStorage.getItem('finpro_access_token');

  if (!access_token) {
    dispatch({ type: FETCH_AUTH_FAILURE });

    return;
  }

	api.voucher
		.find({ login: 'check'})
		.then((res: any) => {
			dispatch({ type: FETCH_LOGIN_SUCCESS, payload: access_token });
			fetchTerminal()(dispatch);
		}).catch((error: any) => {
			dispatch({ type: FETCH_LOGIN_FAILURE });
		})
};

export const fetchRefreshToken = () => (dispatch: any) => {
  const refresh_token = localStorage.getItem('finpro_refresh_token');
  
  if(!refresh_token) {
    dispatch({ type: FETCH_AUTH_FAILURE });

    return;
  } 

  const  data = {
    grant_type: "refresh_token",
    client_id: "kiosk",
    client_secret: "",
    refresh_token: refresh_token
  }

	api.auth
		.token(data)
		.then((res: any) => {
			const { access_token,  refresh_token} = res.data;

			localStorage.setItem('finpro_access_token', access_token);
			localStorage.setItem('finpro_refresh_token', refresh_token);
			
			dispatch({ type: FETCH_LOGIN_SUCCESS, payload: access_token });
		})
		.catch((error: any) => {
      		dispatch({ type: FETCH_AUTH_FAILURE });
		});
};

export const fetchLogin = ({ username, password }: any) => (dispatch: any) => {
	dispatch({ type: FETCH_AUTH_START });

	const data = {
		grant_type:"password",
		username: username,
		password: password,
		client_id:"kiosk",
		client_secret:""
	}
	
	return api.auth
		.token(data)
		.then((res: any) => {
			const { access_token,  refresh_token} = res.data;

			localStorage.setItem('finpro_access_token', access_token);
			localStorage.setItem('finpro_refresh_token', refresh_token);

			dispatch({ type: FETCH_LOGIN_SUCCESS, payload: access_token });
			fetchTerminal()(dispatch);
		})
		.catch((error: any) => {
			dispatch({ type: FETCH_AUTH_FAILURE });
		});
};

export const logOut = () => (dispatch: any) => {
	localStorage.removeItem('finpro-token');
	localStorage.removeItem('finpro-refreshToken');
  
	return dispatch({
	  type: LOG_OUT
	});
};

export const resetAuthErrors = () => ({
	type: FETCH_LOGIN_FAILURE
});

export default authorization;
