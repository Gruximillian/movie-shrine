import { put } from 'redux-saga/effects';

import config from '../../config/tmdb';
import actions from '../actions';

import { backToStartingUrl, getSessionIdFromStorage, mediaListUrl } from '../../utils/functions';

export function* getUserDetailsSaga(action) {
    try {
        const userAccountDetails = yield fetch(`${config.api_url_v3}/account?api_key=${config.api_key}&session_id=${action.sessionId}`);
        const userAccountDetailsJSON = yield userAccountDetails.json();
        const { id } = userAccountDetailsJSON;

        if (!id) return; // maybe do something sensible, like message the user that something is wrong
        const credentials = {
            id: id,
            sessionId: action.sessionId
        };

        const movieFavouritesUrl = mediaListUrl('favorite', 'movies', credentials);
        const favouriteMovies = yield fetch(movieFavouritesUrl);
        const favouriteMoviesJSON = yield favouriteMovies.json();

        const tvFavouritesUrl = mediaListUrl('favorite', 'tv', credentials);
        const favouriteTVShows = yield fetch(tvFavouritesUrl);
        const favouriteTVShowsJSON = yield favouriteTVShows.json();

        userAccountDetailsJSON.favourites = {
            movies: favouriteMoviesJSON,
            tvshows: favouriteTVShowsJSON
        };

        const movieWatchListUrl = mediaListUrl('watchlist', 'movies', credentials);
        const watchlistMovies = yield fetch(movieWatchListUrl);
        const watchlistMoviesJSON = yield watchlistMovies.json();

        const tvWatchListUrl = mediaListUrl('watchlist', 'tv', credentials);
        const watchlistTVShows = yield fetch(tvWatchListUrl);
        const watchlistTVShowsJSON = yield watchlistTVShows.json();

        userAccountDetailsJSON.watchlist = {
            movies: watchlistMoviesJSON,
            tvshows: watchlistTVShowsJSON
        };

        yield put(actions.setUserDetails(userAccountDetailsJSON));

        backToStartingUrl();
    } catch (error) {
        console.log(error); // Just log it for now
    }
}

export function* getMoreListMediaSaga(action) {
    const { listType, mediaType, userDetails, page } = action;
    // this is ridiculous, but it will have to do for now
    const list = listType === 'favourites' ? 'favorite' : 'watchlist';
    const media = mediaType === 'tvshows' ? 'tv' : mediaType;

    const credentials = {
        id: userDetails.id,
        sessionId: getSessionIdFromStorage()
    };

    try {
        const url = mediaListUrl(list, media, credentials, page);
        const newData = yield fetch(url);
        const newDataJSON = yield newData.json();

        const oldListTypeJSON = userDetails[listType];
        const oldMediaResults = oldListTypeJSON[mediaType].results;
        const updatedResults = [ ...oldMediaResults, ...newDataJSON.results ];

        const userDetailsUpdated = {
            ...userDetails,
            [listType]: {
                ...oldListTypeJSON,
                [mediaType]: {
                    ...newDataJSON,
                    results: updatedResults
                }
            }
        };

        yield put(actions.setUserDetails(userDetailsUpdated));
    } catch (error) {
        console.log(error);
    }
}
