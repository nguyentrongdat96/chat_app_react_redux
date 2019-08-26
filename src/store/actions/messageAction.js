import actionTypes from './actionTypes';
// The user has changed
export const userChanged = user => {
    console.log("Action của thằng message", user);
    return {
        type: actionTypes.USER_CHANGED,
        user: user
    };
};

// The recipient has changed
export const recipientChanged = recipient => {
    return {
        type: actionTypes.RECIPIENT_CHANGED,
        recipient: recipient
    };
};

// The outgoing message has changed
export const outgoingMessageChanged = text => {
    return {
        type: actionTypes.OUTGOING_MESSAGE_CHANGED,
        text: text
    };
};

// The client has received a message
export const messageReceived = message => {
    return {
        type: actionTypes.MESSAGE_RECEIVED,
        message: message
    };
};

// The server has updated us with a list of users
export const clientUpdateReceived = (otherUsers) => {
    return {
        type: actionTypes.CLIENT_UPDATE_RECEIVED,
        otherUsers: otherUsers
    };
};

// Send an instant message
export const sendMessage = message => {
    console.log("Message sent: ", message);
    return {
        type: actionTypes.SEND_MESSAGE,
        message: message
    };
};

// Send an instant message
export const messageSent = () => {
    return {
        type: actionTypes.MESSAGE_SENT
    };
};

export const broadCastReceive = message => {
    return {
        type: actionTypes.BROADCAST_RECEIVE,
        message:message
    }
}



export const abandonChat = () => ({ type: actionTypes.ABANDON_CHAT });