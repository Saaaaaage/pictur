import {connect} from 'react-redux';
import Gallery from './gallery';
import React from 'react';
import { fetchPosts, clearPosts } from '../../actions/post_actions';
import IndexBannerContainer from './gallery_banner/index_banner_container';

const msp = state => ({
    posts: Object.values(state.entities.posts || {}),
    bannerObject: <IndexBannerContainer/>
});

const mdp = dispatch => ({
    clearPosts: () => dispatch(clearPosts()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchOwner: () => true
});

export default connect(msp, mdp)(Gallery);