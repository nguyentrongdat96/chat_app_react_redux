import React, { Component } from 'react';
import './MessageInput.scss';
import propTypes from 'prop-types';

class MessageInput extends Component {
    render() {
        const {onChange,messageValue} = this.props;
        return (
            <div id="message-input-container">
                <label>Tin nhắn : </label>
                <input type="text" placeholder="Nội dung chat" id="message-input" onChange={onChange} value={messageValue}  ></input>
            </div>
        )
    }
}

MessageInput.propTypes={
    onChange:propTypes.func,
    messageValue:propTypes.string
}

export default MessageInput;