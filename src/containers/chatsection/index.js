import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';



class ChatSection extends Component {
    render() {
        const { messagePool } = this.props;
        const messageArr = [];
        Object.keys(messagePool).forEach(x => {
            messageArr.push(messagePool[x]);
        })
        const messages = messageArr.map((msg, index) => {
            //return <div key={index} className="sent" >{msg}</div>
            if (msg.indexOf("[Sent]") !== -1) {
                return <div key={index} className="sent" >{msg}</div>
            } else 
            if (msg.indexOf("[Receive]") !== -1) {
                return <div key={index} className="receive" >{msg}</div>
            } else {
                return <div key={index} className="broadcast" >{msg}</div>
            }

        });
        //console.log("HERE IS THE MESSAGE POOL", this.props.messagePool);
        return (
            <div id="chat-content">
                <div>WellCome to Chat App Excample</div>
                {messages}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    messagePool: state.messageState.messagePool
});


export default connect(mapStateToProps, null)(ChatSection);