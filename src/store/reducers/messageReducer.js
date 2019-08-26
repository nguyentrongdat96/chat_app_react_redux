// ACTIONS
import actionTypes from '../actions/actionTypes';

// Initial state
const INITIAL_STATE = {
    user: undefined,
    recipient: "",
    outgoingMessage: '',
    recipientLost: false,
    lostRecipient: null,
    threads: {},
    users: []
};

// Message Reducer
function messageReducer(state = INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
       case actionTypes.USER_CHANGED:
            reduced = Object.assign({},
                state, {user: action.user}
            );
            break;

        case actionTypes.RECIPIENT_CHANGED:
            reduced = Object.assign({},
                state,
                {recipient: action.recipient},
                (action.recipient === "") ? {outgoingMessage: ''} : {}
            );
            break;

        case actionTypes.OUTGOING_MESSAGE_CHANGED:
            reduced = Object.assign({},
                state,
                {outgoingMessage: action.text}
            );
            break;

        case actionTypes.MESSAGE_RECEIVED:
            // Find the thread this message belongs to
            const isSentEcho = (action.message.from === state.user);
            const recipient = isSentEcho ? action.message.to : action.message.from;

            // Rendered InstantMessage components need a key, we'll use array index
            const messageKey = (!!state.threads[recipient]) ? state.threads[recipient].length : 0;
            const keyedMessage = Object.assign({}, action.message, {key: messageKey});

            // Add the keyed message to a clone of the appropriate thread
            const thread = (state.threads[recipient])
                ? state.threads[recipient].concat([keyedMessage])
                : [keyedMessage];

            // Reduce
            reduced = Object.assign({}, state, {
                recipient: recipient,
                threads: Object.assign({}, state.threads, {
                    [recipient]: thread
                })
            });
            break;

        case actionTypes.CLIENT_UPDATE_RECEIVED:
            reduced = Object.assign({},
                state, {users: action.otherUsers}
            );
            break;

        case actionTypes.MESSAGE_SENT:
            reduced = Object.assign({},
                state, {outgoingMessage: ''}
            );
            break;

        case actionTypes.ABANDON_CHAT:
            reduced = Object.assign({},
                state,
                {users:[], recipient: "", outgoingMessage: ''}
            );
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default messageReducer;