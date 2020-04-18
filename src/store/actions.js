import actionTypes from './actionTypes';

export default {
  /**
   * @function resetState
   * @returns {object} - Action object with type `RESET_STATE`.
   */
  resetState: () => ({
    type: actionTypes.RESET_STATE
  }),

  /**
   * @function setTmdbConfiguration
   * @param {object} config - Configuration object received from TMDB.
   * @returns {object} - Action object with type `SET_TMDB_CONFIGURATION` and config property set to the received config object.
   */
  setTmdbConfiguration: (config) => ({
    type: actionTypes.SET_TMDB_CONFIGURATION,
    config
  }),

  /**
   * @function setQueryTerm
   * @param {string} term - Search term to use for search on TMDB.
   * @returns {object} - Action object with type `SET_QUERY_TERM` and the term property.
   */
  setQueryTerm: (term) => ({
    type: actionTypes.SET_QUERY_TERM,
    term
  }),

  /**
   * @function setSearchResults
   * @param {array} results - Search results array from TMDB.
   * @param {number} page - Search results page number on TMDB.
   * @returns {object} - Action object with type `SET_SEARCH_RESULTS` and the results array and page number properties.
   */
  setSearchResults: (results, page) => ({
    type: actionTypes.SET_SEARCH_RESULTS,
    results,
    page
  }),

  /**
   * @function setSearchHasResults
   * @param {boolean} hasResults - Does search has some results.
   * @returns {object} - Action object with type `SET_SEARCH_HAS_RESULTS` and the hasResults boolean property.
   */
  setSearchHasResults: (hasResults) => ({
    type: actionTypes.SET_SEARCH_HAS_RESULTS,
    hasResults
  }),

  /**
   * @function setInitModalClose
   * @param {boolean} initModalClose - Should the modal be closed.
   * @returns {object} - Action object with type `SET_INIT_MODAL_CLOSE` and the initModalClose boolean property.
   */
  setInitModalClose: (initModalClose) => ({
    type: actionTypes.SET_INIT_MODAL_CLOSE,
    initModalClose
  }),

  /**
   * @function setShowBackdrop
   * @param {boolean} show - Should the modal/image backdrop be shown.
   * @returns {object} - Action object with type `SET_SHOW_BACKDROP` and the show boolean property.
   */
  setShowBackdrop: (show) => ({
    type: actionTypes.SET_SHOW_BACKDROP,
    show
  }),

  /**
   * @function setShowLoginModal
   * @param {boolean} show - Should the login modal be shown.
   * @returns {object} - Action object with type `SET_SHOW_LOGIN_MODAL` and the show boolean property.
   */
  setShowLoginModal: (show) => ({
    type: actionTypes.SET_SHOW_LOGIN_MODAL,
    show
  }),

  /**
   * @function setShowImageModal
   * @param {boolean} show - Should the image modal be shown.
   * @returns {object} - Action object with type `SET_SHOW_IMAGE_MODAL` and the show boolean property.
   */
  setShowImageModal: (show) => ({
    type: actionTypes.SET_SHOW_IMAGE_MODAL,
    show
  }),

  /**
   * @function setLoggedIn
   * @param {boolean} loggedIn - Is the user logged in.
   * @returns {object} - Action object with type `SET_LOGGED_IN` and the loggedIn boolean property.
   */
  setLoggedIn: (loggedIn) => ({
    type: actionTypes.SET_LOGGED_IN,
    loggedIn
  }),

  /**
   * @function setUserDetails
   * @param {object} details - Object with user details.
   * @returns {object} - Action object with type `SET_USER_DETAILS` and the user details property.
   */
  setUserDetails: (details) => ({
    type: actionTypes.SET_USER_DETAILS,
    details
  }),

  /**
   * @function initiateSearch
   * @param {string} queryString - Search term to use for search on TMDB.
   * @param {number} page - Search results page number on TMDB.
   * @returns {object} - Action object with type `INITIATE_SEARCH` and the queryString and page properties.
   */
  initiateSearch: (queryString, page) => ({
    type: actionTypes.INITIATE_SEARCH,
    queryString,
    page
  }),

  /**
   * @function initiateGetUserDetails
   * @param {string} sessionId - User session id on TMDB.
   * @returns {object} - Action object with type `INITIATE_GET_USER_DETAILS` and the sessionId property.
   */
  initiateGetUserDetails: (sessionId) => ({
    type: actionTypes.INITIATE_GET_USER_DETAILS,
    sessionId
  }),

  /**
   * @function initiateGetTmdbConfig
   * @returns {object} - Action object with type `INITIATE_GET_TMDB_CONFIG`.
   */
  initiateGetTmdbConfig: () => ({
    type: actionTypes.INITIATE_GET_TMDB_CONFIG
  }),

  /**
   * @function initiateToggleItemInMediaList
   * @param {string} listType - Type of the list the media is on TMDB (favorites/watchlist).
   * @param {object} mediaItem - The media object from TMDB.
   * @param {number} userId - User id on TMDB.
   * @param {boolean} isInList - If this mediaItem is on the users listType media list.
   * @returns {object} - Action object with type `INITIATE_TOGGLE_ITEM_IN_MEDIA_LIST` and the listType, mediaItem, userId and isInList properties.
   */
  initiateToggleItemInMediaList: (listType, mediaItem, userId, isInList) => ({
    type: actionTypes.INITIATE_TOGGLE_ITEM_IN_MEDIA_LIST,
    listType,
    mediaItem,
    userId,
    isInList
  }),

  /**
   * @function updateUserMediaList
   * @param {string} listType - Type of the list the media is on TMDB (favorites/watchlist).
   * @param {object} mediaItem - The media object from TMDB.
   * @param {boolean} isInList - If this mediaItem is on the users listType media list.
   * @returns {object} - Action object with type `UPDATE_USER_MEDIA_LIST` and the listType, mediaItem and isInList properties.
   */
  updateUserMediaList: (listType, mediaItem, isInList) => ({
    type: actionTypes.UPDATE_USER_MEDIA_LIST,
    listType,
    mediaItem,
    isInList
  })
};
