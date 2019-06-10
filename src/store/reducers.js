import actionTypes from './actionTypes';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
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
        // there are duplicate ids in the TMDB, so we need to filter the results of duplicates
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

    return state;
};

export default reducer;
