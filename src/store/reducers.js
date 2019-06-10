import actionTypes from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_TMDB_CONFIGURATION) {
        return {
            ...state,
            tmdbConfiguration: {...action.config}
        }
    }

    if (action.type === actionTypes.SET_QUERY_TERM) { // Might not ne needed
        return {
            ...state,
            queryTerm: action.term
        }
    }

    if (action.type === actionTypes.SET_SEARCH_RESULTS) {
        return {
            ...state,
            searchResults: action.results
        }
    }

    return state;
};

export default reducer;
