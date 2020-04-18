import actionTypes from '../../store/actionTypes';
import actions from '../../store/actions';

const {
  resetState,
  setTmdbConfiguration,
  setQueryTerm,
  setSearchResults,
  setSearchHasResults,
  setInitModalClose,
  setShowBackdrop,
  setShowLoginModal,
  setShowImageModal,
  setLoggedIn,
  setUserDetails,
  initiateSearch,
  initiateGetUserDetails,
  initiateGetTmdbConfig,
  initiateToggleItemInMediaList,
  updateUserMediaList
} = actions;

describe('resetState function', () => {
  test(`returns an action with type ${actionTypes.RESET_STATE}`, () => {
    const action = resetState();
    expect(action).toEqual({ type: actionTypes.RESET_STATE });
  });
});

describe('setTmdbConfiguration function', () => {
  test(`returns an action with type ${actionTypes.SET_TMDB_CONFIGURATION} and the config property passed to it`, () => {
    const configObject = {
      configProp1: 'Config property 1',
      configProp2: 'Config property 2',
      configArray: ['some array stuff', 'more array stuff'],
      configObject: { prop1: 'property 1', prop2: 'property 2' }
    };
    const action = setTmdbConfiguration(configObject);

    expect(action).toEqual({
      type: actionTypes.SET_TMDB_CONFIGURATION,
      config: { ...configObject }
    });
  });
});

describe('setQueryTerm function', () => {
  test(`returns an action with type ${actionTypes.SET_QUERY_TERM} and the term property passed to it`, () => {
    const queryTerm = 'Some awesome movie';
    const action = setQueryTerm(queryTerm);

    expect(action).toEqual({
      type: actionTypes.SET_QUERY_TERM,
      term: queryTerm
    });
  });
});

describe('setSearchResults function', () => {
  test(`returns an action with type ${actionTypes.SET_SEARCH_RESULTS} and the results array and page number properties`, () => {
    const searchResultsArray = [
      { id: 1, name: 'result 1' },
      { id: 2, name: 'result 2' }
    ];
    const page = 2;
    const action = setSearchResults(searchResultsArray, page);

    expect(action).toEqual({
      type: actionTypes.SET_SEARCH_RESULTS,
      results: [...searchResultsArray],
      page: page
    });
  });
});

describe('setSearchHasResults function', () => {
  test(`returns an action with type ${actionTypes.SET_SEARCH_HAS_RESULTS} and the hasResults boolean property`, () => {
    const hasResults = true;
    const action = setSearchHasResults(hasResults);

    expect(action).toEqual({
      type: actionTypes.SET_SEARCH_HAS_RESULTS,
      hasResults: hasResults
    });
  });
});

describe('setSearchHasResults function', () => {
  test(`returns an action with type ${actionTypes.SET_INIT_MODAL_CLOSE} and the initModalClose boolean property`, () => {
    const initClose = true;
    const action = setInitModalClose(initClose);

    expect(action).toEqual({
      type: actionTypes.SET_INIT_MODAL_CLOSE,
      initModalClose: initClose
    });
  });
});

describe('setShowBackdrop function', () => {
  test(`returns an action with type ${actionTypes.SET_SHOW_BACKDROP} and the show boolean property`, () => {
    const show = true;
    const action = setShowBackdrop(show);

    expect(action).toEqual({
      type: actionTypes.SET_SHOW_BACKDROP,
      show: show
    });
  });
});

describe('setShowLoginModal function', () => {
  test(`returns an action with type ${actionTypes.SET_SHOW_LOGIN_MODAL} and the show boolean property`, () => {
    const show = true;
    const action = setShowLoginModal(show);

    expect(action).toEqual({
      type: actionTypes.SET_SHOW_LOGIN_MODAL,
      show: show
    });
  });
});

describe('setShowImageModal function', () => {
  test(`returns an action with type ${actionTypes.SET_SHOW_IMAGE_MODAL} and the show boolean property`, () => {
    const show = true;
    const action = setShowImageModal(show);

    expect(action).toEqual({
      type: actionTypes.SET_SHOW_IMAGE_MODAL,
      show: show
    });
  });
});

describe('setLoggedIn function', () => {
  test(`returns an action with type ${actionTypes.SET_LOGGED_IN} and the loggedIn boolean property`, () => {
    const loggedIn = true;
    const action = setLoggedIn(loggedIn);

    expect(action).toEqual({
      type: actionTypes.SET_LOGGED_IN,
      loggedIn: loggedIn
    });
  });
});

describe('setUserDetails function', () => {
  test(`returns an action with type ${actionTypes.SET_USER_DETAILS} and the details property with user details object`, () => {
    const userDetailsObject = {
      username: 'Some user',
      id: 123456,
      someDetails: 'Some user details'
    };
    const action = setUserDetails(userDetailsObject);

    expect(action).toEqual({
      type: actionTypes.SET_USER_DETAILS,
      details: { ...userDetailsObject }
    });
  });
});

describe('initiateSearch function', () => {
  test(`returns an action with type ${actionTypes.INITIATE_SEARCH} and the sessionId property`, () => {
    const query = 'TV show of the century';
    const page = 1;
    const action = initiateSearch(query, page);

    expect(action).toEqual({
      type: actionTypes.INITIATE_SEARCH,
      queryString: query,
      page: page
    });
  });
});

describe('initiateGetUserDetails function', () => {
  test(`returns an action with type ${actionTypes.INITIATE_GET_USER_DETAILS} and the sessionId property`, () => {
    const sessionId = 'ksd84ntg9in3fo8jwegnwgf09fef';
    const action = initiateGetUserDetails(sessionId);

    expect(action).toEqual({
      type: actionTypes.INITIATE_GET_USER_DETAILS,
      sessionId: sessionId
    });
  });
});

describe('initiateGetTmdbConfig function', () => {
  test(`returns an action with type ${actionTypes.INITIATE_GET_TMDB_CONFIG}`, () => {
    const action = initiateGetTmdbConfig();

    expect(action).toEqual({ type: actionTypes.INITIATE_GET_TMDB_CONFIG });
  });
});

describe('initiateToggleItemInMediaList function', () => {
  test(`returns an action with type ${actionTypes.INITIATE_TOGGLE_ITEM_IN_MEDIA_LIST} and the listType, mediaItem, userId and isInList properties`, () => {
    const list = 'favorite';
    const item = {
      name: 'The mooviee',
      id: 987654
    };
    const userId = 151342;
    const inList = true;

    const action = initiateToggleItemInMediaList(list, item, userId, inList);

    expect(action).toEqual({
      type: actionTypes.INITIATE_TOGGLE_ITEM_IN_MEDIA_LIST,
      listType: list,
      mediaItem: item,
      userId: userId,
      isInList: inList
    });
  });
});

describe('updateUserMediaList function', () => {
  test(`returns an action with type ${actionTypes.UPDATE_USER_MEDIA_LIST} and the listType, mediaItem and isInList properties`, () => {
    const list = 'watchlist';
    const item = {
      name: 'The mooviee',
      id: 987654
    };
    const inList = false;

    const action = updateUserMediaList(list, item, inList);

    expect(action).toEqual({
      type: actionTypes.UPDATE_USER_MEDIA_LIST,
      listType: list,
      mediaItem: item,
      isInList: inList
    });
  });
});
