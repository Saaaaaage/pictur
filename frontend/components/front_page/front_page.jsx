import React from 'react';
import NavbarContainer from '../navbar/navbar_container'

export default props => {
    // TODO: is there better way change the class of the body depending on the page?
    const body = document.getElementsByTagName('body')[0];
    // body.classList.forEach(c => body.classList.remove(c));
    body.classList.remove(...body.classList);
    body.classList.add("bg-front-page");
    return (
        <div>
            <NavbarContainer/>
            <div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <a href="https://www.freepik.com/free-photos-vectors/water">Water photo created by jannoon028 - www.freepik.com</a>
        </div>
    )
}