import Navbar from './navbar';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({entities, session}, ownProps) => ({
    currentUser: entities.users[session.id],
    components: ownProps.components
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);