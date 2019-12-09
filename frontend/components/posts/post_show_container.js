import PostShow from './post_show';
import {connect} from 'react-redux';
import { fetchPost } from '../../actions/post_actions';

const msp = (state, ownProps) => {
    // TODO: the images.... that can't be right....
    return {
        post: state.entities.posts[ownProps.match.params.postId] || {},
        images: Object.values((state.entities.posts[ownProps.match.params.postId] || {}).uploads || {})
    }
};

const mdp = (dispatch, ownProps) => ({
    loadPost: () => dispatch(fetchPost(ownProps.match.params.postId))
});

export default connect(msp, mdp)(PostShow);