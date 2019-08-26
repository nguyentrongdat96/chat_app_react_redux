import React, { Component } from 'react';
import propTypes from 'prop-types';

class UserPicker extends Component {
    render() {
        const {onlineUsers,onChange}= this.props;
        const onlineUsersList=onlineUsers.map((user,index)=>{
            return <option key={user} value={user}>{user}</option> 
        });
        return (
            <div>
                <label>Chọn User : </label>
                <select onChange={onChange} defaultValue='DEFAULT'>
                    <option value='DEFAULT' disabled hidden >Chọn người nhận</option>
                   {onlineUsersList}
                </select>
            </div>
        )
    }
}

UserPicker.propTypes = {
    onlineUsers: propTypes.array,
    onChange:propTypes.func
}

export default UserPicker;