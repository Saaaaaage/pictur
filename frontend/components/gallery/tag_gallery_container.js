import {connect} from 'react-redux';
import Gallery from './gallery';
import React from 'react';
import { fetchPostsByTag, clearPosts } from '../../actions/post_actions';
import {fetchTag} from '../../actions/tag_actions';
import TagGalleryBanner from './gallery_banner/tag_gallery_banner';

const msp = (state, ownProps) => {
    const tagId = ownProps.match.params.tagId;
    const tag = state.entities.tags[tagId] || {};
    return {
        posts: Object.values(state.entities.posts || {}),
        bannerObject: <TagGalleryBanner tag={tag}/>
    };
};

const mdp = (dispatch, ownProps) => {
    const tagId = ownProps.match.params.tagId;
    return {
        clearPosts: () => dispatch(clearPosts()),
        fetchOwner: () => dispatch(fetchTag(tagId)),
        fetchPosts: () => dispatch(fetchPostsByTag(tagId))
    };
};

export default connect(msp, mdp)(Gallery);