import { put } from 'redux-saga/effects';

import config from '../../config/tmdb';
import actions from '../actions';

import { backToStartingUrl, mediaListUrl } from '../../utils/functions';

export function* getUserDetailsSaga(action) {
  try {
    const userAccountDetails = yield fetch(
      `${config.api_url_v3}/account?api_key=${config.rt}&session_id=${action.sessionId}`
    );
    const userAccountDetailsJSON = yield userAccountDetails.json();
    const { id } = userAccountDetailsJSON;

    if (!id) return; // maybe do something sensible, like message the user that something is wrong
    const credentials = {
      id: id,
      sessionId: action.sessionId
    };

    userAccountDetailsJSON.favorite = { movies: [], tv: [] };
    userAccountDetailsJSON.watchlist = { movies: [], tv: [] };

    // get the first favourites page; needed to determine how many pages of results there are; no other way to do it
    const movieFavouritesUrl = mediaListUrl('favorite', 'movies', credentials);
    const favouriteMovies = yield fetch(movieFavouritesUrl);
    const favouriteMoviesJSON = yield favouriteMovies.json();

    const tvFavouritesUrl = mediaListUrl('favorite', 'tv', credentials);
    const favouriteTVShows = yield fetch(tvFavouritesUrl);
    const favouriteTVShowsJSON = yield favouriteTVShows.json();

    const totalFavouriteMoviesPages = favouriteMoviesJSON.total_pages;
    const totalFavouriteTVShowsPages = favouriteTVShowsJSON.total_pages;

    // we must now get all favourites pages in order to properly display which item is favourite (specifically, in search results)
    userAccountDetailsJSON.favorite.movies = yield getAllItems(
      favouriteMoviesJSON.results,
      'favorite',
      'movies',
      credentials,
      totalFavouriteMoviesPages
    );
    userAccountDetailsJSON.favorite.tv = yield getAllItems(
      favouriteTVShowsJSON.results,
      'favorite',
      'tv',
      credentials,
      totalFavouriteTVShowsPages
    );

    // get the first watchlist page; needed to determine how many pages of results there are; no other way to do it
    const movieWatchListUrl = mediaListUrl('watchlist', 'movies', credentials);
    const watchlistMovies = yield fetch(movieWatchListUrl);
    const watchlistMoviesJSON = yield watchlistMovies.json();

    const tvWatchListUrl = mediaListUrl('watchlist', 'tv', credentials);
    const watchlistTVShows = yield fetch(tvWatchListUrl);
    const watchlistTVShowsJSON = yield watchlistTVShows.json();

    const totalWatchlistMoviesPages = watchlistMoviesJSON.total_pages;
    const totalWatchlistTVShowsPages = watchlistTVShowsJSON.total_pages;

    // we must get all watchlist pages in order to properly display which item is in watchlist (specifically, in search results)
    userAccountDetailsJSON.watchlist.movies = yield getAllItems(
      watchlistMoviesJSON.results,
      'watchlist',
      'movies',
      credentials,
      totalWatchlistMoviesPages
    );
    userAccountDetailsJSON.watchlist.tv = yield getAllItems(
      watchlistTVShowsJSON.results,
      'watchlist',
      'tv',
      credentials,
      totalWatchlistTVShowsPages
    );

    yield put(actions.setUserDetails(userAccountDetailsJSON));

    backToStartingUrl();
  } catch (error) {
    console.log(error); // Just log it for now
  }
}

function* getAllItems(initialItemsList, listType, mediaType, credentials, pages) {
  let newList = [...initialItemsList];

  for (let i = 2; i <= pages; i++) {
    const url = mediaListUrl(listType, mediaType, credentials, i);
    const response = yield fetch(url);
    const responseJSON = yield response.json();
    newList = [...newList, ...responseJSON.results];
  }

  return newList;
}
