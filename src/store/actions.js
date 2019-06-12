import actionTypes from './actionTypes';

export default {
    resetState: () => ({
        type: actionTypes.RESET_STATE
    }),
    setTmdbConfiguration: config => ({
        type: actionTypes.SET_TMDB_CONFIGURATION,
        config
    }),
    setQueryTerm: term => ({
        type: actionTypes.SET_QUERY_TERM,
        term
    }),
    initiateSearch: (queryString, page) => ({
        type: actionTypes.INITIATE_SEARCH,
        queryString,
        page
    }),
    setSearchResults: (results, page) => ({
        type: actionTypes.SET_SEARCH_RESULTS,
        results,
        page
    }),
    setSearchHasResults: hasResults => ({
        type: actionTypes.SET_SEARCH_HAS_RESULTS,
        hasResults
    })
};
