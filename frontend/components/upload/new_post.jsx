import React from 'react';
import UploadModalContainer from './upload_modal_container';
import NavBarRight from '../navbar/navbar_right'

export default props => {
    // TODO: is there better way change the class of the body depending on the page?
    const body = document.getElementsByTagName('body')[0];
    // body.classList.forEach(c => body.classList.remove(c));
    body.classList.remove(...body.classList);
    body.classList.add("bg-new-upload-page");
    return (
        <UploadModalContainer/>
    )
}