import React, { useEffect }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Home from './components/Home';
import MediaDetails from './containers/MediaDetails';

import actions from './store/actions';
import { getTmdbConfig } from './utils/fetch';

const App = props => {
    const setTmdbConfiguration = props.setTmdbConfiguration;
    const tmdbConfig = props.tmdbConfiguration;

    const startSession = token => {
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
    };

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
    }, []);

    useEffect(() => {
        getTmdbConfig(setTmdbConfiguration);
    }, [setTmdbConfiguration]);

    useEffect(() => {
        localStorage.setItem('movieShrineTmdbConfig', JSON.stringify(tmdbConfig));
    }, [tmdbConfig]);

    return (
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home} />
            <Route path="/movie/:id" render={props => <MediaDetails {...props} mediaType="movie" />} />
            <Route path="/tv/:id" render={props => <MediaDetails {...props} mediaType="tv" />} />
        </BrowserRouter>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
