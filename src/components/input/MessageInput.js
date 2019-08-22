import React, { Component } from 'react';
import './MessageInput.scss';

class MessageInput extends Component {
    render() {
        return (
            <div id="message-input-container">
                <label>Tin nhắn : </label>
                <input type="text" placeholder="Nội dung chat" id="message-input" ></input>
                <button id="send-btn" >Gửi</button>
            </div>
        )
    }
}

export default MessageInput;