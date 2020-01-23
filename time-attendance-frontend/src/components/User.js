import React from 'react'
import './User.css'

// export default function User({ name, status = false, picture }) {
export default function User({ user }) {
    return (
        <div className="user">
            <img src={user.picture} alt="Photo" />
            <p>{user.name}</p>
            <p>{user.status ? 'Présent' : 'Absent'}</p>
        </div>
    )
}
