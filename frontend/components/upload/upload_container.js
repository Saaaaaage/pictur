import {connect} from 'react-redux';
import Upload from'./upload';
import { submitPost } from '../../actions/post_actions';
import { openModal, closeModal } from '../../actions/ui_actions';

const mapStateToProps = ({ entities, session }) => ({
    currentUser: entities.users[session.id]
})

const mapDispatchToProps = dispatch => ({
    submitPost: post => dispatch(submitPost(post)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(Upload);