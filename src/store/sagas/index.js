import { takeEvery } from 'redux-saga/effects';

import actionTypes from '../actionTypes';
import { searchSaga } from './search';
import { getUserDetailsSaga } from './getUserDetails';
import { getTmdbConfigSaga } from './getTmdbConfig';
import { toggleItemInMediaListSaga } from './toggleItemInMediaList';

export function* watch() {
    yield takeEvery(actionTypes.INITIATE_SEARCH, searchSaga);
    yield takeEvery(actionTypes.INITIATE_GET_USER_DETAILS, getUserDetailsSaga);
    yield takeEvery(actionTypes.INITIATE_GET_TMDB_CONFIG, getTmdbConfigSaga);
    yield takeEvery(actionTypes.INITIATE_TOGGLE_ITEM_IN_MEDIA_LIST, toggleItemInMediaListSaga);
}
