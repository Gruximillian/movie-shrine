import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import icons from '../assets/icons';
import actions from '../store/actions';

const Header = props => {
    return (
        <header className={classes.Header}>
            <Link to="/" onClick={props.resetState}>
                {icons.logo}
                <h1 className={classes.Title}>The Movie Shrine</h1>
            </Link>
        </header>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState())
    }
};

export default connect(null, mapDispatchToProps)(Header);
