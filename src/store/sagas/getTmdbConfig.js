import { put } from 'redux-saga/effects';

import config from '../../config/tmdb';
import actions from '../actions';

export function* getTmdbConfigSaga(action) {
    try {
        const response = yield fetch(`${config.api_url_v3}/configuration?api_key=${config.api_key}&append_to_response=languages`);
        const responseJson = yield response.json();
        yield put(actions.setTmdbConfiguration(responseJson));
    } catch (error) {
        console.log(error); // Just log it for now
    }
}
