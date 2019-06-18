import React from 'react';
import { connect } from 'react-redux';

import classes from './UserBar.module.css';

import config from '../config/tmdb';
// import actions from "../store/actions";

import { getSessionIdFromStorage } from '../utils/functions';

const UserBar = props => {
    const { userDetails: id } = props;
    const sessionId = getSessionIdFromStorage();

    const getUserFavourites = userId => {
        const movieFavouritesUrl = `${config.api_url_v3}/account/${id}/favorite/movies?api_key=${config.api_key}&session_id=${sessionId}&sort_by=created_at.asc&page=1`;
        const tvFavouritesUrl = `${config.api_url_v3}/account/${id}/favorite/tv?api_key=${config.api_key}&session_id=${sessionId}&sort_by=created_at.asc&page=1`;

        fetch(movieFavouritesUrl)
            .then(response => response.json())
            .then(response => {
                console.log('Favourite movies:');
                console.log(response);
            })
            .catch(error => console.error(error));

        fetch(tvFavouritesUrl)
            .then(response => response.json())
            .then(response => {
                console.log('Favourite TV shows:');
                console.log(response);
            })
            .catch(error => console.error(error));
    };

    const getUserWatchLaterList = userId => {
        const movieWatchListUrl = `${config.api_url_v3}/account/${id}/watchlist/movies?api_key=${config.api_key}&session_id=${sessionId}&sort_by=created_at.asc&page=1`;
        const tvWatchListUrl = `${config.api_url_v3}/account/${id}/watchlist/tv?api_key=${config.api_key}&session_id=${sessionId}&sort_by=created_at.asc&page=1`;

        fetch(movieWatchListUrl)
            .then(response => response.json())
            .then(response => {
                console.log('Movies to watch later:');
                console.log(response);
            })
            .catch(error => console.error(error));

        fetch(tvWatchListUrl)
            .then(response => response.json())
            .then(response => {
                console.log('TV shows to watch later:');
                console.log(response);
            })
            .catch(error => console.error(error));
    };

    return (
        <section className={classes.UserBar}>
            <span onClick={() => getUserFavourites(id)} className={classes.UserAction}>Favourites</span>
            <span onClick={() => getUserWatchLaterList(id)} className={classes.UserAction}>Watch later</span>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        // setShowLoginModal: show => dispatch(actions.setShowLoginModal(show)),
        // setUserDetails: details => dispatch(actions.setUserDetails(details)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
