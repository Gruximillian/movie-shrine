import React  from 'react';
import { connect } from 'react-redux';
import classes from './TmdbActions.module.css';

import icons from '../assets/icons';

const TmdbActions = props => {
    const {
        tmdbConfiguration,
        mediaType,
        mediaId,
        userDetails: {
            favourites,
            watchlist
        }
    } = props;

    const media = mediaType === 'movie' ? 'movies' : 'tvshows';

    const favouritesItems = favourites[media];
    const watchlistItems = watchlist[media];
    // console.log('fav', media, favouritesItems);
    // console.log('watch', media, watchlistItems);

    const isFavourite = favouritesItems.find(favouriteItem => favouriteItem.id === mediaId);
    const isInWatchList = watchlistItems.find(watchlistItem => watchlistItem.id === mediaId);

    const toggleItemInTmdbList = () => {
        // if (inList === 'favorites') setIsFavourite(true);
        // if (inList === 'watchlist') setIsInWatchList(true);
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
        tmdbConfiguration: state.tmdbConfiguration, // not sure if I need this
        userDetails: state.userDetails
    }
};

export default connect(mapStateToProps)(TmdbActions);
