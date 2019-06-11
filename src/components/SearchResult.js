import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './SearchResult.module.css';
import { getImageBaseUrl, getImageUrl, getTitle } from '../utils/functions';

const SearchResult = props => {
    const overviewContainer = useRef(null);
    const overviewContent = useRef(null);
    const [ showReadMore, setShowReadMore ] = useState(false);
    const [ readMoreActive, setReadMoreActive ] = useState(false);
    const { result } = props;
    const imageBaseUrl = getImageBaseUrl(props.tmdbConfiguration.images, 3);
    const imageUrl = getImageUrl(result, imageBaseUrl);
    const title = getTitle(result);

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

export default connect(mapStateToProps)(SearchResult);
