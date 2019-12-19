import PostShow from './post_show';
import {connect} from 'react-redux';
import { fetchPost } from '../../../actions/post_actions';
import {
    clearComments,
    submitComment
} from '../../../actions/comment_actions';

const msp = (state, ownProps) => {
    // TODO: the images.... that can't be right....

    const allPosts = state.entities.posts;
    const postId = ownProps.match.params.postId;
    const post = allPosts[postId] || { user: {} , uploads: {}, tags: {} };
    return {
        post: post,
        images: Object.values( post.uploads || {} ),
        rootComments: Object.values( state.entities.comments.root || {} )
    };
};

const mdp = (dispatch, ownProps) => ({
    loadPost: () => dispatch(fetchPost(ownProps.match.params.postId)),
    submitComment: formComment => dispatch(submitComment(ownProps.match.params.postId, formComment)),
    clearComments: () => dispatch(clearComments()),
});

export default connect(msp, mdp)(PostShow);