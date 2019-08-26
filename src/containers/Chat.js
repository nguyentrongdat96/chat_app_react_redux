import React, { Component } from 'react';
//import UserID from '../components/input/UserID';
//import UserPicker from '../components/input/UserPicker';
import ChatContent  from './chatcontent/index';
import MessageInput from './messageinput/index';
import {ChatHeader} from './chatheader';
import './Chat.scss';

class Chat extends Component {


    render() {
        return (
            <div id="chat-section">
                {/* <UserID></UserID>
                
                <UserPicker></UserPicker> */}

                <ChatHeader></ChatHeader>

                <ChatContent></ChatContent>

                <MessageInput></MessageInput>
        </div>
        )
    }

}

export default Chat;