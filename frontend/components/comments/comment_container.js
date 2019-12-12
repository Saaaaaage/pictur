import { connect } from 'react-redux';
import Comment from './comment';
import {
    deleteComment,
    fetchChildren,
    submitComment
} from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom'

    

const mapStateToProps = ( state, ownProps ) => {
    return {
        comment: ownProps.comment,
        children: Object.values(state.entities.comments[ownProps.comment.id] || {})
    }
}

const mapDispatchToProps = ( dispatch, ownProps) => {
    const postId = ownProps.match.params.postId;
    return {
        submitComment: formComment => dispatch(submitComment(postId, formComment)),
        fetchChildren: commentId => dispatch(fetchChildren(commentId)),
        deleteComment: commentId => dispatch(deleteComment(commentId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));