import React from 'react';
import { connect } from 'react-redux';

import { getImageUrl, getTitle } from '../utils/functions';

const SearchResultKnownFor = props => {
    const { result } = props;
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.poster_path, 0);

    return (
        <div className="card horizontal">
            <div className="card-image">
                <img src={imageUrl} alt="Poster" />
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <p>Type: {result.media_type}</p>
                    <p className="card-title">{getTitle(result)}</p>
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

export default connect(mapStateToProps)(SearchResultKnownFor);
