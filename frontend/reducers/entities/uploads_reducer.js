import {
    RECEIVE_POST,
    REMOVE_POST
} from '../../actions/post_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        default:
            return state;
    }
}