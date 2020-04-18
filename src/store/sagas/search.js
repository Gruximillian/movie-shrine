import { put } from 'redux-saga/effects';

import config from '../../config/tmdb';
import actions from '../actions';

export function* searchSaga(action) {
  try {
    const response = yield fetch(
      `${config.api_url_v3}/search/multi?api_key=${config.api_key}&query=${action.queryString}&page=${action.page}`
    );
    const responseJson = yield response.json();
    yield put(actions.setSearchHasResults(responseJson.total_results > 0));
    yield put(actions.setSearchResults(responseJson, action.page));
  } catch (error) {
    console.log(error); // Just log it for now
  }
}
