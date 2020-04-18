import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './UserBar.module.css';
import movieShrineConfig from '../config/movieShrine';

const UserBar = () => {
  const [listTypeSelected, setListTypeSelected] = useState(null);

  const setListType = (type) => {
    // we want to toggle the secondary links bar if the user clicks on the same link
    const value = listTypeSelected === type ? null : type;
    setListTypeSelected(value);
  };

  return (
    <section data-test="component-userbar" className={classes.UserBar}>
      <div className={classes.PrimaryLinks}>
        <span
          data-test="link-favourites"
          onClick={() => setListType('favorite')}
          className={`${classes.UserAction} ${listTypeSelected === 'favorite' ? classes.Active : ''}`}
        >
          {movieShrineConfig.userBarLinksText.favourites}
        </span>
        <span
          data-test="link-watchlist"
          onClick={() => setListType('watchlist')}
          className={`${classes.UserAction} ${listTypeSelected === 'watchlist' ? classes.Active : ''}`}
        >
          {movieShrineConfig.userBarLinksText.watchlist}
        </span>
      </div>
      <div
        data-test="secondary-links"
        className={`${classes.SecondaryLinks} ${listTypeSelected ? classes.Visible : ''}`}
      >
        <Link
          data-test="link-movies"
          onClick={() => setListTypeSelected(null)}
          to={`/movies/${listTypeSelected}`}
          className={classes.UserAction}
        >
          {movieShrineConfig.userBarLinksText.movies}
        </Link>
        <Link
          data-test="link-tvshows"
          onClick={() => setListTypeSelected(null)}
          to={`/tvshows/${listTypeSelected}`}
          className={classes.UserAction}
        >
          {movieShrineConfig.userBarLinksText.tvshows}
        </Link>
      </div>
    </section>
  );
};

export default UserBar;
