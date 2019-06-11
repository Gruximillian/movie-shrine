import React from 'react';
import { connect } from 'react-redux';

import { getImageBaseUrl, getImageUrl, getTitle } from '../utils/functions';

const SearchResultKnownFor = props => {
    const { result } = props;

    return (
        <div className="card horizontal">
            <div className="card-image">
                <img src={getImageUrl(result.poster_path, getImageBaseUrl(props.tmdbConfiguration.images, 0))} alt="Poster" />
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
