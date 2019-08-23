import React, { Component } from 'react';
import './ConnectButton.scss';
import propTypes from 'prop-types';

class ConnectButton extends Component {
    constructor(props){
        super(props);
        this.state={
            text:"Connect"
        }
    }
    render() {
        const {
            onClick
        } = this.props;
        return (
            <button type="button" id="connect-button" onClick={onClick}> {this.state.text}</button>
        )
    }
}

ConnectButton.propTypes = {
    onClick: propTypes.func
}



export default ConnectButton;