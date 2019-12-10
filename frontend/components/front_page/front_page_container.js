import {connect} from 'react-redux';
import FrontPage from './front_page';
import { fetchPosts } from '../../actions/post_actions'

const msp = state => ({
    posts: Object.values(state.entities.posts || {})
});
const mdp = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts())
});

export default connect(msp, mdp)(FrontPage);