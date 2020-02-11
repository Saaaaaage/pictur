import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = ({currentUser, logout}) => {
    const menuClick = e => {
        const menu = document.getElementsByClassName("avatar-menu")[0];
        menu.setAttribute("style", "display:block");
    };

    const menuBlur = e => {
        const menu = document.getElementsByClassName("avatar-menu")[0];
        
        //  e.relatedTarget.tagName.toLowerCase() != 'a'
        if (!e.relatedTarget) {
            menu.setAttribute("style", "display:none");
        }
        e.stopPropagation();
    };

    const navbarRight = !currentUser ? (
        <div className='navbar-right'>
            <Link to="/login">Sign in</Link >
            <Link to='/register' className='button'>Sign up</Link>
        </div>
    ) : (
        <div className='navbar-right'>
            <div
                className="avatar-nav"
                onClick={menuClick}
                onBlur={menuBlur}
                tabIndex="0"
            >
                <p>
                    {currentUser.username[0].toUpperCase()}
                </p>
                <div className='avatar-menu'>
                    <ul className="avatar-menu-top">
                        <li><Link to={`/users/${currentUser.id}`}>Posts</Link></li>
                        <li style={{cursor: 'not-allowed'}}>Favorites</li>
                        <li style={{cursor: 'not-allowed'}}>Comments</li>
                        <li style={{cursor: 'not-allowed'}}>Images</li>
                        <li onClick={logout}>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
    
    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <span className="logo">
                        pictur
                    </span>
                </Link>
                <Link to="/upload" className="upload-button">
                    <div className="plus-icon">+</div>
                    New post
                </Link>
            </div>
            <div className='navbar-center'>
                <input className="search-bar"
                    placeholder="Images, #tags, @users oh my!"
                    type="text"
                    style={{cursor: 'not-allowed'}}
                />
            </div>
            {navbarRight}
        </div>
    )
}

export default withRouter(NavBar);