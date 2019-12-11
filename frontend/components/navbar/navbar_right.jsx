import React from 'react'
import { Link } from 'react-router-dom'

export default ({currentUser, logout}) => {

    const menuClick = e => {
        const menu = document.getElementsByClassName("avatar-menu")[0];
        menu.setAttribute("style", "display:block")
    }

    const menuBlur = e => {
        const menu = document.getElementsByClassName("avatar-menu")[0];
        menu.setAttribute("style", "display:none")
    }

    const navbarRight = !currentUser ? (
        <div className='navbar-right'>
            <Link to="/login">Sign in</Link >
            <Link to='/register' className='button'>Sign up</Link>
        </div>
    ) : (
        <div>
            
            <div className="avatar-nav" onClick={menuClick}>
                <p>
                    {currentUser.username[0].toUpperCase()}
                </p>
                <div className='avatar-menu'>
                    <ul className="avatar-menu-top">
                        <li>Posts</li>
                        <li>Favorites</li>
                        <li>Comments</li>
                        <li>Images</li>
                        <li onClick={logout}>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
        )
    return <>{navbarRight}</>
};