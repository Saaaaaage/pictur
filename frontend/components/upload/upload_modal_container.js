import {connect} from 'react-redux';
import Upload from'./upload_modal';
import { submitPost } from '../../actions/post_actions';

const mapStateToProps = ({ entities, session }) => ({
    currentUser: entities.users[session.id]
})

const mapDispatchToProps = dispatch => ({
    submitPost: post => dispatch(submitPost(post))
});

export default connect(mapStateToProps,mapDispatchToProps)(Upload);