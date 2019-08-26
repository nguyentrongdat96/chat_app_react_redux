import React, { Component } from 'react';
import propTypes from 'prop-types';

class UserPicker extends Component {
    render() {
        // const {onlineUsers}= this.props;
        const onlineUsersList = this.props.onlineUsers.map((user,index)=>{
            return <option key = {user} value={user}>{user}</option> 
        });
        return (
            <div>
                <label id='recipient'>Chọn User</label>
                <select id='selectrecipient' defaultValue='DEFAULT'>
                    <option value='DEFAULT' disabled hidden>Chọn người nhận</option>
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