import { combineReducers } from 'redux';
import authorization from './authorization';
import voucher from './voucher';

const rootReducer = combineReducers({
  authorization,
  voucher
});

type RootReducer = typeof rootReducer
export type AppState = ReturnType<RootReducer>

export default rootReducer;