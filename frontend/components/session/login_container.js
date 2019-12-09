import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login } from '../../actions/session_actions';

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: formUser => dispatch(login(formUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);