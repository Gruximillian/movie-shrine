import { takeEvery } from 'redux-saga/effects';

import actionTypes from '../actionTypes';
import { searchSaga } from './search';
import { getUserDetailsSaga } from './getUserDetails';

export function* watch() {
    yield takeEvery(actionTypes.INITIATE_SEARCH, searchSaga);
    yield takeEvery(actionTypes.INITIATE_GET_USER_DETAILS, getUserDetailsSaga);
}
