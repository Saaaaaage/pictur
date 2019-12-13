import { connect } from 'react-redux';
import { fetchTags } from '../../actions/tag_actions'
import TagBanner from './tag_banner.jsx'

const msp = state => ({
    tags: Object.values(state.entities.tags || {})
})

const mdp = dispatch => ({
    fetchTags: () => dispatch(fetchTags())
})

export default connect(msp,mdp)(TagBanner)