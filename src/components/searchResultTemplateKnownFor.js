import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './searchResultTemplateKnownFor.module.css';
import { getImageUrl, getTitle } from '../utils/functions';

const SearchResultKnownFor = props => {
    const { result } = props;
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.poster_path, 0);

    const detailsUrl = `/${result.media_type}/${result.id}`;

    return (
        <Link to={detailsUrl}>
            <div className={`${classes.KnownForEntry} card horizontal hoverable`}>
                <div className="card-image">
                    <img src={imageUrl} alt="Poster" />
                </div>
                <div className="card-stacked">
                    <div className={`${classes.Content} card-content`}>
                        <span><strong className={classes.DetailsLabel}>Type:</strong> {result.media_type}</span>
                        <p className={`${classes.Title} card-title`}>{getTitle(result)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(SearchResultKnownFor);
