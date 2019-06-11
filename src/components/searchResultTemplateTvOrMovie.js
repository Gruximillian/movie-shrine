import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './searchResultTemplateTvOrMovie.module.css';
import { getImageUrl, getTitle, getYear, getLanguage } from '../utils/functions';

const SearchResultTemplateTvOrMovie = props => {
    const overviewContainer = useRef(null);
    const overviewContent = useRef(null);
    const [ showMoreContentText, setShowMoreContentText ] = useState(false);
    const [ showMoreContentActive, setShowMoreContentActive ] = useState(false);
    const { result } = props;
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.poster_path, 3);
    const title = getTitle(result);
    const year = getYear(result);
    const language = getLanguage(result, props.tmdbConfiguration.languages);

    const toggleShowMore = () => {
        setShowMoreContentActive(!showMoreContentActive);

        if (!showMoreContentActive && showMoreContentText) {
            overviewContainer.current.style.height = `${overviewContent.current.offsetHeight + 20}px`;
        } else {
            overviewContainer.current.style.height = '200px';
        }
    };

    const showDetails = event => {
        if (event.target.classList.contains(classes.ShowMoreToggle)) return;
        console.log(result);
    };

    useEffect(() => {
        setShowMoreContentText(overviewContent.current.offsetHeight > overviewContainer.current.offsetHeight);
    }, []);

    return (
        <div className={`${classes.SearchResult} card hoverable`} onClick={showDetails}>
            <div className="card-image">
                <img src={imageUrl} alt="Poster" />
            </div>
            <div className={`${classes.CardContent} card-content`}>
                <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
                <ul>
                    <li><strong className={classes.DetailsLabel}>Original name:</strong> {result.original_name || result.original_title}</li>
                    <li><strong className={classes.DetailsLabel}>Type:</strong> {result.media_type}</li>
                    <li><strong className={classes.DetailsLabel}>Year:</strong> {year}</li>
                    <li><strong className={classes.DetailsLabel}>Language:</strong> {language}</li>
                    <li><strong className={classes.DetailsLabel}>Rating:</strong> {result.vote_average}</li>
                </ul>
                <div ref={overviewContainer} className={classes.OverviewContainer}>
                    <p ref={overviewContent}>{result.overview}</p>
                </div>
            </div>
            {
                showMoreContentText &&
                    <div className={classes.ShowMoreToggle} onClick={toggleShowMore}>
                        {showMoreContentActive ? 'Less Content' : 'More Content'}
                    </div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(SearchResultTemplateTvOrMovie);
