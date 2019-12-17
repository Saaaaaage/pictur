import { connect } from 'react-redux';
import { updatePostAttributes } from '../../../actions/post_actions';
import { findTags } from '../../../util/tag_api_util';
import AddTags from './add_tags';

const msp = (state, ownProps) => {
  return {
    post: 1,//post,
    tags: [
      { name: "puppies", post_count: 2934875, id: 1 },
      { name: "tuesday", post_count: 3, id: 2 },
      { name: "whatever", post_count: 23, id: 3 },
      { name: "imgur", post_count: 73, id: 4 },
      { name: "blue", post_count: 3457, id: 5 },
    ]
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    updatePostAttributes: formPost => dispatch(updatePostAttributes(formPost)),
    findTags: query => findTags(query)
  };
};

export default connect(msp, mdp)(AddTags);