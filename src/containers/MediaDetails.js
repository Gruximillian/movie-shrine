import React, { useEffect, useState } from 'react';

import Movie from '../components/Movie';
import TV from '../components/TV';

import { getMediaDetails } from '../utils/fetch';

const MediaDetails = props => {
    const [ mediaDetails, setMediaDetails ] = useState({});
    const id = props.match.params.id;
    const mediaType = props.mediaType;

    useEffect(() => {
        getMediaDetails(id, mediaType)
            .then(data => setMediaDetails(data))
            .catch(error => console.log(error));
    }, [id, mediaType]);

    return mediaType === 'tv' ? <TV {...props} data={mediaDetails}/> : <Movie {...props} data={mediaDetails}/>;
};

export default MediaDetails;
