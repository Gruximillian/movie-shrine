import React, { useEffect } from 'react';

import { getMediaDetails } from '../utils/fetch';

const Movie = props => {
    const id = props.match.params.id;

    useEffect(() => {
        getMediaDetails(id, 'movie', null);
    }, [id]);

    return (
        <h1>The Movie: {id}</h1>
    );
};

export default Movie;
