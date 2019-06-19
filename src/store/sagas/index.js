import { takeEvery } from 'redux-saga/effects';

import actionTypes from '../actionTypes';
import { searchSaga } from './search';
import { getUserDetailsSaga, getMoreListMediaSaga } from './getUserDetails';
import { getTmdbConfigSaga } from './getTmdbConfig';

export function* watch() {
    yield takeEvery(actionTypes.INITIATE_SEARCH, searchSaga);
    yield takeEvery(actionTypes.INITIATE_GET_USER_DETAILS, getUserDetailsSaga);
    yield takeEvery(actionTypes.INITIATE_GET_MORE_LIST_MEDIA, getMoreListMediaSaga);
    yield takeEvery(actionTypes.INITIATE_GET_TMDB_CONFIG, getTmdbConfigSaga);
}
