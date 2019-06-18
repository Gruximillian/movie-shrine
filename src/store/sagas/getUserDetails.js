import { put } from 'redux-saga/effects';

import config from '../../config/tmdb';
import actions from '../actions';

import { backToStartingUrl } from '../../utils/functions';

export function* getUserDetailsSaga(action) {
    try {
        const response = yield fetch(`${config.api_url_v3}/account?api_key=${config.api_key}&session_id=${action.sessionId}`);
        const responseJson = yield response.json();
        if (responseJson.username) yield put(actions.setUserDetails(responseJson));
        backToStartingUrl();
    } catch (error) {
        console.log(error); // Just log it for now
    }
}
