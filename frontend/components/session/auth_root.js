import React from 'react';
import LoginContainer from './login_container';
import RegisterContainer from './register_container';
import {Link} from 'react-router-dom';
import { AuthRoute } from '../../util/route_util'


export default props => {
    return (
        <div>
            <Link to="/">
                <span className="logo auth-back">
                    p
                </span>
                back to Pictur
            </Link>

            <section className="auth-body">
                <Link to="/">
                    <span className="logo-big">
                        pictur
                    </span>
                </Link>

                <AuthRoute path='/login' component={LoginContainer} />
                <AuthRoute path='/register' component={RegisterContainer} />
            </section>
        </div>
    )
}