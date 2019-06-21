import React  from 'react';
import { connect } from 'react-redux';
import classes from './TmdbActions.module.css';

import icons from '../assets/icons';

import actions from '../store/actions';

const TmdbActions = props => {
    const {
        mediaItem,
        userDetails: {
            favorite,
            watchlist,
            id
        },
        initiateToggleItemInMediaList
    } = props;

    const mediaType = mediaItem.media_type === 'movie' ? 'movies' : 'tv';
    const mediaId = mediaItem.id;

    const favouritesItems = favorite && favorite[mediaType];
    const watchlistItems = watchlist && watchlist[mediaType];

    const isFavourite = favouritesItems && !!favouritesItems.find(favouriteItem => favouriteItem.id === mediaId);
    const isInWatchList = watchlistItems && !!watchlistItems.find(watchlistItem => watchlistItem.id === mediaId);

    const toggleItemInList = listType => {
        const isInList = listType === 'favorite' ? !isFavourite : !isInWatchList;
        initiateToggleItemInMediaList(listType, mediaItem, id, isInList);
    };

    const favouriteClass = `${classes.TmdbAction} ${classes.TmdbActionAddToFavourite} ${isFavourite ? classes.isFavourite : ''}`;
    const watchlistClass = `${classes.TmdbAction} ${classes.TmdbActionAddToWatchlist} ${isInWatchList ? classes.isInWatchlist : ''}`;

    return (
        <div data-preventclick className={classes.TmdbActionsContainer}>
            <div
                className={favouriteClass}
                data-preventclick
                onClick={() => toggleItemInList('favorite')}>
                {icons.star}
            </div>
            <div
                className={watchlistClass}
                data-preventclick
                onClick={() => toggleItemInList('watchlist')}>
                {icons.watch}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initiateToggleItemInMediaList: (listType, mediaItem, userId, isInList) => dispatch(actions.initiateToggleItemInMediaList(listType, mediaItem, userId, isInList)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TmdbActions);
