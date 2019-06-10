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

    const loadMore = () => {
        props.initiateSearch(props.queryTerm, props.searchResults.page + 1);
    };

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
                            <SearchResult key={`${props.searchResults.page}-${result.id}`} result={result} />
                        ))}
                    </section>
                }
                {props.searchResults.page < props.searchResults.total_pages &&
                    <div className="center-align">
                        <button className="btn" onClick={loadMore}>Load more</button>
                    </div>
                }
            </main>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
        queryTerm: state.queryTerm
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config)),
        initiateSearch: (query, page) => dispatch(actions.initiateSearch(query, page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
