import actionTypes from './actionTypes';

export default {
    setTmdbConfiguration: config => ({
        type: actionTypes.SET_TMDB_CONFIGURATION,
        config
    }),
    setQueryTerm: term => ({ // Might not ne needed
        type: actionTypes.SET_QUERY_TERM,
        term
    }),
    initiateSearch: queryString => ({
        type: actionTypes.INITIATE_SEARCH,
        queryString
    }),
    setSearchResults: results => ({
        type: actionTypes.SET_SEARCH_RESULTS,
        results
    })
};
