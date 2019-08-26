import React, { Component } from 'react';
import './ConnectButton.scss';
import propTypes from 'prop-types';

class ConnectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Connect"
        }
    }
    render() {
        const {
            onClick,disable
        } = this.props;
        return (
            <button type="button" id="connect-button" onClick={onClick} disabled={disable}> {this.state.text}</button>
        )
    }
}

ConnectButton.propTypes = {
    onClick: propTypes.func,
    disable:propTypes.bool
}



export default ConnectButton;