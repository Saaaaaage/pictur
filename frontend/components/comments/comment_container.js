import { connect } from 'react-redux';
import Comment from './comment';
import {
    deleteComment,
    fetchChildren,
    submitComment,
    fetchComment
} from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom'

    

const mapStateToProps = ( state, ownProps ) => {
    const parentId = ownProps.comment.parent_id || 'root';
    const commentId = ownProps.comment.id;
    const comment = state.entities.comments[parentId][commentId];
    return {
        comment: comment,
        body: comment.body,
        currentUserId: state.session.id,
        children: Object.values(state.entities.comments[ownProps.comment.id] || {})
    };
};

const mapDispatchToProps = ( dispatch, ownProps) => {
    const postId = ownProps.match.params.postId;
    return {
        submitComment: formComment => dispatch(submitComment(postId, formComment)),
        fetchChildren: commentId => dispatch(fetchChildren(commentId)),
        deleteComment: commentId => dispatch(deleteComment(commentId)),
        fetchComment: () => dispatch(fetchComment(ownProps.comment.id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));