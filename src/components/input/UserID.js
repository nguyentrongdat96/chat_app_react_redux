import React, { Component } from 'react';
import propTypes from 'prop-types';

class UserID extends Component {

    render() {
        const {onUserChange}=this.props;
        return (
            <div>
                <label id='displayname'>Tên hiển thị </label>
                <input id='displayname-input' type="text" placeholder="Nhập tên bạn" onChange={onUserChange} ></input>
            </div>
        )
    }
}

UserID.propTypes={
    onUserChange:propTypes.func
}

export default UserID;