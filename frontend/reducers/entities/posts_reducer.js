import {
    RECEIVE_POSTS,
    RECEIVE_POST,
    REMOVE_POST
} from '../../actions/post_actions';
import {merge} from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState
    switch (action.type) {
        case RECEIVE_POSTS:
            return merge({}, state, action.posts)
        case RECEIVE_POST:
            return merge({}, state, { [action.post.id]: action.post })
        case REMOVE_POST:
            newState = Object.assign({}, state)
            delete newState[action.postId]
            return newState
        default:
            return state
    }
}