import {
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    REMOVE_COMMENT,
    CLEAR_COMMENTS
} from '../../actions/comment_actions';
import {
    RECEIVE_POST,
    REMOVE_POST
} from '../../actions/post_actions';
import { merge } from 'lodash';

const _default_state = {root:{}};

// TODO: Should remove post remove the associated comment data?
export default (state = _default_state, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_POST:
            return merge({}, state, action.post.comments);
        case RECEIVE_COMMENTS:
            return merge({}, state, action.comments);
        case RECEIVE_COMMENT:
            const parent_id = action.comment.parent_id || 'root';
            const new_comment = { [action.comment.id]: action.comment };
            return merge({}, state, { [parent_id]: new_comment });
        case REMOVE_COMMENT:
            const newState = Object.assign({}, state)
            delete newState[action.parentId || 'root'][action.commentId];
            return newState;
        case CLEAR_COMMENTS:
            return {};
        default:
            return state;
    }
}