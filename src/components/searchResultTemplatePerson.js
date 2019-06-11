import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './searchResultTemplatePerson.module.css';
import { getTitle } from '../utils/functions';

const SearchResultTemplatePerson = props => {
    const overviewContainer = useRef(null);
    const overviewContent = useRef(null);
    const [ showReadMore, setShowReadMore ] = useState(false);
    const [ readMoreActive, setReadMoreActive ] = useState(false);
    const { result } = props;
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
            <div className={`${classes.CardContent} card-content`}>
                <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
                <p>Known for:</p>
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

export default connect(mapStateToProps)(SearchResultTemplatePerson);
