import {
    RECEIVE_POST,
    RECEIVE_POST_ERRORS,
    CLEAR_ERRORS
} from '../actions/post_actions';

const _nullErrors = [];

export default (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors;
        case RECEIVE_POST:
            return _nullErrors;
        case CLEAR_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};