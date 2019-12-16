import React from 'react';
import { closeModal } from '../../actions/ui_actions';
import { connect } from 'react-redux';
import NewPostUploadContainer from '../upload/new_post_upload_container';
import EditPostUploadContainer from '../upload/edit_post_upload_container';
import { withRouter } from 'react-router-dom'

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'new-upload':
            component = <NewPostUploadContainer />;
            break;
        case 'edit-upload':
            component = <EditPostUploadContainer />;
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

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeModal: () => {
            dispatch(closeModal());
            // ownProps.history.goBack();
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
