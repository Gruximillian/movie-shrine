import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css';

import SearchResultTvOrMovie from './SearchResultTemplateTvOrMovie';
import movieShrineConfig from '../config/movieShrine';

const ShowUserListMedia = props => {
    const [ numberOfItems, setNumberOfItems ] = useState(20);
    const [ itemsToShow, setItemsToShow ] = useState([]);

    const listType = props.match.params.listType;
    const {
        mediaType,
        userDetails
    } = props;

    const mediaMessage = movieShrineConfig.mediaMessage[listType][mediaType];

    const mediaList = userDetails[listType] && userDetails[listType][mediaType];

    useEffect(() => {
        const tempItemsArray = [];
        for (let i = 0; i < numberOfItems; i++) {
            if (mediaList && mediaList[i]) {
                tempItemsArray[i] = mediaList[i];
            }
        }
        setItemsToShow(tempItemsArray);
    }, [setItemsToShow, mediaList, numberOfItems]);

    const loadMore = () => {
        setNumberOfItems(numberOfItems + 20);
    };

    const showSearchResults = () => (
        <section data-test="search-results-section" className={classes.SearchResults}>
            {
                itemsToShow.map(result => {
                    // tmdb does not send media_type property for favourites and watchlist items
                    const media_type = mediaType === 'movies' ? 'movie' : 'tv';
                    const resultWithMediaType = { ...result, media_type };
                    return <SearchResultTvOrMovie inList={listType} key={result.id} result={resultWithMediaType}/>
                })
            }
        </section>
    );

    const noResultsMessage = () => (
        <div data-test="no-items-message" className={classes.NoResultsMessage}>
            {movieShrineConfig.mediaMessage.noItems} { mediaMessage }
        </div>
    );

    const loadMoreButton = () => {
        if (mediaList && mediaList.length > numberOfItems) return (
            <div data-test="load-more-button" className={`${classes.LoadMore} center-align`}>
                <button className="btn" onClick={loadMore}>{movieShrineConfig.loadMoreButtonText}</button>
            </div>
        )
    };

    return (
        <main data-test="component-main" className={classes.Main}>
            <p data-test="media-message" className={classes.MediaMessage}>
                Your { mediaMessage }:
            </p>
            { mediaList && mediaList.length > 0 && showSearchResults() }

            { mediaList && mediaList.length === 0 && noResultsMessage() }

            { loadMoreButton() }
        </main>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

export default connect(mapStateToProps)(ShowUserListMedia);
