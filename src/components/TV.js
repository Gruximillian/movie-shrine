import React, { useEffect } from 'react';

import { getMediaDetails } from '../utils/fetch';

const TV = props => {
    const id = props.match.params.id;

    useEffect(() => {
        getMediaDetails(id, 'tv', null);
    }, [id]);

    return (
        <h1>TV Show: {id}</h1>
    );
};

export default TV;
