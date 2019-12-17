import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login, clearErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: formUser => dispatch(login(formUser)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);