import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import actions from './store/actions';
import { getTmdbConfig } from './utils/fetch';

const App = props => {
    const setTmdbConfiguration = props.setTmdbConfiguration;

    useEffect(() => {
        getTmdbConfig(setTmdbConfiguration);
    }, [setTmdbConfiguration]);

    // TEMPORARY LOADING THE FIRST SEARCH RESULT POSTER FOR TESTING
    const imageBaseUrl = props.tmdbConfiguration.images && `${props.tmdbConfiguration.images.secure_base_url}original/`;
    const imagePath = props.searchResults.results && props.searchResults.results.length && props.searchResults.results[0].poster_path;
    const imageUrl = imageBaseUrl && imagePath && `${imageBaseUrl}${imagePath}`;

    return (
        <div>
            <Header/>
            <p>Welcome to The Movie Shrine!</p>
            <SearchForm/>
            {imageUrl && <img src={imageUrl} alt="" /> /* TEMPORARY */ }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration,
        searchResults: state.searchResults,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
