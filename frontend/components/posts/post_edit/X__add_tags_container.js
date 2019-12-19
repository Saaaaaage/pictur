import { connect } from 'react-redux';
import { updatePostAttributes } from '../../../actions/post_actions';
import { findTags } from '../../../util/tag_api_util';
import AddTagsDialogue from './add_tags_dialogue';

const msp = (state, ownProps) => {
  return {
    post: 1,//post,
    // tags: Object.values(findTags(""))
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    updatePostAttributes: formPost => dispatch(updatePostAttributes(formPost)),
    findTags: query => findTags(query)
  };
};

export default connect(msp, mdp)(AddTagsDialogue);