import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css';

import SearchResultTvOrMovie from './SearchResultTemplateTvOrMovie';

const ShowUserListMedia = props => {
    const [ numberOfItems, setNumberOfItems ] = useState(20);
    const [ itemsToShow, setItemsToShow ] = useState([]);

    const listType = props.match.params.listType;
    const {
        mediaType,
        userDetails
    } = props;

    const mediaMessage = listType === 'watchlist' ?
        mediaType === 'movies' ? ' movie watchlist' : ' TV show watchlist'
        :
        mediaType === 'movies' ? ' favourite movies' : ' favourite TV shows';

    const mediaList = userDetails[listType] && userDetails[listType][mediaType];

    useEffect(() => {
        const tempItemsArray = [];
        for (let i = 0; i < numberOfItems; i++) {
            if (mediaList[i]) {
                tempItemsArray[i] = mediaList[i];
            }
        }
        setItemsToShow(tempItemsArray);
    }, [setItemsToShow, mediaList, numberOfItems]);

    const loadMore = () => {
        setNumberOfItems(numberOfItems + 20);
    };

    const showSearchResults = () => (
        <section className={classes.SearchResults}>
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
        <div className={classes.NoResultsMessage}>
            You have no items in your { mediaMessage }
        </div>
    );

    const loadMoreButton = () => {
        if (mediaList.length > itemsToShow.length) return (
            <div className={`${classes.LoadMore} center-align`}>
                <button className="btn" onClick={loadMore}>Load more</button>
            </div>
        )
    };

    return (
        <main className={classes.Main}>
            <p className={classes.WelcomeMessage}>
                Your { mediaMessage }:
            </p>
            { mediaList.length > 0 && showSearchResults() }

            { mediaList.length === 0 && noResultsMessage() }

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
