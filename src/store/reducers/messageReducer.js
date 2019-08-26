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
    users: [],
    messagePool: {}
};

// Message Reducer
function messageReducer(state = INITIAL_STATE, action) {
    let reduced;
    switch (action.type) {
        case actionTypes.USER_CHANGED:
            reduced = Object.assign({},
                state, { user: action.user }
            );
            break;

        case actionTypes.RECIPIENT_CHANGED:
            reduced = Object.assign({},
                state,
                { recipient: action.recipient },
                (action.recipient === "" || action.recipient === "Select an user") ? { outgoingMessage: '' } : {},

            );
            break;

        case actionTypes.OUTGOING_MESSAGE_CHANGED:
            reduced = Object.assign({},
                state,
                { outgoingMessage: action.text }
            );
            break;

        case actionTypes.MESSAGE_RECEIVED:
            let message = action.message;
            let inputMessage = (message.from === state.user) ? `[Sent] ${state.user} - ${message.to} : ${message.msg}` : `[Receive] ${message.from} : ${message.msg}`;
            // console.log("RECEIVE MESSAGE INPUT", inputMessage);
            // console.log("STATE MESSAGEPOOL", state.messagePool);
            // console.log("COUNT", Object.keys(state.messagePool).length);
            let count = Object.keys(state.messagePool).length;
            // Reduce : Chú ý chỗ này dùng Object.asign để tránh lỗi thay đổi state chứ không phải gắn với state mới
            reduced = Object.assign({}, state, {
                messagePool: Object.assign({}, state.messagePool, {
                    [count]: inputMessage
                })

            });



            break;

        case actionTypes.CLIENT_UPDATE_RECEIVED:
            reduced = Object.assign({},
                state, { users: action.otherUsers }
            );
            break;

        case actionTypes.MESSAGE_SENT:
            reduced = Object.assign({},
                state, { outgoingMessage: '' }
            );
            break;

        case actionTypes.ABANDON_CHAT:
            reduced = Object.assign({},
                state,
                { users: [], recipient: "", outgoingMessage: '' }
            );
            break;
        case actionTypes.BROADCAST_RECEIVE:
            let countMessage=Object.keys(state.messagePool).length;
            let broadcastMessage=`[Broadcast] ${action.message}`;
            reduced = Object.assign({},
                state,
                {
                    messagePool: Object.assign({}, state.messagePool, {
                        [countMessage]: broadcastMessage
                    })
                }
            );
            break;
        default:
            reduced = state;
    }
    return reduced;
}

export default messageReducer;