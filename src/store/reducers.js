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

    if (action.type === actionTypes.SET_SHOW_BACKDROP) {
        return {
            ...state,
            showBackdrop: action.show
        }
    }

    return state;
};

export default reducer;
