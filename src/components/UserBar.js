import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './UserBar.module.css';

const UserBar = props => {
    const [ listTypeSelected, setListTypeSelected ] = useState(null);

    const setListType = type => {
        // we want to toggle the secondary links bar if the user clicks on the same link
        const value = listTypeSelected === type ? null : type;
        setListTypeSelected(value);
    };

    return (
        <section className={classes.UserBar}>
            <div className={classes.PrimaryLinks}>
                <span
                    onClick={() => setListType('favourites')}
                    className={`${classes.UserAction} ${listTypeSelected === 'favourites' ? classes.Active : ''}`}>
                    Favourites
                </span>
                <span
                    onClick={() => setListType('watchlist')}
                    className={`${classes.UserAction} ${listTypeSelected === 'watchlist' ? classes.Active : ''}`}>
                    Watchlist
                </span>
            </div>
            <div className={`${classes.SecondaryLinks} ${listTypeSelected ? classes.Visible : ''}`}>
                <Link
                    onClick={() => setListTypeSelected(null)}
                    to={`/movies/${listTypeSelected}`}
                    className={classes.UserAction}>
                    Movies
                </Link>
                <Link
                    onClick={() => setListTypeSelected(null)}
                    to={`/tvshows/${listTypeSelected}`}
                    className={classes.UserAction}>
                    TV Shows
                </Link>
            </div>
        </section>
    );
};

export default UserBar;
