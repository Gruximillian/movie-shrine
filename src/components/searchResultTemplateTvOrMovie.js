import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './searchResultTemplateTvOrMovie.module.css';
import { getImageUrl, getTitle, getPeriod, getLanguage } from '../utils/functions';

const SearchResultTemplateTvOrMovie = props => {
    const { result } = props;
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.poster_path, 3);
    const title = getTitle(result);
    const year = getPeriod(result);
    const language = getLanguage(result, props.tmdbConfiguration.languages);

    const detailsUrl = `/${result.media_type}/${result.id}`;

    return (
        <div className={`${classes.SearchResult} card`}>
            <Link to={detailsUrl}>
                <div className="card-image">
                    <img src={imageUrl} alt="Poster" />
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
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(SearchResultTemplateTvOrMovie);
