import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

import UserSection from './UserSection';

import movieShrineConfig from '../config/movieShrine';
import icons from '../assets/icons';
import actions from '../store/actions';

const Header = (props) => {
  const { resetState } = props;

  return (
    <header data-test="component-header" className={classes.Header}>
      <Link data-test="link-home" to="/" className={classes.HeaderLink} onClick={resetState}>
        {icons.logo}
        <h1 data-test="app-title" className={classes.Title}>
          {movieShrineConfig.appTitle}
        </h1>
      </Link>

      <UserSection data-test="component-user-section" />
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch(actions.resetState())
  };
};

export default connect(null, mapDispatchToProps)(Header);
