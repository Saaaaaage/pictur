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
            // If we're looking at comments, we're only interested in one Post's comments
            // so we do not include prev state in merge when receiving comments from a Post
            return merge({}, action.post.comments);
        case RECEIVE_COMMENTS:
            return merge({}, state, action.comments);
        case RECEIVE_COMMENT:
            let parent_id = action.comment.parent_id || 'root';
            let new_comment = { [action.comment.id]: action.comment };
            return merge({}, state, { [parent_id]: new_comment });
        case REMOVE_COMMENT:
            // debugger
            if (action.comment.deleted) {
                let parent_id = action.comment.parent_id || 'root';
                let deleted_comment = { [action.comment.id]: action.comment };
                return merge({}, state, { [parent_id]: deleted_comment });
            } else {
                const newState = Object.assign({}, state);
                delete newState[action.comment.parent_id || 'root'][action.comment.id];
                return newState;
            }
        case CLEAR_COMMENTS:
            return _default_state;
        default:
            return state;
    }
}