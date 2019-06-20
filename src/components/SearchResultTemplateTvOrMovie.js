import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TmdbActions from './TmdbActions';

import classes from './SearchResultTemplateTvOrMovie.module.css';
import { getImageUrl, getTitle, getPeriod, getLanguage } from '../utils/functions';

const SearchResultTemplateTvOrMovie = props => {
    const {
        tmdbConfiguration,
        result,
        loggedIn
    } = props;
    const imageUrl = getImageUrl(tmdbConfiguration.images, result.poster_path, 3);
    const title = getTitle(result);
    const year = getPeriod(result);
    const language = getLanguage(result, tmdbConfiguration.languages);

    const detailsUrl = `/${result.media_type}/${result.id}`;

    const preventIfListAction = event => {
        if (event.target.dataset.preventclick) {
            event.preventDefault();
        }
    };

    return (
        <div className={`${classes.SearchResult} card`}>
            <Link onClick={preventIfListAction} to={detailsUrl}>
                <div className={`${classes.ImageContainer} card-image`}>
                    <img src={imageUrl} alt="Poster" />
                    {
                        loggedIn &&
                        <TmdbActions mediaItem={result}/>
                    }
                </div>
            </Link>
            <div className={`${classes.CardContent} card-content`}>
                <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
                <ul>
                    <li><strong className={classes.DetailsLabel}>Original name:</strong> {result.original_name || result.original_title}</li>
                    <li><strong className={classes.DetailsLabel}>Type:</strong> {result.media_type}</li>
                    <li><strong className={classes.DetailsLabel}>Year:</strong> {year}</li>
                    <li><strong className={classes.DetailsLabel}>Language:</strong> {language}</li>
                    <li><strong className={classes.DetailsLabel}>Rating:</strong> {result.vote_average}</li>
                </ul>
                <p className={classes.Overview}>
                    {result.overview}
                </p>
            </div>
            <Link to={detailsUrl} className={classes.ShowMoreToggle}>
                View Details
            </Link>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration,
        loggedIn: state.loggedIn
    }
};

export default connect(mapStateToProps)(SearchResultTemplateTvOrMovie);
