import React from 'react';
import { Link } from 'react-router-dom';
// import * as UserApiUtil from '../../util/user_api_util';
import { debounce } from 'lodash';

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
                username: '',
                email: '',
                password: '',
                retype_password: ""
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
            let error = "";
            switch (field) {
                case "username":
                    // Check for only letters and numbers
                    const username_re = /^[a-z0-9]+$/i;
                    if (!username_re.test(e.target.value)) {
                        error = 'Usernames can only contain letters and numbers';
                        break;
                    }

                    // Check availability
                    $.ajax({
                        url: `api/username_available/${e.target.value}`,
                        method: 'GET',
                        success: ((result) => {
                            if (!result) {
                                this.setState({ formErrors: { ...this.state.formErrors, [field]: 'Sorry, that username is unavailable.' } })
                            }
                        }).bind(this)
                    })
                    break;
                case "email":
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(e.target.value)) {
                        error = 'Invalid email address';
                    }
                    break;
                case "password":
                    if (this.state.formUser.password.length < 6)
                        error = 'Password must be at least 6 characters';
                    break;
                case "retype_password":
                    if (this.state.formUser.password != this.state.formUser.retype_password) {
                        error = 'Your passwords do not match!';
                    }
                    break;
                default:
                    break;
            }
            this.setState({ formErrors: { ...this.state.formErrors, [field]: error } })
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
                        {this.state.formErrors.username &&
                            <div className="auth-input-error">{this.state.formErrors.username}</div>
                        }
                        <input className="auth-input-field"
                            type="text"
                            placeholder="Username"
                            value={this.state.formUser.username}
                            onChange={this.update("username")}
                            onBlur={this.validate("username")}
                        />
                        {this.state.formErrors.email &&
                            <div className="auth-input-error">{this.state.formErrors.email}</div>
                        }
                        <input className="auth-input-field"
                            type="email"
                            placeholder="Email"
                            value={this.state.formUser.email}
                            onChange={this.update("email")}
                            onBlur={this.validate("email")}
                        />
                        {this.state.formErrors.password &&
                            <div className="auth-input-error">{this.state.formErrors.password}</div>
                        }
                        <input className="auth-input-field"
                            type="password"
                            placeholder="Password"
                            value={this.state.formUser.password}
                            onChange={this.update("password")}
                            onBlur={this.validate("password")}
                        />
                        {this.state.formErrors.retype_password &&
                            <div className="auth-input-error">{this.state.formErrors.retype_password}</div>
                        }
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
                            // onBlur={this.validate("phone_number")}
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