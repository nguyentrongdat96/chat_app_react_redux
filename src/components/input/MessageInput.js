import React, { Component } from 'react';
import './MessageInput.scss';

class MessageInput extends Component {
    render() {
        return (
            <div id="message-input-container">
                <input type="text" placeholder="Nhập tin nhắn..." id="message" ></input>
            </div>
        )
    }
}

export default MessageInput;