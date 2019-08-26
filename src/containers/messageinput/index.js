import React, { Component } from "react";
import './index.scss';
import Input from '../../components/input/MessageInput';
import SendButton from '../../components/buttons/SendButton';
import {connect } from 'react-redux';

class MessageInput extends Component{
    constructor(props){
        super(props);
        this.onSendButtonClick=this.onSendButtonClick.bind(this);
    }

    onSendButtonClick=()=>{
        
    }

    render(){
        return (
            <div id="message-input">
                <Input></Input>
                <SendButton></SendButton>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{

}

const mapDispatchToProps=(dispatch)=>{

}

export default connect(mapStateToProps,mapDispatchToProps)(MessageInput);
