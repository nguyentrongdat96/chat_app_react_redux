
import actionTypes from '../../actions/actionTypes'

// The socket's connection state changed
export const connectionChanged = isConnected => {
    return {
        type: actionTypes.CONNECTION_CHANGED,
        connected: isConnected,
        isError: false
    };
};

export const socketConnect=(userid)=>{
    return {
        type:actionTypes.CONNECT_SOCKET
    }
}