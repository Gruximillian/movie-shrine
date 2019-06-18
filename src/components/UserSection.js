import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './UserSection.module.css';
import icons from '../assets/icons';
import actions from '../store/actions';

const UserSection = props => {
    const [ showLogoutPopup, setShowLogoutPopup ] = useState(false);
    const {
        userDetails: {
            username,
            avatar
        },
        setShowBackdrop,
        setShowLoginModal,
        setUserDetails,
        setLoggedIn
    } = props;

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

    return (
        <div className={classes.UserSection}>
            {
                username ?
                    <div className={classes.UserAvatarContainer}>
                        <img
                            onClick={() => setShowLogoutPopup(!showLogoutPopup)}
                            className={classes.UserAvatar}
                            src={`https://www.gravatar.com/avatar/${gravatarHash}`}
                            alt="User gravatar" />

                        <div className={`${classes.LogoutPopup} scale-transition scale-out ${showLogoutPopup ? 'scale-in' : ''}`}>
                            <div className={classes.CloseButton} onClick={() => setShowLogoutPopup(false)}>{icons.close}</div>
                            <p>If you logout, you will not be able to save favourites and add items to your watch list!</p>
                            <div onClick={logout} className={`${classes.LogoutButton} btn btn-small`}>Logout</div>
                        </div>
                    </div>
                :
                    <div onClick={initiateLogin} className={classes.LoginIcon}>{icons.key}</div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        setShowLoginModal: show => dispatch(actions.setShowLoginModal(show)),
        setUserDetails: details => dispatch(actions.setUserDetails(details)),
        setLoggedIn: loggedIn => dispatch(actions.setLoggedIn(loggedIn))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);
