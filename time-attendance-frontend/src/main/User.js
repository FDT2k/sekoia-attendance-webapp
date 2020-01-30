import React from 'react';
import './User.css';

export default function User(props) {
    const { firstname, lastname, picture, present } = props.user;

    return (
        <div className="user" onClick={props.onClick}>
            <img src={picture} alt="Profil" />
            <p>{firstname} {lastname}</p>
            <p>{present ? 'Présent' : 'Absent'}</p>
        </div>
    )
}
