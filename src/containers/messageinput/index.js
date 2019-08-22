import React, { Component } from "react";
import './index.scss';
import Input from '../../components/input/MessageInput';

class MessageInput extends Component{
    render(){
        return (
            <div id="message-input">
                <Input></Input>
            </div>
        )
    }
}
export default MessageInput;
