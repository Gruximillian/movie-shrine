import React from 'react';

import classes from './Footer.module.css';

import movieShrineConfig from '../config/movieShrine';
import icons from '../assets/icons';

const Footer = () => {
  return (
    <footer data-test="component-footer" className={classes.Footer}>
      <div className={classes.FooterContent}>
        <div className={classes.FooterSection}>
          <p data-test="created-by">{movieShrineConfig.createdByText}</p>
          <p className={classes.Links}>
            <a
              data-test="github-link"
              className={classes.Link}
              target="_blank"
              rel="noopener noreferrer"
              href={movieShrineConfig.gitHubLink}
            >
              {icons.gitHub}
            </a>
            <a
              data-test="linkedin-link"
              className={classes.Link}
              target="_blank"
              rel="noopener noreferrer"
              href={movieShrineConfig.linkedInLink}
            >
              {icons.linkedIn}
            </a>
          </p>
        </div>
        <div className={`${classes.Credits} ${classes.FooterSection}`}>
          <a
            data-test="tmdb-link"
            className={classes.CreditsIcon}
            target="_blank"
            rel="noopener noreferrer"
            href={movieShrineConfig.tmdbLink}
          >
            {icons.tmdb}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
