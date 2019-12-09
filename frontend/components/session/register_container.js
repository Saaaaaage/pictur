import { connect } from 'react-redux';
import RegisterForm from './register_form';
import { register } from '../../actions/session_actions';

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    register: formUser => dispatch(register(formUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);