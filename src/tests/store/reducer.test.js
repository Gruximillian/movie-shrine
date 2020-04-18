import initialState from '../../store/initialState';
import actionTypes from '../../store/actionTypes';
import actions from '../../store/actions';
import reducer from '../../store/reducer';

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
  updateUserMediaList
} = actions;

describe('if no action and no state are passed', () => {
  test('sets the state to the initialState', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });
});

describe(`if ${actionTypes.RESET_STATE} action is passed`, () => {
  test('reset the queryTerm, searchResults and hasSearchResults state properties', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      tmdbConfiguration: {
        someConfig: 'afsgascv'
      },
      searchResults: {
        results: [
          { id: 45684, name: 'result 1' },
          { id: 89466, name: 'result 2' }
        ]
      },
      searchHasResults: true,
      loggedIn: true,
      userDetails: {
        name: 'Mr. User'
      }
    };
    const updatedState = {
      queryTerm: '',
      tmdbConfiguration: {
        someConfig: 'afsgascv'
      },
      searchResults: initialState.searchResults,
      searchHasResults: true,
      loggedIn: true,
      userDetails: {
        name: 'Mr. User'
      }
    };

    const state = reducer(currentState, resetState());
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_TMDB_CONFIGURATION} action is passed`, () => {
  test('updates the tmdbConfiguration state property', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      tmdbConfiguration: {
        someConfig: 'Old config value'
      }
    };
    const newConfig = {
      someConfig: 'New config value',
      someMoreConfig: 'Anothe new config value'
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      tmdbConfiguration: { ...newConfig }
    };

    const state = reducer(currentState, setTmdbConfiguration(newConfig));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_QUERY_TERM} action is passed`, () => {
  test('updates the queryTerm state property', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      tmdbConfiguration: {
        someConfig: 'Old config value'
      },
      anotherProperty: 'Blah blah'
    };
    const queryTerm = 'Now search for TV shows!';
    const updatedState = {
      queryTerm: queryTerm,
      tmdbConfiguration: {
        someConfig: 'Old config value'
      },
      anotherProperty: 'Blah blah'
    };

    const state = reducer(currentState, setQueryTerm(queryTerm));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_SEARCH_RESULTS} action is passed`, () => {
  describe('when the new search is started', () => {
    test('replace searchResults state property with new values', () => {
      // this case applies also when there are no present results in the state
      const currentState = {
        queryTerm: 'The search for a movie',
        searchResults: {
          page: 3,
          results: [
            { id: 1, name: 'result 1' },
            { id: 2, name: 'result 2' },
            { id: 3, name: 'result 3' },
            { id: 4, name: 'result 4' },
            { id: 5, name: 'result 5' }
          ]
        }
      };
      const page = 1;
      const newResults = {
        page: page,
        results: [
          { id: 1, name: 'result 1' },
          { id: 2, name: 'result 2' }
        ]
      };
      const updatedState = {
        queryTerm: 'The search for a movie',
        searchResults: {
          page: page,
          results: [...newResults.results]
        }
      };

      const state = reducer(currentState, setSearchResults(newResults, page));
      expect(state).toEqual(updatedState);
    });
  });

  describe('when more results are loaded', () => {
    test('append new results to the searchResults.results state property', () => {
      const currentState = {
        queryTerm: 'The search for a movie',
        searchResults: {
          page: 1,
          results: [
            { id: 1, name: 'result 1' },
            { id: 2, name: 'result 2' }
          ]
        }
      };
      const page = 2;
      const newResults = {
        page: page,
        results: [
          { id: 3, name: 'result 3' },
          { id: 4, name: 'result 4' }
        ]
      };
      const updatedState = {
        queryTerm: 'The search for a movie',
        searchResults: {
          page: page,
          results: [{ id: 1, name: 'result 1' }, { id: 2, name: 'result 2' }, ...newResults.results]
        }
      };

      const state = reducer(currentState, setSearchResults(newResults, page));
      expect(state).toEqual(updatedState);
    });
  });

  describe('when response has duplicate results', () => {
    test('add results to the searchResults.results state property without adding duplicates', () => {
      const currentState = {
        queryTerm: 'The search for a movie',
        searchResults: {
          page: 1,
          results: [
            { id: 1, name: 'result 1' },
            { id: 2, name: 'result 2' }
          ]
        }
      };
      const page = 2;
      const newResults = {
        page: page,
        results: [
          { id: 3, name: 'result 3' },
          { id: 4, name: 'result 4' },
          { id: 3, name: 'result 3' }
        ]
      };
      const updatedState = {
        queryTerm: 'The search for a movie',
        searchResults: {
          page: page,
          results: [
            { id: 1, name: 'result 1' },
            { id: 2, name: 'result 2' },
            { id: 3, name: 'result 3' },
            { id: 4, name: 'result 4' }
          ]
        }
      };

      const state = reducer(currentState, setSearchResults(newResults, page));
      expect(state).toEqual(updatedState);
    });
  });
});

describe(`if ${actionTypes.SET_SEARCH_HAS_RESULTS} action is passed`, () => {
  test('set the searchHasResults state property to true', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      searchHasResults: false
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      searchHasResults: true
    };

    const state = reducer(currentState, setSearchHasResults(true));
    expect(state).toEqual(updatedState);
  });

  test('set the searchHasResults state property to false', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      searchHasResults: true
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      searchHasResults: false
    };

    const state = reducer(currentState, setSearchHasResults(false));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_INIT_MODAL_CLOSE} action is passed`, () => {
  test('set the initModalClose state property to true', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      initModalClose: false
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      initModalClose: true
    };

    const state = reducer(currentState, setInitModalClose(true));
    expect(state).toEqual(updatedState);
  });

  test('set the initModalClose state property to false', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      initModalClose: true
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      initModalClose: false
    };

    const state = reducer(currentState, setInitModalClose(false));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_SHOW_BACKDROP} action is passed`, () => {
  test('set the showBackdrop state property to true', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      showBackdrop: false
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      showBackdrop: true
    };

    const state = reducer(currentState, setShowBackdrop(true));
    expect(state).toEqual(updatedState);
  });

  test('set the showBackdrop state property to false', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      showBackdrop: true
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      showBackdrop: false
    };

    const state = reducer(currentState, setShowBackdrop(false));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_SHOW_LOGIN_MODAL} action is passed`, () => {
  test('set the showLoginModal state property to true', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      showLoginModal: false
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      showLoginModal: true
    };

    const state = reducer(currentState, setShowLoginModal(true));
    expect(state).toEqual(updatedState);
  });

  test('set the showLoginModal state property to false', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      showLoginModal: true
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      showLoginModal: false
    };

    const state = reducer(currentState, setShowLoginModal(false));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_SHOW_IMAGE_MODAL} action is passed`, () => {
  test('set the showImageModal state property to true', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      showImageModal: false
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      showImageModal: true
    };

    const state = reducer(currentState, setShowImageModal(true));
    expect(state).toEqual(updatedState);
  });

  test('set the showImageModal state property to false', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      showImageModal: true
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      showImageModal: false
    };

    const state = reducer(currentState, setShowImageModal(false));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_LOGGED_IN} action is passed`, () => {
  test('set the loggedIn state property to true', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      loggedIn: false
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      loggedIn: true
    };

    const state = reducer(currentState, setLoggedIn(true));
    expect(state).toEqual(updatedState);
  });

  test('set the loggedIn state property to false', () => {
    const currentState = {
      queryTerm: 'The search for a movie',
      loggedIn: true
    };
    const updatedState = {
      queryTerm: 'The search for a movie',
      loggedIn: false
    };

    const state = reducer(currentState, setLoggedIn(false));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.SET_USER_DETAILS} action is passed`, () => {
  test('set the userDetails state property', () => {
    const currentState = {
      userDetails: {}
    };
    const details = {
      name: 'Mr. User',
      id: '007'
    };
    const updatedState = {
      userDetails: details
    };

    const state = reducer(currentState, setUserDetails(details));
    expect(state).toEqual(updatedState);
  });
});

describe(`if ${actionTypes.UPDATE_USER_MEDIA_LIST} action is passed`, () => {
  describe('when the item is added to the user media list', () => {
    test('add the item to the correct state property', () => {
      const listType = 'mediaListType';
      const mediaType = 'movie'; // has to be 'movie' or 'tv'
      const inList = true; // meaning the item should be added to the list

      // movies and tv props under [listType] already exist since they are created by the redux saga
      // this reducer only updates these lists
      const currentState = {
        userDetails: {
          name: 'Mr. User',
          id: '007',
          [listType]: {
            movies: [], // 'movies' prop name is the mediaType, has to be plural
            tv: []
          }
        }
      };

      const mediaItem = {
        media_type: mediaType,
        id: 456751
      };

      const updatedState = {
        userDetails: {
          name: 'Mr. User',
          id: '007',
          [listType]: {
            movies: [mediaItem],
            tv: []
          }
        }
      };

      const state = reducer(currentState, updateUserMediaList(listType, mediaItem, inList));
      expect(state).toEqual(updatedState);
    });
  });

  describe('when the item is removed from the user media list', () => {
    test('remove the item form the correct state property', () => {
      const listType = 'mediaListType';
      const mediaType = 'tv'; // has to be 'movie' or 'tv'
      const inList = false; // meaning the item should be removed from the list

      const mediaItem = {
        media_type: mediaType,
        id: 456751
      };

      const mediaItem2 = {
        media_type: mediaType,
        id: 789654
      };

      // movies and tv props under [listType] already exist since they are created by the redux saga
      // this reducer only updates these lists
      const currentState = {
        userDetails: {
          name: 'Mr. User',
          id: '007',
          [listType]: {
            movies: [], // 'movies' prop name is the mediaType, has to be plural
            tv: [mediaItem, mediaItem2]
          }
        }
      };

      const updatedState = {
        userDetails: {
          name: 'Mr. User',
          id: '007',
          [listType]: {
            movies: [],
            tv: [mediaItem2]
          }
        }
      };

      const state = reducer(currentState, updateUserMediaList(listType, mediaItem, inList));
      expect(state).toEqual(updatedState);
    });
  });
});
