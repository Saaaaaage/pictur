import * as TagApiUtil from '../util/tag_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';

const receiveTags = tags => ({
    type: RECEIVE_TAGS,
    tags
});

const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
});

export const fetchTags = () => dispatch => TagApiUtil.fetchTags()
    .then(
        tags => dispatch(receiveTags(tags)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    );

export const fetchTag = tagId => dispatch => TagApiUtil.fetchTag(tagId)
    .then(
        tag => dispatch(receiveTag(tag)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    );
