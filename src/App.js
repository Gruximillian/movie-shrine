import React, { useEffect, useCallback }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './components/Home';
import LoginModal from './components/LoginModal';
import MediaDetails from './components/MediaDetails';

import classes from './App.module.css';

import actions from './store/actions';
import config from './config/tmdb';
import { getTmdbConfig, getDetails } from './utils/fetch';
import { toggleBodyScroll } from './utils/functions';

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

    const getSessionId = useCallback(token => {
        // after the user allows the request_token, get the new session_id using that token
        const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${config.api_key}`;
        const body = JSON.stringify({
            "request_token": token
        });

        fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                const { success, session_id } = response;
                if (success) {
                    // save the session_id to localStorage so it can be used again
                    localStorage.setItem('movieShrineSession', JSON.stringify({ session_id }));
                    getDetails(session_id, setUserDetails);
                }
            })
            .catch(error => console.log(error));
    }, [setUserDetails]);

    useEffect(() => {
        // check if this was a redirect from TMDB site after the request_token confirmation
        const startingUrl = window.location.origin + window.location.pathname;
        const search = window.location.search;
        // if not, do nothing
        if (search === '') return;

        const params = search.substring(1).split('&');
        const searchObject = {};

        params.forEach(param => {
            const [ key, value ] = param.split('=');
            searchObject[key] = value;
        });

        if (searchObject.request_token && searchObject.approved === "true") {
            // if this was a redirect and the token is authorized, then get session_id
            getSessionId(searchObject.request_token);
        } else if (searchObject.denied === "true") {
            // if token is not authorized, clear the location bar query parameters
            window.location = startingUrl;
        }
    }, [getSessionId]);

    const handleKeyDown = useCallback(event => {
        if (event.key !== 'Escape') return;
        setInitModalClose(true);
    }, [setInitModalClose]);

    useEffect(() => {
        // load session data on mount if it is present
        const session = localStorage.getItem('movieShrineSession');
        if (!session) return;

        const { session_id } = JSON.parse(session);
        if (session_id) getDetails(session_id, setUserDetails);
    }, [setUserDetails]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

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
