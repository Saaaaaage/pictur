import React from 'react';
import { closeModal } from '../../actions/ui_actions';
import { connect } from 'react-redux';
import UploadContainer from './upload_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        console.log("NOT DISPLAYING MODAL!!!")
        return null;
    }
    console.log("DISPLAYING MODAL")
    let component;
    switch (modal) {
        case 'upload':
            component = <UploadContainer />;
            break;
        default:
            return null;
    }
    return (
        <div>
            Hello World!
            <div className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
