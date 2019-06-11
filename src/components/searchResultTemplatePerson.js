import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import SearchResultKnownFor from './searchResultTemplateKnownFor';
import classes from './searchResultTemplatePerson.module.css';
import { getImageUrl, getTitle } from '../utils/functions';

const SearchResultTemplatePerson = props => {
    const overviewContainer = useRef(null);
    const overviewContent = useRef(null);
    const [ showReadMore, setShowReadMore ] = useState(false);
    const [ readMoreActive, setReadMoreActive ] = useState(false);
    const { result } = props;
    const title = getTitle(result);
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.profile_path, 3);

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
            {console.log(result)}
            <div className="card-image">
                <img src={imageUrl} alt="Profile" />
            </div>
            <div className={`${classes.CardContent} card-content`}>
                <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
                <p>Known for:</p>
                <div ref={overviewContainer} className={classes.OverviewContainer}>
                    <ul ref={overviewContent}>
                        {
                            result.known_for.map(entry => (
                                <li key={entry.id}>
                                    <SearchResultKnownFor result={entry} />
                                </li>
                            ))
                        }
                    </ul>
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
