import React, { useEffect, useCallback }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './components/Home';
import LoginModal from './components/LoginModal';
import MediaDetails from './components/MediaDetails';
import UserBar from './components/UserBar';
import ShowUserListMedia from './components/ShowUserListMedia';

import classes from './App.module.css';

import actions from './store/actions';

import {
    requestSessionId
} from './utils/fetch';

import {
    toggleBodyScroll,
    backToStartingUrl,
    getSearchObjectFromLocation,
    getSessionIdFromStorage
} from './utils/functions';

const App = props => {
    const {
        tmdbConfiguration,
        showBackdrop,
        showLoginModal,
        loggedIn,
        setInitModalClose,
        setLoggedIn,
        initiateGetTmdbConfig,
        initiateGetUserDetails
    } = props;

    const handleKeyDown = useCallback(event => {
        if (event.key !== 'Escape') return;
        setInitModalClose(true);
    }, [setInitModalClose]);

    useEffect(() => {
        const searchObject = getSearchObjectFromLocation();
        if (!searchObject) return;

        if (searchObject.request_token && searchObject.approved === 'true') {
            // if this was a redirect and the token is authorized, then get session_id
            requestSessionId(searchObject.request_token, setLoggedIn);
        } else if (searchObject.denied === 'true') {
            // if token is not authorized, clear the location bar query parameters
            backToStartingUrl();
        }
    }, [setLoggedIn]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!loggedIn) return;
        const sessionId = getSessionIdFromStorage();
        initiateGetUserDetails(sessionId);
    }, [loggedIn, initiateGetUserDetails]);

    useEffect(() => {
        const sessionId = getSessionIdFromStorage();
        if (sessionId) setLoggedIn(true);
    }, [setLoggedIn]);

    useEffect(() => {
        initiateGetTmdbConfig();
    }, [initiateGetTmdbConfig]);

    useEffect(() => {
        localStorage.setItem('movieShrineTmdbConfig', JSON.stringify(tmdbConfiguration));
    }, [tmdbConfiguration]);

    useEffect(() => {
        toggleBodyScroll(showBackdrop);
    }, [showBackdrop]);

    const appClass = showBackdrop ? `${classes.Backdrop} ${classes.MovieShrineApp}` : classes.MovieShrineApp;

    return (
        <BrowserRouter>
            {console.log(props.userDetails)}
            <div className={appClass}>
                {showLoginModal && !loggedIn && <LoginModal/>}
                <Header/>
                {loggedIn && <UserBar/>}
                <Route exact path="/" component={Home} />
                <Route path="/movie/:id" render={props => <MediaDetails {...props} mediaType="movie" />} />
                <Route path="/tv/:id" render={props => <MediaDetails {...props} mediaType="tv" />} />
                <Route path="/movies/:listType" render={props => <ShowUserListMedia {...props} mediaType="movies" />} />
                <Route path="/tvshows/:listType" render={props => <ShowUserListMedia {...props} mediaType="tvshows" />} />
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration,
        showBackdrop: state.showBackdrop,
        showLoginModal: state.showLoginModal,
        loggedIn: state.loggedIn,
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setInitModalClose: initModalClose => dispatch(actions.setInitModalClose(initModalClose)),
        setLoggedIn: loggedIn => dispatch(actions.setLoggedIn(loggedIn)),
        initiateGetUserDetails: sessionId => dispatch(actions.initiateGetUserDetails(sessionId)),
        initiateGetTmdbConfig: () => dispatch(actions.initiateGetTmdbConfig())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
