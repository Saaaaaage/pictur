import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => {
            this.setState({[field]: e.target.value})
        }
    }

    demoLogin() {
        this.props.login({
            username: 'pam',
            password: 'i<3jim'
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const formUser = Object.assign({}, this.state);
        this.props.login(formUser);
    }

    render () {
        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-auth-pages");
        
        return (
            <div className="auth-container">
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <div className='auth-input-group'>
                        {this.props.errors.length > 0 &&
                            <input
                            className='auth-input-group auth-input-field auth-error'
                            value={this.props.errors.join(" | ")}
                            disabled
                            />
                                
                            
                        }
                        <input className="auth-input-field"
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.update("username")}
                        />
                        <input className="auth-input-field"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update("password")}
                        />
                    </div>
                </form>
                <div className='after-form-group'>
                    <Link to='/register'>need an account?</Link>
                    <button
                        onClick={this.demoLogin}
                        className="button button-auth"
                    >Demo Login</button>
                    <button
                        type="submit"
                        className="button button-auth"
                        form="login-form"
                    >Sign In</button>
                </div>
            </div>
        )
    }
}

export default LoginForm;