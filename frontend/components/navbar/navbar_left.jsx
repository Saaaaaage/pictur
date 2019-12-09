import React from 'react'
import {Link} from 'react-router-dom'

export default props => {
    return (
        <div className="navbar-left">
            <Link to="/">
                <span className="logo">
                    pictur
                </span>
            </Link>
            <Link to="/upload" className="button upload">
                <div className="plus-icon">+</div>
                New post
            </Link>
        </div>
    )
};