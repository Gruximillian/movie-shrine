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
