import { connect } from 'react-redux';
import { fetchPost, updatePost, deletePost, updatePostAttributes } from '../../../actions/post_actions';
import PostEdit from './post_edit';
import { openModal } from '../../../actions/ui_actions';


const msp = (state, ownProps) => {
    const allPosts = state.entities.posts;
    const postId = ownProps.match.params.postId;
    const post = allPosts[postId] || { user: {}, uploads: {}, title: ""};
    return {
        post: post,
        images: Object.values(post.uploads || {}),
    };
};

const mdp = (dispatch, ownProps) => {
    // TODO: add updateDescription and updateSortOrder
    return {
        fetchPost: () => dispatch(fetchPost(ownProps.match.params.postId)),
        updatePostAttributes: formPost => dispatch(updatePostAttributes(formPost)),
        deletePost: () => dispatch(deletePost(ownProps.match.params.postId)),
        openModal: (modal) => dispatch(openModal(modal)),
    };
};

export default connect(msp, mdp)(PostEdit);