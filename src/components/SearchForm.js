import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";

import classes from './SearchForm.module.css';
import actions from '../store/actions';

const SearchForm = props => {
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        M.AutoInit();
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = encodeURIComponent(searchTerm.trim());

        if (query === '') return; // Add message for the user to type something

        props.setSearchHasResults(true);
        props.setQueryTerm(query);
        props.initiateSearch(query, 1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`${classes.Search} input-field`}>
                <input id="search-term" type="text" value={searchTerm} onChange={handleChange} />
                <label htmlFor="search-term">Search for the movies, TV shows or people</label>
            </div>
            <button className={`btn`}>Search</button>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration,
        queryTerm: state.queryTerm
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setQueryTerm: term => dispatch(actions.setQueryTerm(term)),
        initiateSearch: (queryString, page) => dispatch(actions.initiateSearch(queryString, page)),
        setSearchHasResults: hasResults => dispatch(actions.setSearchHasResults(hasResults))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
