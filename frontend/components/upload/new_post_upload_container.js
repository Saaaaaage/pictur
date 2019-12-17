import {connect} from 'react-redux';
import Upload from'./upload';
import { submitPost } from '../../actions/post_actions';
import { openModal, closeModal } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ entities, session }) => ({
    currentUser: entities.users[session.id]
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        formAction: post => dispatch(submitPost(post)),
        closeModal: () => dispatch(closeModal())
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Upload));