import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";

import classes from './SearchForm.module.css';
import actions from "../store/actions";

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
        props.setQueryTerm(query);
        props.initiateSearch(query, 1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`${classes.Search} input-field`}>
                <input id="search-term" type="text" value={searchTerm} onChange={handleChange} />
                <label htmlFor="search-term">Search for the movies</label>
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
        initiateSearch: (queryString, page) => dispatch(actions.initiateSearch(queryString, page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
