import actionTypes from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.RESET_STATE) {
        return {
            ...state,
            queryTerm: '',
            searchResults: initialState.searchResults,
            searchHasResults: true
        };
    }

    if (action.type === actionTypes.SET_TMDB_CONFIGURATION) {
        return {
            ...state,
            tmdbConfiguration: {...action.config}
        }
    }

    if (action.type === actionTypes.SET_QUERY_TERM) {
        return {
            ...state,
            queryTerm: action.term
        }
    }

    if (action.type === actionTypes.SET_SEARCH_RESULTS) {
        const currentResults = (action.page === 1) ? initialState.searchResults : {...state.searchResults};
        const allResults = [...currentResults.results, ...action.results.results];
        // there are duplicate ids in TMDB, so we need to filter the results of duplicates
        const uniqueIds = allResults.map(result => result.id).filter((ID, idx, array) => {
            return array.indexOf(ID) === array.lastIndexOf(ID);
        });
        const updatedResults = allResults.filter(result => uniqueIds.indexOf(result.id) !== -1);

        return {
            ...state,
            searchResults: {
                ...currentResults,
                ...action.results,
                results: updatedResults
            }
        }
    }

    if (action.type === actionTypes.SET_SEARCH_HAS_RESULTS) {
        return {
            ...state,
            searchHasResults: action.hasResults
        }
    }

    if (action.type === actionTypes.SET_INIT_MODAL_CLOSE) {
        return {
            ...state,
            initModalClose: action.initModalClose
        }
    }

    if (action.type === actionTypes.SET_SHOW_BACKDROP) {
        return {
            ...state,
            showBackdrop: action.show
        }
    }

    if (action.type === actionTypes.SET_SHOW_LOGIN_MODAL) {
        return {
            ...state,
            showLoginModal: action.show
        }
    }

    if (action.type === actionTypes.SET_SHOW_IMAGE_MODAL) {
        return {
            ...state,
            showImageModal: action.show
        }
    }

    if (action.type === actionTypes.SET_LOGGED_IN) {
        return {
            ...state,
            loggedIn: action.loggedIn
        }
    }

    if (action.type === actionTypes.SET_USER_DETAILS) {
        return {
            ...state,
            userDetails: action.details
        }
    }

    if (action.type === actionTypes.UPDATE_USER_MEDIA_LIST) {
        const { listType, mediaItem, isInList } = action;
        const { media_type, id } = mediaItem;
        const userDetails = state.userDetails;
        // media_type on the item is singular, but on the userDetails is plural
        const mediaType = media_type === 'movie' ? 'movies' : 'tv';

        const oldMediaList = userDetails[listType][mediaType];
        let newMediaList = [];

        if (isInList) {
            // this means that the item is on the list in TMDB
            newMediaList = [...oldMediaList, mediaItem];
        } else {
            // this means that the item is NOT on the list in TMDB
            oldMediaList.forEach(item => {
                if (item.id !== id) {
                    newMediaList.push(item);
                }
            });
        }

        const newUserDetails = {
            ...userDetails,
            [listType]: {
                ...userDetails[listType],
                [mediaType]: newMediaList
            }
        };

        return {
            ...state,
            userDetails: newUserDetails
        }
    }

    return state;
};

export default reducer;
