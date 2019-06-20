import { put } from 'redux-saga/effects';

import actions from '../actions';

import { toggleInMediaListUrl, getSessionIdFromStorage } from '../../utils/functions';

export function* toggleItemInMediaListSaga(action) {
    try {
        const { listType, mediaItem, userId, isInList } = action;
        const credentials = { id: userId, sessionId: getSessionIdFromStorage() };
        const url = toggleInMediaListUrl(listType, credentials);

        const body = JSON.stringify({
            'media_type': mediaItem.media_type,
            'media_id': mediaItem.id,
            [listType]: isInList
        });

        const response = yield fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        const responseJSON = yield response.json();

        const { status_code, status_message } = responseJSON;

        // status_code === 1  => item added to the list
        // status_code === 12 => item is updated successfully (happens if we send the same value, that is, if the isInList is not changed to false)
        // status_code === 13 => item removed from the list
        if (status_code === 1 || status_code === 13) {
            yield put(actions.updateUserMediaList(listType, mediaItem, isInList));
        } else {
            // good to add messages for the user why it failed; according to the status_code that is returned
            console.log('Action failed');
            console.log(status_message);
        }

    } catch (error) {
        console.log(error);
    }
}
