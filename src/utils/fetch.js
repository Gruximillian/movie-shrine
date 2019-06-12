import config from '../config/tmdb';

export const getTmdbConfig = action => {
    fetch(`${config.api_url_v3}/configuration?api_key=${config.api_key}&append_to_response=languages`)
        .then(response => response.json())
        .then(response => {
            action(response);
        })
        .catch((err) => console.log(err));
};

export const getMediaDetails = (id, mediaType, action) => {
    fetch(`${config.api_url_v3}/${mediaType}/${id}?api_key=${config.api_key}&append_to_response=videos,images`)
        .then(response => response.json())
        .then(response => {
            // action(response);
            console.log(response);
        })
        .catch((err) => console.log(err));
};
