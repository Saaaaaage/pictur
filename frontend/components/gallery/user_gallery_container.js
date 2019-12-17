import {connect} from 'react-redux';
import Gallery from './gallery';
import React from 'react';
import {
    fetchPostsByUser,
    clearPosts,
} from '../../actions/post_actions';
import { fetchUser } from '../../actions/user_actions';
import UserGalleryBanner from './gallery_banner/user_gallery_banner';

const msp = (state, ownProps) => {
    const userId = ownProps.match.params.userId;
    const user = state.entities.users[userId] || {};
    return {
        posts: Object.values(state.entities.posts || {}),
        bannerObject: <UserGalleryBanner user={user}/>
    }
};

const mdp = (dispatch, ownProps) => {
    const userId = ownProps.match.params.userId;
    return {
        clearPosts: () => dispatch(clearPosts()),
        fetchOwner: () => dispatch(fetchUser(userId)),
        fetchPosts: () => dispatch(fetchPostsByUser(userId))
    };
};

export default connect(msp, mdp)(Gallery);