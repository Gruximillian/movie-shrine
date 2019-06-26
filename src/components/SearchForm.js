import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";

import classes from './SearchForm.module.css';
import actions from '../store/actions';
import movieShrineConfig from '../config/movieShrine';

const SearchForm = props => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const {
        setSearchHasResults,
        setQueryTerm,
        initiateSearch
    } = props;

    useEffect(() => {
        M.AutoInit();
    }, []);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const query = encodeURIComponent(searchTerm.trim());

        if (query === '') return; // Add message for the user to type something

        setSearchHasResults(true);
        setQueryTerm(query);
        initiateSearch(query, 1);
    };

    return (
        <form data-test="component-search-form" onSubmit={handleSubmit}>
            <div className={`${classes.Search} input-field`}>
                <input data-test="input-field" id="search-term" type="text" value={searchTerm} onChange={handleChange} />
                <label data-test="input-label" htmlFor="search-term">{movieShrineConfig.searchLabelText}</label>
            </div>
            <button data-test="submit-button" className={`btn`}>Search</button>
        </form>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setQueryTerm: term => dispatch(actions.setQueryTerm(term)),
        initiateSearch: (queryString, page) => dispatch(actions.initiateSearch(queryString, page)),
        setSearchHasResults: hasResults => dispatch(actions.setSearchHasResults(hasResults))
    }
};

export default connect(null, mapDispatchToProps)(SearchForm);
