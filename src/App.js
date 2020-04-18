import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResultTvOrMovie from './components/searchResultTemplateTvOrMovie';
import SearchResultPerson from './components/searchResultTemplatePerson';

import actions from './store/actions';
import { getTmdbConfig } from './utils/fetch';

import classes from './App.module.css';

const App = (props) => {
  const setTmdbConfiguration = props.setTmdbConfiguration;

  useEffect(() => {
    getTmdbConfig(setTmdbConfiguration);
  }, [setTmdbConfiguration]);

  const loadMore = () => {
    props.initiateSearch(props.queryTerm, props.searchResults.page + 1);
  };

  return (
    <Fragment>
      <Header />
      <main className={classes.Main}>
        <p>Welcome to The Movie Shrine!</p>
        <SearchForm />

        {props.searchResults.results.length ? (
          <section className={classes.SearchResults}>
            {props.searchResults.results.map((result) => {
              if (result.media_type === 'person') return <SearchResultPerson key={result.id} result={result} />;
              return <SearchResultTvOrMovie key={result.id} result={result} />;
            })}
          </section>
        ) : !props.searchHasResults ? (
          <div className={classes.NoResultsMessage}>
            No results for <span className={classes.SearchTerm}>"{decodeURIComponent(props.queryTerm)}"</span>
          </div>
        ) : null}

        {props.searchResults.page < props.searchResults.total_pages && (
          <div className={`${classes.LoadMore} center-align`}>
            <button className="btn" onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    queryTerm: state.queryTerm,
    searchHasResults: state.searchHasResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTmdbConfiguration: (config) => dispatch(actions.setTmdbConfiguration(config)),
    initiateSearch: (query, page) => dispatch(actions.initiateSearch(query, page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
