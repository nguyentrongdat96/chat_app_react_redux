import {  combineReducers } from 'redux';


//reducer
import statusReducer from './statusReducer';
import messageReducer from './messageReducer';
import socketReducer from '../socket/reducer/socketReducer';

//rootReducer
const rootReducer=combineReducers({
    statusState:statusReducer,
    messageState:messageReducer,
    socketState:socketReducer
})

export default rootReducer;