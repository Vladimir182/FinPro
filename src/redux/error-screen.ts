import api from '../api';
import { store } from '../App';
import { FETCH_AUTH_FAILURE } from './authorization';

const SHOW_ERROR_SCREEN = 'SHOW_ERROR_SCREEN';
const HIDE_ERROR_SCREEN = 'HIDE_ERROR_SCREEN';
const REQUEST_SERVER_CONNECTION_SUCCESS = 'REQUEST_SERVER_CONNECTION_SUCCESS';
const REQUEST_SERVER_CONNECTION_FAILURE = 'REQUEST_SERVER_CONNECTION_FAILURE';
const SHOW_PRINTER_ERROR_SCREEN = 'SHOW_PRINTER_ERROR_SCREEN';
const HIDE_PRINTER_ERROR_SCREEN = 'HIDE_PRINTER_ERROR_SCREEN';

const initialState = {
	isShowError: false,
	isShowPrinterError: false,
	serverConnectionStatus: true
};

interface Action {
  type: string,
}

const errorScreen = (state = initialState, { type }: Action) => {
	switch (type) {
		case SHOW_ERROR_SCREEN:
			return {
				...state,
        		isShowError: true
			};
		case HIDE_ERROR_SCREEN:
			return {
				...state,
				isShowError: false
			};
		case SHOW_PRINTER_ERROR_SCREEN:
			return {
				...state,
				isShowPrinterError: true
			};
		case HIDE_PRINTER_ERROR_SCREEN:
			return {
				...state,
				isShowPrinterError: false
			};	
		case REQUEST_SERVER_CONNECTION_SUCCESS:
			return {
				...state,
				serverConnectionStatus: true
			}
		case REQUEST_SERVER_CONNECTION_FAILURE:
			return {
				...state,
				serverConnectionStatus: false
			}  
		default:
			return state;
	}
};

export const fetchServerConnection = () => (dispatch: any) => {
	const { errorScreen} = store.getState();

	api.voucher
		.find({ login: 'check'})
		.then((res: any) => {
			if (!errorScreen.serverConnectionStatus) {
				dispatch({ type: REQUEST_SERVER_CONNECTION_SUCCESS });
			}
		}).catch((error: any) => {
			if (error.status !== 401 && errorScreen.serverConnectionStatus) {
				dispatch({ type: REQUEST_SERVER_CONNECTION_FAILURE });
				// dispatch({ type: FETCH_AUTH_FAILURE });
	  		} else if (error.status === 401 && !errorScreen.serverConnectionStatus) {
				dispatch({ type: REQUEST_SERVER_CONNECTION_SUCCESS });
			}
    	})
};

export const showError = () => ({
  type: SHOW_ERROR_SCREEN
});

export const hideError = () => ({
  type: HIDE_ERROR_SCREEN
});

export const showPrinterError = () => ({
	type: SHOW_PRINTER_ERROR_SCREEN
});

export const hidePrinterError = () => ({
	type: HIDE_PRINTER_ERROR_SCREEN
});
  
export default errorScreen;
