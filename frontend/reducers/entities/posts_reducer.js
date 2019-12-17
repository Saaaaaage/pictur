import {
    RECEIVE_POSTS,
    RECEIVE_POST,
    REMOVE_POST,
    CLEAR_POSTS
} from '../../actions/post_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_POSTS:
            return merge({}, state, action.posts);
        case RECEIVE_POST:
            // TODO: This might be a bad idea... should posts remember who their comments are?
            const post = merge({}, action.post);
            delete post.comments;
            return merge({}, state, { [post.id]: post });
        case REMOVE_POST:
            newState = Object.assign({}, state);
            delete newState[action.postId];
            return newState;
        case CLEAR_POSTS:
            return {};
        default:
            return state;
    }
}