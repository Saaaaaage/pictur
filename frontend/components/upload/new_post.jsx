import React from 'react';
import UploadContainer from './upload_container';
import NavBarRight from '../navbar/navbar_right'
import Modal from './modal';
import {connect} from 'react-redux';
import { openModal } from '../../actions/ui_actions';

// const msp = state => ({});
const mdp = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal))
});


class NewPost extends React.Component {

    componentDidMount() {
        this.props.openModal('upload');
    }

    render () {
        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-new-upload-page");

        return (
            <Modal/>
        )
    }
}

export default connect(null, mdp)(NewPost)