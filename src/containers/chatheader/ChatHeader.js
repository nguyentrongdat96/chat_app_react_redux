import React, { Component } from 'react';
import './ChatHeader.scss';
import UserID from '../../components/input/UserID';
import UserPicker from '../../components/input/UserPicker';
import ConnectButton from '../../components/buttons/ConnectButton';
import {connect } from 'react-redux';
import * as socketActions from '../../store/socket/action/socketActions';
import * as Actions from '../../store/actions/index';


class ChatHeader extends Component {
    constructor(props){
        super(props);
        this.onConnectionBtnClick=this.onConnectionBtnClick.bind(this);
        this.onUserChange=this.onUserChange.bind(this);
    }


    onConnectionBtnClick(){
        if(!this.props.socketStatus){
            this.props.connectSocket();
        }
    }

    onUserChange(e){
        //console.log("Đây là thằng user đang nhập :",e.target.value);
        this.props.userChange(e.target.value);
    }

    render() {
        const tempArr=['Select an user'];
        return (
            <div id="chat-header">
                <div id="user-id-input">
                    <UserID onUserChange={this.onUserChange}></UserID>
                </div>
                <div id="user-picker">
                    <UserPicker onlineUsers={this.props.onlineUsers.length !== 0 ? this.props.onlineUsers: tempArr}></UserPicker>
                </div>
                <div id="connect-button-container">
                    <ConnectButton onClick={this.onConnectionBtnClick}></ConnectButton>
                </div>
                <div id="connect-status">
                    Status: {this.props.connectStatus}
                </div>
            </div>
        )
    }
}

// map required state to props
const mapStatetoToProps=(state)=>({
    socketStatus:state.socketState.status,
    connectStatus:state.statusState.status,
    onlineUsers:state.messageState.users
})

// map required func to props 
const mapDispatchToProps=(dispatch)=>({
    connectSocket:()=>dispatch(socketActions.socketConnect()),
    userChange:(userid)=>dispatch(Actions.userChanged(userid))
})

export default connect(mapStatetoToProps,mapDispatchToProps)(ChatHeader)