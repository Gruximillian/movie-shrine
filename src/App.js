import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';

import actions from './store/actions';
import { getTmdbConfig } from './utils/fetch';

import classes from './App.module.css';

const App = props => {
    const setTmdbConfiguration = props.setTmdbConfiguration;

    useEffect(() => {
        getTmdbConfig(setTmdbConfiguration);
    }, [setTmdbConfiguration]);

    return (
        <Fragment>
            <Header/>
            <main className={classes.Main}>
                <p>Welcome to The Movie Shrine!</p>
                <SearchForm/>
                {
                    props.searchResults.results &&
                    <section className={classes.SearchResults}>
                        {props.searchResults.results.map(result => (
                            <SearchResult key={result.id} result={result} />
                        ))}
                    </section>
                }
            </main>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
