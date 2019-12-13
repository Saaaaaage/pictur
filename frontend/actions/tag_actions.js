import * as TagApiUtil from '../util/tag_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';

const receiveTags = tags => ({
    type: RECEIVE_TAGS,
    tags
});

export const fetchTags = () => dispatch => TagApiUtil.fatchTags()
    .then(
        tags => dispatch(receiveTags(tags)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    );