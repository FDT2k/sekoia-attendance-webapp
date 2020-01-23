import React, { Component } from 'react';
import './Header.css'
import Clock from './Clock';

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>Sekoia - Time Attendance Terminal</h1>
                <Clock />
            </div>
        )
    }
}

export default Header;
