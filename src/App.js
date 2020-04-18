import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginModal from './components/LoginModal';
import MediaDetails from './components/MediaDetails';
import UserBar from './components/UserBar';
import ShowUserListMedia from './components/ShowUserListMedia';

import classes from './App.module.css';

import actions from './store/actions';
import icons from './assets/icons';

import { requestSessionId } from './utils/fetch';

import {
  toggleBodyScroll,
  backToStartingUrl,
  getSearchObjectFromLocation,
  getSessionIdFromStorage
} from './utils/functions';

const App = (props) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const {
    tmdbConfiguration,
    showBackdrop,
    showLoginModal,
    loggedIn,
    setInitModalClose,
    setLoggedIn,
    initiateGetTmdbConfig,
    initiateGetUserDetails
  } = props;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key !== 'Escape') return;
      setInitModalClose(true);
    },
    [setInitModalClose]
  );

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const searchObject = getSearchObjectFromLocation();
    if (!searchObject) return;

    if (searchObject.request_token && searchObject.approved === 'true') {
      // if this was a redirect and the token is authorized, then get session_id
      requestSessionId(searchObject.request_token, setLoggedIn);
    } else if (searchObject.denied === 'true') {
      // if token is not authorized, clear the location bar query parameters
      backToStartingUrl();
    }
  }, [setLoggedIn]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!loggedIn) return;
    const sessionId = getSessionIdFromStorage();
    initiateGetUserDetails(sessionId);
  }, [loggedIn, initiateGetUserDetails]);

  useEffect(() => {
    const sessionId = getSessionIdFromStorage();
    if (sessionId) setLoggedIn(true);
  }, [setLoggedIn]);

  useEffect(() => {
    initiateGetTmdbConfig();
  }, [initiateGetTmdbConfig]);

  useEffect(() => {
    localStorage.setItem('movieShrineTmdbConfig', JSON.stringify(tmdbConfiguration));
  }, [tmdbConfiguration]);

  useEffect(() => {
    toggleBodyScroll(showBackdrop);
  }, [showBackdrop]);

  const appClass = showBackdrop ? `${classes.Backdrop} ${classes.MovieShrineApp}` : classes.MovieShrineApp;

  const checkScrollPosition = useCallback(() => {
    const viewportHeight = window.innerHeight;
    if (!showBackToTop && document.documentElement.scrollTop > viewportHeight * 2) {
      setShowBackToTop(true);
    }
    if (showBackToTop && document.documentElement.scrollTop <= viewportHeight * 2) {
      setShowBackToTop(false);
    }
  }, [showBackToTop]);

  useEffect(() => {
    document.addEventListener('scroll', checkScrollPosition);

    return () => {
      document.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return (
    <BrowserRouter>
      <div className={appClass}>
        {showLoginModal && !loggedIn && <LoginModal />}

        <Header />

        {loggedIn && <UserBar />}

        <div
          onClick={goToTop}
          className={`${classes.ScrollToTopButton} ${showBackToTop && classes.Visible} btn-floating`}
        >
          {icons.arrowUp}
        </div>

        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" render={(props) => <MediaDetails {...props} mediaType="movie" />} />
        <Route path="/tv/:id" render={(props) => <MediaDetails {...props} mediaType="tv" />} />
        <Route path="/movies/:listType" render={(props) => <ShowUserListMedia {...props} mediaType="movies" />} />
        <Route path="/tvshows/:listType" render={(props) => <ShowUserListMedia {...props} mediaType="tv" />} />

        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    tmdbConfiguration: state.tmdbConfiguration,
    showBackdrop: state.showBackdrop,
    showLoginModal: state.showLoginModal,
    loggedIn: state.loggedIn,
    userDetails: state.userDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInitModalClose: (initModalClose) => dispatch(actions.setInitModalClose(initModalClose)),
    setLoggedIn: (loggedIn) => dispatch(actions.setLoggedIn(loggedIn)),
    initiateGetUserDetails: (sessionId) => dispatch(actions.initiateGetUserDetails(sessionId)),
    initiateGetTmdbConfig: () => dispatch(actions.initiateGetTmdbConfig())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
