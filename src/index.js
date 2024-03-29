import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import FirstComponent from './firstcomponent';
import Chat from './containers/Chat';
//import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/index';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

function render() {
    ReactDOM.render(
        //<FirstComponent></FirstComponent>,
        <Provider store={store}>
            <Chat></Chat>
        </Provider>,
        document.getElementById('root')
    )
}
render();
