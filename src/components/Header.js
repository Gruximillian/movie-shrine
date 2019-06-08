import React from 'react';

import classes from './Header.module.css';
import icons from '../assets/icons';

const Header = () => {
    return (
        <header className={classes.Header}>
            {icons.logo}
            <h1 className={classes.Title}>The Movie Shrine</h1>
        </header>
    );
};

export default Header;
