import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './index';

export const initStore = initialState => {
	const withDevTools =
		process.env.NODE_ENV !== 'production'
			? composeWithDevTools(applyMiddleware(ReduxThunk))
			: applyMiddleware(ReduxThunk);
	return createStore(rootReducer, initialState, withDevTools);
};
