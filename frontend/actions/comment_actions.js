import * as CommentApi from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const removeComment = comment => ({
    type: REMOVE_COMMENT,
    commentId: comment.id,
    parentId: comment.parent_id
});

export const clearComments = () => ({
    type: CLEAR_COMMENTS
});

const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const fetchChildren = commentId => dispatch => CommentApi.getCommentChildren(commentId)
    .then(
        comments => dispatch(receiveComments(comments)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    );

export const submitComment = (postId, formComment) => dispatch => CommentApi.createComment(postId, formComment)
    .then(
        savedComment => dispatch(receiveComment(savedComment)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    );

export const deleteComment = commentId => dispatch => CommentApi.deleteComment(commentId)
    .then(
        comment => dispatch(removeComment(comment)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    );