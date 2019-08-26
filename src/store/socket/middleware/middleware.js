import Socket from "./Socket";

import * as actions from '../../actions/index';
import actionTypes from '../../actions/actionTypes';
import * as socketActions from '../action/socketActions';


const socketMiddleware = store => {
    const onConnectionStatusChange = isconnected => {
        let txtConnectStatus;
        if (isconnected === true) {
            txtConnectStatus = 'Connected';
        } else {
            txtConnectStatus = 'Disconnected';
        }
        store.dispatch(socketActions.connectionChanged(isconnected))
        store.dispatch(actions.statusChanged(txtConnectStatus));
    }

    // Có tin nhắn được gửi đến ở kênh message
    const onMessage = (message) => {

    }

    const onUpdateUserList = (message) => {
        const messageState = store.getState().messageState;

        // Danh sách user có thể trả về rỗng tại sao lại không có kiểm tra nhể ???
        if (typeof message !='undefined') {
            console.log("message gửi về ",message);
            let userlists=[];
            message.forEach(x => {
                Object.keys(x).forEach(y => {
                   userlists.push(x[y]);
                });
            });
            console.log("list được xử lý :",userlists);
            //Xóa thằng hiện tại ra khỏi danh sách user được gửi xuống 
            const onlineUsers = userlists.filter(user => user !== messageState.user);

            //dispatch Để cập nhật lại thằng danh sách user
            const dispatchUpdate = () => {
                store.dispatch(actions.clientUpdateReceived(onlineUsers));
            }

            dispatchUpdate();
        }

    }

    const socket = new Socket(
        onConnectionStatusChange,
        onMessage,
        onUpdateUserList
    )



    // Đoạn dưới này sẽ chạy với mỗi action dispatch (có lỗi ở đây => nhớ return lại cái exit(action) để nó không bị chặn)
    return exit => action => {

        let messageState = store.getState().messageState;
        let socketState = store.getState().socketState;

        console.log("message state", messageState);
        switch (action.type) {
            case actionTypes.CONNECT_SOCKET:
                console.log("Lấy user từ middleware:", messageState.user);
                socket.connect(messageState.user, socketState.port);
                break;
            case actionTypes.DISCONNECT_SOCKET:
                socket.disconnect();
                break;
            case actionTypes.SEND_MESSAGE:
                socket.sendMessage({
                    'from': messageState.user,
                    'to': messageState.recipient,
                    'msg': messageState.outgoingMessage
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




