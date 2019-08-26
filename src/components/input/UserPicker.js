import React, { Component } from 'react';
import propTypes from 'prop-types';

class UserPicker extends Component {
    render() {
        const {onlineUsers}= this.props;
        const onlineUsersList=onlineUsers.map((user,index)=>{
            return <option key={user} value={user}>{user}</option> 
        });
        return (
            <div>
                <label>Chọn User : </label>
                <select>
                   {onlineUsersList}
                </select>
            </div>
        )
    }
}

UserPicker.propTypes = {
    onlineUsers: propTypes.array
}

export default UserPicker;