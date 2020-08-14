import { combineReducers } from 'redux';
import authorization from './authorization';
import voucher from './voucher';
import errorScreen from './error-screen';

const rootReducer = combineReducers({
  authorization,
  voucher,
  errorScreen
});

type RootReducer = typeof rootReducer
export type AppState = ReturnType<RootReducer>

export default rootReducer;