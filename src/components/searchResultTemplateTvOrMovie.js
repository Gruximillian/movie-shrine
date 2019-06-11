import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './searchResultTemplateTvOrMovie.module.css';
import { getImageUrl, getTitle, getYear, getLanguage } from '../utils/functions';

const SearchResultTemplateTvOrMovie = props => {
    const overviewContainer = useRef(null);
    const overviewContent = useRef(null);
    const [ showReadMore, setShowReadMore ] = useState(false);
    const [ readMoreActive, setReadMoreActive ] = useState(false);
    const { result } = props;
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.poster_path, 3);
    const title = getTitle(result);
    const year = getYear(result);
    const language = getLanguage(result, props.tmdbConfiguration.languages);

    const toggleReadMore = () => {
        setReadMoreActive(!readMoreActive);

        if (!readMoreActive && showReadMore) {
            overviewContainer.current.style.height = `${overviewContent.current.offsetHeight}px`;
        } else {
            overviewContainer.current.style.height = '200px';
        }
    };

    useEffect(() => {
        setShowReadMore(overviewContent.current.offsetHeight > overviewContainer.current.offsetHeight);
    }, []);

    return (
        <div className={`${classes.SearchResult} ${readMoreActive && classes.ReadMore} card`}>
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
                showReadMore &&
                    <div className={classes.ReadMoreToggle} onClick={toggleReadMore}>
                        {readMoreActive ? 'Read Less' : 'Read More'}
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
