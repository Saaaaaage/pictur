import Navbar from './navbar';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({entities, session}, ownProps) => ({
    currentUser: entities.users[session.id],
    components: ownProps.components
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => {
        dispatch(logout());
        ownProps.history.push("/");
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));