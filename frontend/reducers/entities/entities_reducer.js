import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import uploadsReducer from './uploads_reducer';
import commentsReducer from './comments_reducer';

export default combineReducers({
    users: usersReducer,
    posts: postsReducer,
    uploads: uploadsReducer,
    comments: commentsReducer
});