import React from 'react';
import { connect } from 'react-redux';
import classes from './TmdbActions.module.css';

import icons from '../assets/icons';

const TmdbActions = props => {
    const {
        tmdbConfiguration
    } = props;

    const toggleItemInTmdbList = listType => {
        console.log(listType);
    };

    return (
        <div data-preventclick className={classes.TmdbActionsContainer}>
            <div
                className={classes.TmdbAction}
                data-preventclick
                onClick={() => toggleItemInTmdbList('favorites')}>
                {icons.star}
            </div>
            <div
                className={classes.TmdbAction}
                data-preventclick
                onClick={() => toggleItemInTmdbList('watchlist')}>
                {icons.watch}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(TmdbActions);
