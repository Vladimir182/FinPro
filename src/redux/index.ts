import { combineReducers } from 'redux';
import authorization from './authorization';
import voucher from './voucher';
import screens from './screens';

const rootReducer = combineReducers({
  authorization,
  voucher,
  screens
});

type RootReducer = typeof rootReducer
export type AppState = ReturnType<RootReducer>

export default rootReducer;