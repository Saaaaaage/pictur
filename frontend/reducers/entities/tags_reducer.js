import {
    RECEIVE_TAGS,
    RECEIVE_TAG,
} from '../../actions/tag_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TAGS:
            return merge({}, state, action.tags);
        case RECEIVE_TAG:
            return merge({}, state, { [action.tag.id]: action.tag });
        default:
            return state;
    }
}