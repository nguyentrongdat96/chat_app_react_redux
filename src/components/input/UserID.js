import React, { Component } from 'react';

class UserID extends Component {
    render() {
        return (
            <div>
                <label>Tên hiển thị : </label>
                <input type="text" placeholder="Vui lòng nhập tên để chat" ></input>
            </div>
        )
    }
}

export default UserID;