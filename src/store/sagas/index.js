import { takeEvery } from 'redux-saga/effects';

import actionTypes from '../actionTypes';
import { searchSaga } from './search';

export function* watch() {
  yield takeEvery(actionTypes.INITIATE_SEARCH, searchSaga);
}
