export const getComment = commentId => {
    return $.ajax({
        url: `/api/comments/${commentId}`,
        method: 'GET'
    });
};

export const getCommentChildren = commentId => {
    return $.ajax({
        url: `/api/comments/${commentId}/children`,
        method: 'GET'
    });
};

export const createComment = (postId, comment) => {
    return $.ajax({
        url: `/api/posts/${postId}/comments`,
        method: 'POST',
        data: { comment }
    });
};

export const deleteComment = commentId => {
    return $.ajax({
        url: `/api/comments/${commentId}`,
        method: 'DELETE'
    });
};