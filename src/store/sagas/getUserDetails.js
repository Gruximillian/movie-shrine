import { put } from 'redux-saga/effects';

import config from '../../config/tmdb';
import actions from '../actions';

import { backToStartingUrl, mediaListUrl } from '../../utils/functions';

export function* getUserDetailsSaga(action) {
    try {
        const userAccountDetails = yield fetch(`${config.api_url_v3}/account?api_key=${config.api_key}&session_id=${action.sessionId}`);
        const userAccountDetailsJSON = yield userAccountDetails.json();
        const { id } = userAccountDetailsJSON;

        if (!id) return; // maybe do something sensible, like message the user that something is wrong

        const movieFavouritesUrl = mediaListUrl('favorite', 'movies', id, action.sessionId);
        const favouriteMovies = yield fetch(movieFavouritesUrl);
        const favouriteMoviesJSON = yield favouriteMovies.json();

        const tvFavouritesUrl = mediaListUrl('favorite', 'tv', id, action.sessionId);
        const favouriteTVShows = yield fetch(tvFavouritesUrl);
        const favouriteTVShowsJSON = yield favouriteTVShows.json();

        userAccountDetailsJSON.favourites = {
            movies: favouriteMoviesJSON,
            tvshows: favouriteTVShowsJSON
        };

        const movieWatchListUrl = mediaListUrl('watchlist', 'movies', id, action.sessionId);
        const watchlistMovies = yield fetch(movieWatchListUrl);
        const watchlistMoviesJSON = yield watchlistMovies.json();

        const tvWatchListUrl = mediaListUrl('watchlist', 'tv', id, action.sessionId);
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
