import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import icons from '../assets/icons';
import actions from '../store/actions';

const Header = props => {
    const [ showLogoutPopup, setShowLogoutPopup ] = useState(false);
    const {
        userDetails: {
            username,
            avatar
        },
        setShowBackdrop,
        setShowLoginModal,
        resetState,
        setUserDetails
    } = props;

    const gravatarHash = avatar && avatar.gravatar.hash;

    const initiateLogin = () => {
        setShowBackdrop(true);
        setShowLoginModal(true);
    };

    const logout = () => {
        setUserDetails({});
        localStorage.removeItem('movieShrineSession');
    };

    return (
        <header className={classes.Header}>
            <Link to="/" className={classes.HeaderLink} onClick={resetState}>
                {icons.logo}
                <h1 className={classes.Title}>The Movie Shrine</h1>
            </Link>
            <div className={classes.LoginSection}>
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
        </header>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        setShowLoginModal: show => dispatch(actions.setShowLoginModal(show)),
        setUserDetails: details => dispatch(actions.setUserDetails(details)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
