import React, { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setDepositSum, 
  setSocketConnectionStatus, 
  setWithdrawSuccess, 
  hideWeCountBillsScreen, 
  userAbsenceTimeoutPreccess, 
  fetchDepositInit,
  resetWeCountBillsTimer
} from '../redux/voucher';
import { showOptionalCheck } from '../redux/screens';
import { AppState } from '../redux';

type Action = 'deposit' | 'withdraw';

export type WS = {
  socket: WebSocket | null
  setWSConnnection: () => void
  closeWSConnection: () => void
  sendMessage: (actionType: Action) => void
}

const WebSocketContext = createContext(null);
export { WebSocketContext }

export default ({ children }: { children: any }) => {
  const [ socket, setSocket ] = useState<WebSocket | null>(null);
  const { socketConnectionStatus, depositSum, voucherSessionKey, weCountBillsTimer } = useSelector((state: AppState) => state.voucher);
  const dispatch = useDispatch();
  let reconnectTimer: any = null;

  const setWSConnnection = () => {
    if (socketConnectionStatus || (socket && socket.readyState <= 1)) {
      return;
    }

    const accessToken = localStorage.getItem('finpro_access_token');
    const newSocket = new window.WebSocket(`${process.env.REACT_APP_WS_URL_PROD}/socket?token=${accessToken}`);
    
    if (!reconnectTimer) {
      reconnectTimer = setTimeout(function() {
        if (!newSocket || newSocket.readyState > 1) {
          setWSConnnection();
        } else {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      }, 5000)
    }

    setSocket(newSocket);

    newSocket.onopen = (e) => {
      clearTimeout(reconnectTimer);
      dispatch(setSocketConnectionStatus(true));
      // heartbeat(newSocket)
      newSocket.send(JSON.stringify({
        action: 'deposit'
      }));
      newSocket.send(JSON.stringify({
        action: 'withdraw'
      }));
      newSocket.send(JSON.stringify({
        action: 'check'
      }))
    }

    newSocket.onmessage = (response) => {
      let res = window.JSON.parse(response.data);

      switch(res.action) {
        case 'deposit': {
          dispatch(setDepositSum(Math.round(res.amount)));
          userAbsenceTimeoutPreccess();
          
          break;
        }
        case 'check': {
          if (depositSum) {
            dispatch(showOptionalCheck())
          } else {
            fetchDepositInit(voucherSessionKey)(dispatch);
          }

          break;
        }
        case 'withdraw': {
          if (weCountBillsTimer) {
            dispatch(resetWeCountBillsTimer(weCountBillsTimer));
          }
          dispatch(setWithdrawSuccess());
          dispatch(hideWeCountBillsScreen());
          dispatch(showOptionalCheck());
        }
        // case 'pong': {
        //   console.log('WS PONG')
        // }
        default: 
          return undefined;
      }
    }

    newSocket.onerror = (error: any) => {
      setTimeout(function() {
        setWSConnnection();
      }, 1000);
    }
    
    newSocket.onclose = () => {
      dispatch(setSocketConnectionStatus(false));
      // if (socket) {
      //   // setSocket(null);
      //   console.log('WS CONNECT ON CLOSE')
      //   setWSConnnection();
      // }
    }
  }

  // const heartbeat = (newSocket: any) => {
  //   if (!newSocket || !newSocket.readyState) {
  //     console.log('socket invalid')
  //     return;
  //   }
  //   newSocket.send("ping");
  //   setTimeout(function() {
  //     heartbeat(newSocket) 
  //   }, 500);
  // }

  const sendMessage = (actionType: Action) => {
    if (!socket || socket.readyState !== 1) {
      return
    }

    socket.send(JSON.stringify({
      action: actionType
    }))
  }
  
  const closeWSConnection = () => {
    if (!socket || socket.readyState !== 1) {
      return;
    }
    setSocket(null);
    socket.close();
  }

  const ws: WS = {
    socket,
    setWSConnnection,
    closeWSConnection,
    sendMessage
  }

  return (
    //@ts-ignore
    <WebSocketContext.Provider value={ws}>
        {children}
    </WebSocketContext.Provider>
  )
}