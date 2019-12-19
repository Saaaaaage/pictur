import {connect} from 'react-redux';
import Gallery from './gallery';
import React from 'react';
import { fetchPosts, clearPosts } from '../../actions/post_actions';
import IndexBannerContainer from './gallery_banner/index_banner_container';
import { setLoading } from '../../actions/ui_actions';

const msp = state => ({
    posts: Object.values(state.entities.posts || {}),
    currentUserId: state.session.id,
    uiLoading: state.ui.loading,
    bannerObject: <IndexBannerContainer/>
});

const mdp = dispatch => ({
    clearPosts: () => dispatch(clearPosts()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchOwner: () => true,
    setLoading: (value) => dispatch(setLoading(value))
});

export default connect(msp, mdp)(Gallery);