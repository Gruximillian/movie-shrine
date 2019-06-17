import React, { useEffect, useCallback }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './components/Home';
import LoginModal from './components/LoginModal';
import MediaDetails from './components/MediaDetails';

import classes from './App.module.css';

import actions from './store/actions';

import {
    getTmdbConfig,
    getDetails,
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
        userDetails,
        setTmdbConfiguration,
        setUserDetails,
        setInitModalClose
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
            requestSessionId(searchObject.request_token, setUserDetails);
        } else if (searchObject.denied === 'true') {
            // if token is not authorized, clear the location bar query parameters
            backToStartingUrl();
        }
    }, [setUserDetails]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        const sessionId = getSessionIdFromStorage();
        if (sessionId) getDetails(sessionId, setUserDetails);
    }, [setUserDetails]);

    useEffect(() => {
        getTmdbConfig(setTmdbConfiguration);
    }, [setTmdbConfiguration]);

    useEffect(() => {
        localStorage.setItem('movieShrineTmdbConfig', JSON.stringify(tmdbConfiguration));
    }, [tmdbConfiguration]);

    useEffect(() => {
        toggleBodyScroll(showBackdrop);
    }, [showBackdrop]);

    const appClass = showBackdrop ? `${classes.Backdrop} ${classes.MovieShrineApp}` : classes.MovieShrineApp;

    return (
        <BrowserRouter>
            <div className={appClass}>
                {showLoginModal && !userDetails.username && <LoginModal/>}
                <Header/>
                <Route exact path="/" component={Home} />
                <Route path="/movie/:id" render={props => <MediaDetails {...props} mediaType="movie" />} />
                <Route path="/tv/:id" render={props => <MediaDetails {...props} mediaType="tv" />} />
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration,
        showBackdrop: state.showBackdrop,
        showLoginModal: state.showLoginModal,
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config)),
        setInitModalClose: initModalClose => dispatch(actions.setInitModalClose(initModalClose)),
        setUserDetails: details => dispatch(actions.setUserDetails(details)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
