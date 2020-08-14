import api from '../api';

const SHOW_ERROR_SCREEN = 'SHOW_ERROR_SCREEN';
const HIDE_ERROR_SCREEN = 'HIDE_ERROR_SCREEN';
const LOG_OUT = 'LOG_OUT';

const initialState = {
	isShowError: false
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

export const showError = () => ({
  type: SHOW_ERROR_SCREEN
});

export const hideError = () => ({
  type: HIDE_ERROR_SCREEN
});

export default errorScreen;
