import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import { Switch, Route } from 'react-router-dom';
import AuthRoot from './session/auth_root';
import FrontPageContainer from './front_page/front_page_container';
import NewPost from './upload/new_post';
import PostShowContainer from './posts/post_show_container';

const App = () => {
    return (
        <div className='app'>
            <Switch>
                {/* Front Page */}
                <Route exact path='/' component={FrontPageContainer}/>

                {/* Basically empty page with an upload modal */}
                <Route path='/upload' component={NewPost} />

                {/* Login and Sign In pages */}
                <AuthRoute path='/(login|register)' component={AuthRoot} />

                <Route path="/posts/:postId" component={PostShowContainer} />
            </Switch>
        </div>
    )
}

export default App;