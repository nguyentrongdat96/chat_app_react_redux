const actionTypes = Object.freeze({
    //Status Actions
    STATUS_CHANGE: 'STATUS_CHANGE',

    //message action 
    USER_CHANGED: 'message/user-changed',
    RECIPIENT_CHANGED: 'message/recipient-changed',
    OUTGOING_MESSAGE_CHANGED: 'message/outgoing-message-changed',
    MESSAGE_RECEIVED: 'message/message-received',
    MESSAGE_SENT: 'message/message-sent',
    CLIENT_UPDATE_RECEIVED: 'message/client-update-received',
    SEND_MESSAGE: 'message/send-message',
    ABANDON_CHAT: 'message/abandon-chat',
    BROADCAST_RECEIVE:'BROADCAST_RECEIVE',

    //socket action
    CONNECTION_CHANGED: 'socket/connection-changed',
    PORT_CHANGED: 'socket/port-changed',
    CONNECT_SOCKET: 'socket/connect',
    DISCONNECT_SOCKET: 'socket/disconnect',


});

export default actionTypes;