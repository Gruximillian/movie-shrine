import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './UserSection.module.css';
import icons from '../assets/icons';
import actions from '../store/actions';
import movieShrineConfig from '../config/movieShrine';

const UserSection = (props) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { loggedIn, userDetails, setShowBackdrop, setShowLoginModal, setUserDetails, setLoggedIn } = props;

  const avatar = userDetails && userDetails.avatar;
  const gravatarHash = avatar && avatar.gravatar.hash;

  const initiateLogin = () => {
    setShowBackdrop(true);
    setShowLoginModal(true);
  };

  const logout = () => {
    setUserDetails({});
    localStorage.removeItem('movieShrineSession');
    setLoggedIn(false);
  };

  const logoutPoputClass = `${classes.LogoutPopup} scale-transition scale-out ${showLogoutPopup ? 'scale-in' : ''}`;

  return (
    <div data-test="component-user-section" className={classes.UserSection}>
      {loggedIn ? (
        <div data-test="user-avatar-container" className={classes.UserAvatarContainer}>
          <img
            data-test="user-gravatar"
            onClick={() => setShowLogoutPopup(!showLogoutPopup)}
            className={classes.UserAvatar}
            src={`${movieShrineConfig.gravatarBaseUrl}${gravatarHash}`}
            alt="User gravatar"
          />

          <div data-test="logout-popup" className={logoutPoputClass}>
            <div
              data-test="close-icon-container"
              className={classes.CloseButton}
              onClick={() => setShowLogoutPopup(false)}
            >
              {icons.close}
            </div>
            <p data-test="logout-message">{movieShrineConfig.logoutMessage}</p>
            <div data-test="logout-button" onClick={logout} className={`${classes.LogoutButton} btn btn-small`}>
              {movieShrineConfig.logoutButtonText}
            </div>
          </div>
        </div>
      ) : (
        <div data-test="login-icon-container" onClick={initiateLogin} className={classes.LoginIcon}>
          {icons.key}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowBackdrop: (show) => dispatch(actions.setShowBackdrop(show)),
    setShowLoginModal: (show) => dispatch(actions.setShowLoginModal(show)),
    setUserDetails: (details) => dispatch(actions.setUserDetails(details)),
    setLoggedIn: (loggedIn) => dispatch(actions.setLoggedIn(loggedIn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);
