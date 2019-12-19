import React from 'react';
import { closeModal } from '../../actions/ui_actions';
import { connect } from 'react-redux';
import NewPostUploadContainer from '../upload/new_post_upload_container';
import EditPostUploadContainer from '../upload/edit_post_upload_container';
import { withRouter } from 'react-router-dom';
import DeletePostConfirmation from '../posts/post_edit/delete_post_confirm_container';

function Modal({ modal, closeModal, modalProps }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'new-upload':
            component = <NewPostUploadContainer modalProps={modalProps} />;
            break;
        case 'edit-upload':
            component = <EditPostUploadContainer modalProps={modalProps} />;
            break;
        case 'delete-post-confirmation':
            component = <DeletePostConfirmation modalProps={modalProps} closeModal={closeModal} />
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        modal: state.ui.modal,
        modalProps: ownProps
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeModal: () => {
            dispatch(closeModal());
            if (ownProps.redirectOnClose) {
                ownProps.history.push(ownProps.redirectOnClose);
            }
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
