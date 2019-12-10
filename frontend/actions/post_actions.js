import * as PostAPI from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';

export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})

const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

const removePost = postId => ({
    type: REMOVE_POST,
    postId
})

const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
})

export const fetchPosts = () => dispatch => PostAPI.getPosts()
    .then(
        posts => dispatch(receivePosts(posts)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )

export const fetchPost = postId => dispatch => PostAPI.getPost(postId)
    .then(
        post => dispatch(receivePost(post)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )

export const submitPost = formPost => dispatch => PostAPI.createPost(formPost)
    .then(
        savedPost => dispatch(receivePost(savedPost)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )

export const editPost = formPost => dispatch => PostAPI.updatePost(formPost)
    .then(
        updatedPost => dispatch(receivePost(updatedPost)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )

export const deletePost = postId => dispatch => PostAPI.deletePost(postId)
    .then(
        () => dispatch(removePost(postId)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )