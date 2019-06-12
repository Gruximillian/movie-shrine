import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import icons from '../assets/icons';

const Header = () => {
    return (
        <header className={classes.Header}>
            <Link to="/">
                {icons.logo}
                <h1 className={classes.Title}>The Movie Shrine</h1>
            </Link>
        </header>
    );
};

export default Header;
