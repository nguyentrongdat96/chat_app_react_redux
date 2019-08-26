import React,{Component} from 'react';
import propTypes from 'prop-types';
import './SendButton.scss';

class SendButton extends Component{
    render(){
        const {onClick}=this.props;
        return(
            <button id='send-button' onClick={onClick}> Gửi</button>
        )
    }
}

SendButton.propTypes={
    onClick:propTypes.func
}



export default SendButton;