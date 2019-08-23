import {createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import socketMiddleware from './socket/middleware/middleware'

const store=createStore(
    rootReducer,
    applyMiddleware(socketMiddleware)
);

export default store