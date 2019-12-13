import {
    RECEIVE_TAGS,
} from '../../actions/tag_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TAGS:
            return merge({}, state, action.tags)
        default:
            return state
    }
}