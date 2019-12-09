import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../util/user_api_util'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formUser: {
                username: "",
                email: "",
                password: "",
                retype_password: "",
                phone_number: ""
            },
            formErrors: {
                username: 'Sorry, that username is unavailable',
                email: 'Invalid email',
                password: 'Password must be at least 6 characters',
                retype_password: "Your passwords do not match!"
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    update(field) {
        return e => {
            let formUser = {...this.state.formUser}
            formUser[field] = e.target.value
            this.setState({ formUser })
        }
    }

    // TODO: front-end field validation
    validate(field) {
        return e => {
            switch (field) {
                case "username":
                    break;
                default:
                    break;
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formUser = Object.assign({}, this.state.formUser);
        delete formUser.password_check;
        this.props.register(formUser);
    }

    render() {
        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-auth-pages");

        return (
            <div className="auth-container">
                <span>{this.props.errors.join(" | ")}</span>
                <form onSubmit={this.handleSubmit} id='register-form'>
                    <div className='auth-input-group'>
                        <div className="auth-input-error">{this.state.formErrors.username}</div>
                        <input className="auth-input-field"
                            type="text"
                            placeholder="Username"
                            value={this.state.formUser.username}
                            onChange={this.update("username")}
                            onBlur={this.validate("username")}
                        />
                        <div className="auth-input-error">{this.state.formErrors.email}</div>
                        <input className="auth-input-field"
                            type="email"
                            placeholder="Email"
                            value={this.state.formUser.email}
                            onChange={this.update("email")}
                            onBlur={this.validate("email")}
                        />
                        <div className="auth-input-error">{this.state.formErrors.password}</div>
                        <input className="auth-input-field"
                            type="password"
                            placeholder="Password"
                            value={this.state.formUser.password}
                            onChange={this.update("password")}
                            onBlur={this.validate("password")}
                        />
                        <div className="auth-input-error">{this.state.formErrors.retype_password}</div>
                        <input className="auth-input-field"
                            type="password"
                            placeholder="Retype Password"
                            value={this.state.formUser.retype_password}
                            onChange={this.update("retype_password")}
                            onBlur={this.validate("retype_password")}
                        />
                        <input className="auth-input-field"
                            type="text"
                            placeholder="Phone Number"
                            value={this.state.formUser.phone_number}
                            onChange={this.update("phone_number")}
                            onBlur={this.validate("phone_number")}
                        />
                    </div>
                </form>
                <div className='after-form-group'>
                    <Link to='/login'>sign in</Link>
                    <button type="submit" className="button button-auth" form="register-form">Sign Up</button>
                </div>
            </div>
        )
    }
}

export default RegisterForm;