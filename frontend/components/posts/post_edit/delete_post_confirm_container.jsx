import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/post_actions';

const msp = state => ({});
const mdp = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId))
});


class DeletePostConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    cancel(){
        this.props.closeModal();
    }
    confirm(){
        console.log(`Attempting to delete ${this.props.modalProps.postId}`);
        
        this.props.deletePost(this.props.modalProps.postId).then(
            () => {
                this.props.closeModal();
                this.props.history.push('/');
            }
        );
    }

    render () {
        return (
            <div className="delete-confirmation-modal">
                <div className="delete-confirmation-header">
                    <span>Delete Post?</span>
                    <span onClick={this.cancel} className="delete-confirmation-x">X</span>
                </div>
                <div className="delete-confirmation-message">
                    Are you sure you want to delete this post?  This action is permanent and cannot be undone.
                </div>
                <div className="delete-confirmation-buttons">
                    <span onClick={this.cancel} className="delete-confirmation-cancel">Cancel</span>
                    <button onClick={this.confirm} className="delete-confirmation-confirm">Delete Post</button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(DeletePostConfirmation));