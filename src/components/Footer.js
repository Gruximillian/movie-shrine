import React from 'react';

import classes from './Footer.module.css';

import icons from '../assets/icons';

const Footer = () => {
    return (
        <footer className={classes.Footer}>
            <div className={classes.FooterContent}>
                <div className={classes.FooterSection}>
                    <p>Created by Vojislav Grujić</p>
                    <p className={classes.Links}>
                        <a
                            className={classes.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/gruximillian">
                            { icons.gitHub }
                        </a>
                        <a
                            className={classes.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/vojislav-gruji%C4%87-b31424146/">
                            { icons.linkedIn }
                        </a>
                    </p>
                </div>
                <div className={`${classes.Credits} ${classes.FooterSection}`}>
                    <a
                        className={classes.CreditsIcon}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.themoviedb.org/">
                        { icons.tmdb }
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
