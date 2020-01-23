import React, { Component } from 'react';
import User from './User'
import './UsersGrid.css';

export default class UsersGrid extends Component {

    render() {
        return (
            <div className="users-grid">
                {this.props.users.map(user => <User user={user} key={user.name} />)}
            </div>
        )
    }
}