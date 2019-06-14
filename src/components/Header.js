import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import icons from '../assets/icons';
import actions from '../store/actions';

import { getAuthToken } from '../utils/fetch';

const Header = props => {
    const initiateLogin = () => {
        getAuthToken();
    };

    return (
        <header className={classes.Header}>
            <Link to="/" className={classes.HeaderLink} onClick={props.resetState}>
                {icons.logo}
                <h1 className={classes.Title}>The Movie Shrine</h1>
            </Link>
            <div className={classes.LoginSection}>
                <div onClick={initiateLogin} className={classes.LoginIcon}>{icons.key}</div>
            </div>
        </header>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState())
    }
};

export default connect(null, mapDispatchToProps)(Header);
