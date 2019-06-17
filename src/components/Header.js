import React  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

import UserSection from './UserSection';

import icons from '../assets/icons';
import actions from '../store/actions';

const Header = props => {
    const {
        resetState
    } = props;

    return (
        <header className={classes.Header}>
            <Link to="/" className={classes.HeaderLink} onClick={resetState}>
                {icons.logo}
                <h1 className={classes.Title}>The Movie Shrine</h1>
            </Link>

            <UserSection/>
        </header>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState())
    }
};

export default connect(null, mapDispatchToProps)(Header);
