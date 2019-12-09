import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// TODO: Remove testing items
import {register, login, logout} from './actions/session_actions'

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);

    // TODO: Remove testing objects
    const pam = {
        username: "pam",
        password: "i<3jim",
        email: "pam@dunermifflin.biz",
        phone_number: "2345657745673"
    }
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.register = register;
    window.login = login;
    window.logout = logout;
    window.pam = pam;
})