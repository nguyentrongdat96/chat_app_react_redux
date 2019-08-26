import React, { Component } from "react";
import './index.scss';
import Input from '../../components/input/MessageInput';
//import SendButton from '../../components/buttons/SendButton';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/index';

class MessageInput extends Component {
    constructor(props) {
        super(props);
        //this.onSendButtonClick=this.onSendButtonClick.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // onSendButtonClick=()=>{
    //     this.props.sendMessage(this.props.message);
    // }

    onMessageChange = (e) => {
        this.props.messageChange(e.target.value);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.connectStatus && this.props.receiver !== "" && this.props.receiver !== "Select an user") {
            this.props.sendMessage(this.props.message);
        }

    }

    render() {
        return (
            <div id="message-input-section">
                <form onSubmit={this.onSubmit} autoComplete="off">
                    <Input onChange={this.onMessageChange} messageValue={this.props.message}></Input>
                    {/* <SendButton onClick={this.onSendButtonClick}></SendButton> */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.messageState.outgoingMessage,
    connectStatus: state.socketState.status,
    receiver: state.messageState.recipient
})

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) => dispatch(Actions.sendMessage(message)),
    messageChange: (message) => dispatch(Actions.outgoingMessageChanged(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
