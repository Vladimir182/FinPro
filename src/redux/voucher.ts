import api from '../api';
import { WithdrawBody, PinBody } from '../api/types';
import { showError, showPrinterError } from './screens';
import { store } from '../App';

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
const REQUEST_DEPOSIT_INIT_SUCCESS = 'REQUEST_DEPOSIT_INIT_SUCCESS';
const SET_DEPOSIT_SUM = 'SET_DEPOSIT_SUM';
const RESET_BILL_ACCEPTER_STATUS = 'RESET_BILL_ACCEPTER_STATUS';
const SET_SHOW_USER_ABSENCE = 'SET_SHOW_USER_ABSENCE';
const SET_SOCKET_CONNECTION_STATUS = 'SET_SOCKET_CONNECTION_STATUS';
const REQUEST_PRINT_CHECK_SUCCESS = 'REQUEST_PRINT_CHECK_SUCCESS';
const REQUEST_SHOW_BALANCE_SUCCESS = 'REQUEST_SHOW_BALANCE_SUCCESS';
const RESET_BALANCE = 'RESET_BALANCE';
const REQUEST_TERMINAL_SUCCESS = 'REQUEST_TERMINAL_SUCCESS';
const SET_WE_COUNT_BILLS_START = 'SET_WE_COUNT_BILLS_START';
const SET_WE_COUNT_BILLS_REMOVE = 'SET_WE_COUNT_BILLS_REMOVE';

const initialState = {
  isLoading: false,
  isPrintLoading: false,
  terminalId: null,
  isPinVerified: false,
  balance: null,
  pin: '',
  currency: sessionStorage.getItem('finpro-currency') ?? null,
  cassetteInfo: null,
  depositSum: 0,
  isBillAccepterReady: false,
  withdrawSum: null,
  availableWithdrawSum: null,
  voucherSessionKey: sessionStorage.getItem('finpro-voucher-session-key') ?? '',
  isError: false,
  errorMessage: '',
  showUserAbsence: false,
  socketConnectionStatus: false,
  showWeCountBills: false,
};

interface Action {
  type: string,
  payload: any
}

let userAbsenceTimer: any = null;
let userAbsenceIntervalTimer: any = null;

setUserAbsenceInterval(true);

function setUserAbsenceInterval(status: boolean) {
  //@ts-ignore
  if (status && sessionStorage.getItem('finpro-voucher-session-key') && !window.checkAbsenceTimer) {
    //@ts-ignore
    window.checkAbsenceTimer = true;
    userAbsenceTimeoutPreccess();
    
    //@ts-ignore
    if (!userAbsenceIntervalTimer) {
      userAbsenceIntervalTimer = window.setInterval(function() {
        window.addEventListener('mousemove', userAbsenceTimeoutPreccess);
      }, 1000);
    }

  } else if (!status) {
    //@ts-ignore
    window.checkAbsenceTimer = false;
    window.removeEventListener('mousemove', userAbsenceTimeoutPreccess);
    
    if (userAbsenceTimer) {
      clearTimeout(userAbsenceTimer);
      userAbsenceTimer = null;
    }
    if (userAbsenceIntervalTimer) {
      clearInterval(userAbsenceIntervalTimer);
      userAbsenceIntervalTimer = null;
    }
  }
}

export function userAbsenceTimeoutPreccess() {
  if (userAbsenceTimer) {
    clearTimeout(userAbsenceTimer)
  }
  userAbsenceTimer = setTimeout(function() {
    store.dispatch(setShowUserAbsence(true));
  }, Number(process.env.REACT_APP_SHOW_USER_ABSENCE_TIMEOUT))
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
      setUserAbsenceInterval(true);

			return {
				...state,
        voucherSessionKey: payload.msid,
        currency: payload.currency,
				isLoading: false,
        isPrintLoading: false,
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
      window.removeEventListener('mousemove', userAbsenceTimeoutPreccess);
      sessionStorage.removeItem('finpro-voucher-session-key');
      setUserAbsenceInterval(false);
      
      return {
        ...state,
        voucherSessionKey: '',
        showUserAbsence: false,
        depositSum: 0,
        isLoading: false,
				isError: false,
      }
    case SET_AVAILABLE_WITHDRAW_SUM:
      return {
        ...state,
        availableWithdrawSum: payload,
        isLoading: false,
        showWeCountBills: false
      }
    case REQUEST_VOUCHER_WITHDRAW_SUCCESS:
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,
        showWeCountBills: false
      }
    case REQUEST_DEPOSIT_INIT_SUCCESS:
      return {
        ...state,
        isBillAccepterReady: true,
        isError: false,
        isLoading: false
      }
    case SET_DEPOSIT_SUM:
      const newSum = !payload ? 0 : Number(state.depositSum) + Number(payload);

      return {
        ...state,
        depositSum: newSum
      }  
    case RESET_BILL_ACCEPTER_STATUS:
      return {
        ...state,
        isBillAccepterReady: false,
      }  
		case REQUEST_VOUCHER_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
        errorMessage: payload.message,
        isPrintLoading: false,
      };
    case SET_SHOW_USER_ABSENCE:
      if (!payload) {
        //@ts-ignore
        window.checkAbsenceTimer = false;
      }

      return {
        ...state,
        showUserAbsence: payload
      }
    case SET_SOCKET_CONNECTION_STATUS:
        return {
          ...state,
          socketConnectionStatus: payload
        }
    case REQUEST_PRINT_CHECK_SUCCESS:
      return {
        ...state,
        isPrintLoading: false
      }    
    case RESET_VOUCHER_ERROR_STATUS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: false,
        isPrintLoading: false,
        isPinVerified: false,
      }
    case REQUEST_SHOW_BALANCE_SUCCESS:
      let balance = typeof payload.balance === 'string'
        ? payload.balance.replace(',', '') 
        : payload.balance;
      balance = Math.round(balance);

      if (String(balance) === 'NaN') {
        throw { message: 'Invalid sum formatte' }
      }

      return {
        ...state,
        balance: balance,
        isLoading: false,
        isError: false,
      }
    case RESET_BALANCE:
      return {
        ...state,
        balance: null
      }  
    case REQUEST_TERMINAL_SUCCESS:
      return {
        ...state,
        terminalId: payload.terminal_id
      }
    case SET_WE_COUNT_BILLS_START: 
      return {
        ...state,
        showWeCountBills: true
      }
    case SET_WE_COUNT_BILLS_REMOVE:  
      return {
        ...state,
        showWeCountBills: false
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
      dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: { message: data.validation_errors ?? data.error_message } });

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

    if (data.success) {
      dispatch({
        type: REQUEST_VOUCHER_LOGIN_SUCCESS,
        payload: data
      });
    } else {
      console.log('data', data)
      if(data && (data.message_error === 'Printer is not active.' || data.message_error === '"Printer not responding"')) {
        dispatch(showPrinterError());
      } else {
        dispatch(showError());
      }
      dispatch({
        type: REQUEST_VOUCHER_FAILURE,
        payload: data.message_error
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
  // dispatch({type: REQUEST_VOUCHER_START});
  dispatch({type: SET_WE_COUNT_BILLS_START})
  api.voucher
  .withdraw(data)
  .then((res: any) => {
    const data = res.data;
    
    if (!data.success) {
      if (data.validation_errors) {
        dispatch({
          type: SET_AVAILABLE_WITHDRAW_SUM,
          payload: data.validation_errors?.cassette_info
        });
      }

      return;
    }

    // dispatch(setWithdrawSuccess());
  })
  .catch((error: any) => {    
    dispatch({ type: REQUEST_VOUCHER_FAILURE, payload: error });
    dispatch({ type: SET_WE_COUNT_BILLS_REMOVE });
    dispatch(showError());
  });
};

export const fetchCloseVoucherSession = (voucherSessionKey: string, closeWSConnection: () => void) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});

  const data = {
    msid: voucherSessionKey
  }

  api.voucher.closeSession(data).then((res: any) => {
    const resData = res.data;
    if (resData.success === false) {
      dispatch({type: REQUEST_VOUCHER_FAILURE });
      dispatch(showError());
      
      return;
    }

    if (closeWSConnection) {
      closeWSConnection()
    }

    dispatch({ type: CLOSE_VOUCHER_SESSION_SUCCESS });
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE, payload: error });
    dispatch(showError());
  })
};

export const fetchDepositInit = (voucherSessionKey: string) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});

  const data = {
    msid: voucherSessionKey
  }

  api.voucher.deposit(data).then((res: any) => {
    const resData = res.data;
    
    if (!resData.success) {
      dispatch({type: REQUEST_VOUCHER_FAILURE });
      dispatch(showError());
    }
    
    dispatch({type: REQUEST_DEPOSIT_INIT_SUCCESS });
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE, payload: error });
    dispatch(showError());
  })
}

export const fetchPrintCheck = (data: any) => (dispatch: any) => {
  // dispatch({type: REQUEST_VOUCHER_START});
  dispatch({ type: REQUEST_PRINT_LOADER_START });

  api.voucher.printCheck(data).then((res: any) => {
    const resData = res.data;

    if (!resData.success) {
      if (data && data.message_error === 'Printer is not active.') {
        dispatch(showPrinterError());
      }

      dispatch({ type: REQUEST_VOUCHER_FAILURE });
      dispatch({ type: CLOSE_VOUCHER_SESSION_SUCCESS });

      return;
    }
    
    dispatch({ type: REQUEST_PRINT_CHECK_SUCCESS });
    dispatch({ type: CLOSE_VOUCHER_SESSION_SUCCESS });
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE, payload: error });
    dispatch({ type: CLOSE_VOUCHER_SESSION_SUCCESS });
  })
}

export const fetchShowBalnce = (data: any) => (dispatch: any) => {
  dispatch({type: REQUEST_VOUCHER_START});

  api.voucher.showBalance(data).then((res: any) => {
    const resData = res.data;

    if (!resData.success) {
      dispatch({type: REQUEST_VOUCHER_FAILURE });

      return;
    }
    
    dispatch({type: REQUEST_SHOW_BALANCE_SUCCESS, payload: resData });
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE, payload: error });
    // dispatch(showError());
  })
}

export const fetchTerminal = () => (dispatch: any) => {
  api.voucher.terminal().then((res: any) => {
    const resData = res.data;

    if (!resData.success) {
      dispatch({type: REQUEST_VOUCHER_FAILURE });

      return;
    }
    
    dispatch({type: REQUEST_TERMINAL_SUCCESS, payload: resData });
  }).catch((error: any) => {
    dispatch({type: REQUEST_VOUCHER_FAILURE, payload: error });
  })
}

export const setShowUserAbsence = (status: boolean) => ({
  type: SET_SHOW_USER_ABSENCE,
  payload: status
});

export const setSocketConnectionStatus = (status: boolean) => ({
  type: SET_SOCKET_CONNECTION_STATUS,
  payload: status
});

export const setVoucherPin = (pin: string) => ({
  type: SET_VOUCHER_PIN,
  payload: pin
});

export const resetVoucherPin = () => ({
  type: RESET_VOUCHER_PIN
});

export const resetVoucherErrors = () => ({
  type: RESET_VOUCHER_ERROR_STATUS
});

export const resetBillAccepter = () => ({
  type: RESET_BILL_ACCEPTER_STATUS
});

export const setDepositSum = (sum: number) => ({
  type: SET_DEPOSIT_SUM,
  payload: sum
});

export const setWithdrawSuccess = () => ({
  type: REQUEST_VOUCHER_WITHDRAW_SUCCESS
});

export const hideWeCountBillsScreen = () => ({
  type: SET_WE_COUNT_BILLS_REMOVE
});

export const setAvailableWithdrawSum = (availableWithdrawSum: string | number | null) => ({
  type: SET_AVAILABLE_WITHDRAW_SUM,
  payload: availableWithdrawSum
});

export const setCassetteInfo = (cassetteInfo: [] | null) => ({
  type: REQUEST_CASSETTE_INFO_SUCCESS,
  payload: { cassette_info: cassetteInfo }
})

export const resetBalnce = () => ({
  type: RESET_BALANCE
});

export default voucher;
