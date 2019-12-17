import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import { Switch, Route } from 'react-router-dom';
import AuthRoot from './session/auth_root';
import SplashGalleryContainer from './gallery/splash_gallery_container';
import TagGalleryContainer from './gallery/tag_gallery_container';
import UserGalleryContainer from './gallery/user_gallery_container';
import NewPost from './upload/new_post';
import PostShowContainer from './posts/post_show/post_show_container';
import PostEditContainer from './posts/post_edit/post_edit_container';

const App = () => {
    return (
        <div className='app'>
            <Switch>
                {/* Gallery Pages */}
                <Route exact path='/' component={SplashGalleryContainer}/>
                <Route exact path='/tags/:tagId' component={TagGalleryContainer}/>
                <Route exact path='/users/:userId' component={UserGalleryContainer}/>

                {/* Basically empty page with an upload modal */}
                <ProtectedRoute exact path='/upload' component={NewPost} />

                {/* Login and Sign In pages */}
                <AuthRoute exact path='/(login|register)' component={AuthRoot} />

                {/* Post show page */}
                <Route exact path="/posts/:postId" component={PostShowContainer} />

                {/* Post edit page */}
                {/* TODO: make sure only the owner can visit this page */}
                <ProtectedRoute exact path="/posts/:postId/edit" component={PostEditContainer} />
            </Switch>
        </div>
    )
}

export default App;