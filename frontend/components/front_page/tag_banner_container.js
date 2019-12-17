import { connect } from 'react-redux';
import { fetchTags } from '../../actions/tag_actions'
import TagBanner from './tag_banner.jsx'

const msp = state => {
    const tags = Object.values(state.entities.tags || {})
    const sorted = tags.sort((a, b) => b.post_count - a.post_count);
    return ({
        tags: sorted
    })
}

const mdp = dispatch => ({
    fetchTags: () => dispatch(fetchTags())
})

export default connect(msp,mdp)(TagBanner)