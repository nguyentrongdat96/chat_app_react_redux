import React,{Component} from 'react';
import propTypes from 'prop-types';
import './SendButton.scss';

class SendButton extends Component{
    render(){
        const {onClick}=this.props;
        return(
            <div id='send-button'>
                <button onClick={onClick}> Gửi</button>
            </div>
        )
    }
}

SendButton.propTypes={
    onClick:propTypes.func
}

export default SendButton;