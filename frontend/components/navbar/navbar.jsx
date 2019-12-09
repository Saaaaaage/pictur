import React from 'react';
import NavbarLeft from './navbar_left'
import NavbarCenter from './navbar_center';
import NavbarRight from './navbar_right';

const NavBar = ({currentUser, logout}) => {
    return (
        <div className="navbar">
            <NavbarLeft/>
            <NavbarCenter/>
            <NavbarRight currentUser={currentUser} logout={logout}/>
        </div>
    )
}

export default NavBar;