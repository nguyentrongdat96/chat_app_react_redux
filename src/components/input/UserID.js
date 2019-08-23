import React, { Component } from 'react';
import propTypes from 'prop-types';

class UserID extends Component {

    render() {
        const {onUserChange}=this.props;
        return (
            <div>
                <label>Tên hiển thị : </label>
                <input type="text" placeholder="Vui lòng nhập tên để chat" onChange={onUserChange} ></input>
            </div>
        )
    }
}

UserID.propTypes={
    onUserChange:propTypes.func
}

export default UserID;