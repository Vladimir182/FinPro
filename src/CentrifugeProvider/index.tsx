import React, { createContext, useState, useEffect } from 'react';
import Centrifuge from 'centrifuge';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchWssToken, resetWsToken } from '../redux/authorization';
import { 
  setDepositSum, 
  setWithdrawSuccess,
  hideWeCountBillsScreen, 
  userAbsenceTimeoutPreccess, 
  fetchDepositInit,
  resetWeCountBillsTimer,
} from '../redux/voucher';
import { showOptionalCheck } from '../redux/screens';
import { AppState } from '../redux';
import { useLocation } from 'react-router';

export const CentrifugeContext = createContext<any>(null);

const CentProvider = (props: any) => {
	const dispatch = useDispatch();
	const [ centrifuge, setCentrifugeToState ] = useState<any>(null);
	const { wssToken } = useSelector((state: AppState) => state.authorization);
	const { depositSum, voucherSessionKey, weCountBillsTimer } = useSelector((state: AppState) => state.voucher);

	useEffect(() => {
		if (!wssToken && voucherSessionKey) {
			fetchWssToken(voucherSessionKey)(dispatch);
		}

		// if (wssToken && voucherSessionKey && !centrifuge) {
		// 	const centrifuge = new Centrifuge(`${process.env.REACT_APP_WS_CENTRIFUGE_URL_DEV}`);
   		// 	centrifuge.setToken(wssToken);
		// 	setCentrifugeToState(centrifuge);

		// 	centrifuge.connect();

		// 	centrifuge.on('connect', function(context: any) {
		// 		console.log('CONNECT')
		// 		centrifuge.subscribe('check', function(message: any) {
		// 			if (message.data.success) {
		// 				if (depositSum) {
		// 					dispatch(showOptionalCheck())
		// 				} else {
		// 					// console.log('voucherSessionKey', voucherSessionKey)
		// 					// console.log('PATH', location.pathname, location.pathname === '/voucher-deposit')
		// 					fetchDepositInit(voucherSessionKey)(dispatch);
		// 				}
		// 			}
		// 		});
		// 		centrifuge.subscribe('withdraw', function(message: any) {
		// 			if (message.data.success) {
		// 				if (weCountBillsTimer) {
		// 					dispatch(resetWeCountBillsTimer(weCountBillsTimer));
		// 				  }
		// 				  dispatch(setWithdrawSuccess());
		// 				  dispatch(hideWeCountBillsScreen());
		// 				  dispatch(showOptionalCheck());
		// 			}
		// 		});
		// 		centrifuge.subscribe('deposit', function(message: any) {
		// 			if (message.data.success && message.data.amount) {
		// 				dispatch(setDepositSum(Math.round(message.data.amount)));   
		// 				userAbsenceTimeoutPreccess();
		// 			}
		// 		});	
		// 	});
		// 	centrifuge.on('disconnect', function() {
		// 		console.log('DISCONNECT')
		// 		setCentrifugeToState(null);
		// 	});

		// }
		
	}
	// , [wssToken, voucherSessionKey]
	)

	const connectCentrifuge = () => {
		if (wssToken && voucherSessionKey && !centrifuge) {
			const centrifuge = new Centrifuge(`${process.env.REACT_APP_WS_CENTRIFUGE_URL_DEV}`);
   			centrifuge.setToken(wssToken);
			setCentrifugeToState(centrifuge);

			centrifuge.connect();

			centrifuge.on('connect', function(context: any) {
				centrifuge.subscribe(`check#${voucherSessionKey}`, function(message: any) {
					if (message.data.success) {
						if (depositSum) {
							dispatch(showOptionalCheck())
						} else {
							if (window.location.pathname === '/voucher-deposit') {		
								fetchDepositInit(voucherSessionKey)(dispatch);
							}
						}
					}
				});
				centrifuge.subscribe(`withdraw#${voucherSessionKey}`, function(message: any) {
					if (message.data.success) {
						if (weCountBillsTimer) {
							dispatch(resetWeCountBillsTimer(weCountBillsTimer));
						  }
						  dispatch(setWithdrawSuccess());
						  dispatch(hideWeCountBillsScreen());
						  dispatch(showOptionalCheck());
					}
				});
				centrifuge.subscribe(`deposit#${voucherSessionKey}`, function(message: any) {
					if (message.data.success && message.data.amount) {
						dispatch(setDepositSum(Math.round(message.data.amount)));   
						userAbsenceTimeoutPreccess();
					}
				});	
			});
			centrifuge.on('disconnect', function() {
				setCentrifugeToState(null);
				dispatch(resetWsToken());
			});

		}
	}
	
	const disconnectCentrifuge = () => {
		if (centrifuge) {
			centrifuge.disconnect();
		}
	}

	return (
		<CentrifugeContext.Provider value={{ 
			disconnect: () => disconnectCentrifuge(),
			connect: () => connectCentrifuge()
		 }}>
			{props.children}
		</CentrifugeContext.Provider>
	)
}

export default CentProvider;