import React, { createContext } from 'react'
import io from 'socket.io-client';
// import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
// import { updateChatLog } from './actions';


const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }: { children: any }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    // const sendMessage = (roomId, message) => {
    //     const payload = {
    //         roomId: roomId,
    //         data: message
    //     }
    //     socket.emit("event://send-message", JSON.stringify(payload));
    //     // dispatch(updateChatLog(payload));
    // }

    const accessToken = localStorage.getItem('finpro_access_token');
    console.log('WS COND !socket && accessToken', !socket ,'&&', accessToken)
    if (!socket && accessToken) {
        console.log('SOCKET CONNECTION')
        
        socket = io.connect(`${process.env.REACT_APP_WS_URL}/?token=${accessToken}`);
        socket.on("ws:newMessage", (msg: any) => {
            console.log('res', msg)
            // const payload = JSON.parse(msg);
            // dispatch(updateChatLog(payload));
        })

        ws = {
            socket: socket,
            // sendMessage
        }
    }

    return (
        //@ts-ignore
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}