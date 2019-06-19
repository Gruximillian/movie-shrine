import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './TmdbActions.module.css';

import icons from '../assets/icons';

const TmdbActions = props => {
    const [ isFavourite, setIsFavourite ] = useState(false);
    const [ isInWatchList, setIsInWatchList ] = useState(false);

    const {
        tmdbConfiguration
    } = props;

    const toggleItemInTmdbList = listType => {
        if (listType === 'favorites') setIsFavourite(!isFavourite);
        if (listType === 'watchlist') setIsInWatchList(!isInWatchList);
    };

    const favouriteClass = `${classes.TmdbAction} ${classes.TmdbActionAddToFavourite} ${isFavourite ? classes.isFavourite : ''}`;
    const watchlistClass = `${classes.TmdbAction} ${classes.TmdbActionAddToWatchlist} ${isInWatchList ? classes.isInWatchlist : ''}`;

    return (
        <div data-preventclick className={classes.TmdbActionsContainer}>
            <div
                className={favouriteClass}
                data-preventclick
                onClick={() => toggleItemInTmdbList('favorites')}>
                {icons.star}
            </div>
            <div
                className={watchlistClass}
                data-preventclick
                onClick={() => toggleItemInTmdbList('watchlist')}>
                {icons.watch}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(TmdbActions);
