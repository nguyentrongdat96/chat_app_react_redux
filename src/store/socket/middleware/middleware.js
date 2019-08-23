import Socket from "./Socket";

import * as actions from '../../actions/index';
import actionTypes from '../../actions/actionTypes';
import * as socketActions from '../action/socketActions';




const socketMiddleware = store => {
    const onConnectionStatusChange = isconnected => {
        let txtConnectStatus;
        if(isconnected===true){
            txtConnectStatus='Connected';
        }else { 
            txtConnectStatus='Disconnected';
        }
        store.dispatch(socketActions.connectionChanged(isconnected))
        store.dispatch(actions.statusChanged(txtConnectStatus));
    }

    const onMessage = () => {

    }

    const onUpdateUserList = () => {

    }

    const onGetUserList = () => {

    }

    const socket = new Socket(
        onConnectionStatusChange,
        onMessage,
        onUpdateUserList,
        onGetUserList
    )



    // Đoạn dưới này sẽ chạy với mỗi action dispatch (Nó chặn mẹ nó dispatch rồiiiiiiiiiiiiiiii)
    return exit => action => {
        
        let messageState=store.getState().messageState;
        let socketState=store.getState().socketState;

        console.log("message state",messageState);
        switch(action.type){
            case actionTypes.CONNECT_SOCKET:
                console.log("Lấy user từ middleware:",messageState.user);
                socket.connect(messageState.user,socketState.port);
                break;
            case actionTypes.DISCONNECT_SOCKET:
                socket.disconnect();
                break;
            case actionTypes.SEND_MESSAGE:
                socket.sendMessage({
                    'from':messageState.user,
                    'to':messageState.recipient,
                    'msg':messageState.outgoingMessage
                });
                store.dispatch(actions.messageSent());
                break;
            default:
                break;    
        }
        return exit(action);
    };


}



export default socketMiddleware;




