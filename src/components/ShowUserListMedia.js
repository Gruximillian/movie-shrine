import React from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css';

import SearchResultTvOrMovie from './searchResultTemplateTvOrMovie';

const ShowUserListMedia = props => {
    const listType = props.match.params.listType;
    const {
        mediaType,
        userDetails
    } = props;

    if (!userDetails[listType]) return null;

    const mediaMessage = listType === 'watchlist' ?
        mediaType === 'movies' ? ' movie watchlist' : ' TV show watchlist'
        :
        mediaType === 'movies' ? ' favourite movies' : ' favourite TV shows';

    const mediaList = userDetails[listType][mediaType];

    const loadMore = () => {
        // props.initiateSearch(props.queryTerm, props.searchResults.page + 1);
    };

    const showSearchResults = () => (
        <section className={classes.SearchResults}>
            {
                mediaList.results.map(result => {
                    // tmdb does not send media_type property for favourites and watchlist items
                    const media_type = mediaType === 'movies' ? 'movie' : 'tv';
                    const resultWithMediaType = { ...result, media_type };
                    return <SearchResultTvOrMovie key={result.id} result={resultWithMediaType}/>
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
        if (props.searchResults.page < props.searchResults.total_pages) return (
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
            { mediaList.results.length > 0 && showSearchResults() }

            { mediaList.results.length === 0 && noResultsMessage() }

            {/*{ loadMoreButton() }*/}
        </main>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // initiateSearch: (query, page) => dispatch(actions.initiateSearch(query, page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserListMedia);
