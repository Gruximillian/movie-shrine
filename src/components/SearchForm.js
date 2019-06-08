import React, { useEffect, useState } from 'react';
import M from "materialize-css";

import classes from './SearchForm.module.css';

const SearchForm = () => {
    useEffect(() => {
        M.AutoInit();
    });

    const [ searchTerm, setSearchTerm ] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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

export default SearchForm;
