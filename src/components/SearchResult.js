import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import classes from './SearchResult.module.css';

const SearchResult = props => {
    const overviewContainer = useRef(null);
    const overviewContent = useRef(null);
    const [ readMore, setReadMore ] = useState(false);
    const { result } = props;
    const imageBaseUrl = props.tmdbConfiguration.images && `${props.tmdbConfiguration.images.secure_base_url}${props.tmdbConfiguration.images.poster_sizes[3]}/`;
    const imageUrl = result.poster_path ? `${imageBaseUrl}${result.poster_path}` : 'https://via.placeholder.com/154x231.jpg';
    const title = result.name || result.original_name || result.title || result.original_title;

    const toggleReadMore = () => {
        setReadMore(!readMore);
        const overviewHeight = overviewContent.current.offsetHeight;
        const overviewContainerHeight = overviewContainer.current.offsetHeight;

        if (!readMore && overviewHeight > overviewContainerHeight) {
            overviewContainer.current.style.height = `${overviewHeight}px`;
        } else {
            overviewContainer.current.style.height = '200px';
        }
    };

    return (
        <div className={`${classes.SearchResult} ${readMore && classes.ReadMore} card `}>
            <div className="card-image">
                <img src={imageUrl} alt="Poster" />
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
                    <div ref={overviewContainer} className={classes.OverviewContainer}>
                        <p ref={overviewContent}>{result.overview}</p>
                    </div>
                    <div className={classes.ReadMoreToggle} onClick={toggleReadMore}>
                        {readMore ? 'Read Less' : 'Read More'}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(SearchResult);
