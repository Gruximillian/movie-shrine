import React, { useEffect, useCallback }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './components/Home';
import LoginModal from './components/LoginModal';
import MediaDetails from './components/MediaDetails';

import classes from './App.module.css';

import actions from './store/actions';
import { getTmdbConfig } from './utils/fetch';
import { toggleBodyScroll } from './utils/functions';

const App = props => {
    const setTmdbConfiguration = props.setTmdbConfiguration;
    const tmdbConfig = props.tmdbConfiguration;

    const startSession = useCallback(token => {
        const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=38535774dcac925adbeee9476d08b67d`;
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
                getDetails(response.session_id);
                console.log(response);
            })
            .catch(error => console.log(error));
    }, []);

    const getDetails = sessionId => {
        const url = `https://api.themoviedb.org/3/account?api_key=38535774dcac925adbeee9476d08b67d&session_id=${sessionId}`;
        fetch(url)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        const startingUrl = window.location.origin + window.location.pathname;
        const search = window.location.search;
        if (search === '') return;

        const params = search.substring(1).split('&');
        const searchObject = {};

        params.forEach(param => {
            const [ key, value ] = param.split('=');
            searchObject[key] = value;
        });

        if (searchObject.request_token && searchObject.approved === "true") {
            startSession(searchObject.request_token);
        } else if (searchObject.denied === "true") {
            window.location = startingUrl;
        }
    }, [startSession]);

    const handleKeyDown = useCallback(event => {
        if (event.key !== 'Escape') return;
        props.setInitModalClose(true);
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        getTmdbConfig(setTmdbConfiguration);
    }, [setTmdbConfiguration]);

    useEffect(() => {
        localStorage.setItem('movieShrineTmdbConfig', JSON.stringify(tmdbConfig));
    }, [tmdbConfig]);

    useEffect(() => {
        toggleBodyScroll(props.showBackdrop);
    }, [props.showBackdrop]);

    const appClass = props.showBackdrop ? `${classes.Backdrop} ${classes.MovieShrineApp}` : classes.MovieShrineApp;

    return (
        <BrowserRouter>
            <div className={appClass}>
                {props.showLoginModal && <LoginModal/>}
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
        showLoginModal: state.showLoginModal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config)),
        setInitModalClose: initModalClose => dispatch(actions.setInitModalClose(initModalClose))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
