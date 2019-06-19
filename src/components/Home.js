import React from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css';

import SearchForm from './SearchForm';
import SearchResultPerson from './SearchResultTemplatePerson';
import SearchResultTvOrMovie from './SearchResultTemplateTvOrMovie';

import actions from '../store/actions';


const Home = props => {
    const loadMore = () => {
        props.initiateSearch(props.queryTerm, props.searchResults.page + 1);
    };

    const showSearchResults = () => (
        <section className={classes.SearchResults}>
            {
                props.searchResults.results.map(result => {
                    return (result.media_type === 'person') ?
                        <SearchResultPerson key={result.id} result={result}/>
                    :
                        <SearchResultTvOrMovie key={result.id} result={result}/>;
                })
            }
        </section>
    );

    const noResultsMessage = () => (
        <div className={classes.NoResultsMessage}>
            No results for <span className={classes.SearchTerm}>"{decodeURIComponent(props.queryTerm)}"</span>
        </div>
    );

    const loadMoreButton = () => {
        if (props.searchResults.page < props.searchResults.total_pages) return (
            <div className={`${classes.LoadMore} center-align`}>
                <button className="btn" onClick={loadMore}>Load more</button>
            </div>
        )
    };

    return (
        <main className={classes.Main}>
            <p className={classes.WelcomeMessage}>Welcome to The Movie Shrine!</p>
            <SearchForm/>

            { props.searchResults.results.length > 0 && showSearchResults() }

            { !props.searchHasResults && noResultsMessage() }

            { loadMoreButton() }
        </main>
    );
};

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
        queryTerm: state.queryTerm,
        searchHasResults: state.searchHasResults
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initiateSearch: (query, page) => dispatch(actions.initiateSearch(query, page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
