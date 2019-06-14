import config from '../config/tmdb';

export const getTmdbConfig = action => {
    fetch(`${config.api_url_v3}/configuration?api_key=${config.api_key}&append_to_response=languages`)
        .then(response => response.json())
        .then(response => {
            action(response);
        })
        .catch(error => console.log(error));
};

export const getMediaDetails = (id, mediaType) => {
    return fetch(`${config.api_url_v3}/${mediaType}/${id}?api_key=${config.api_key}&append_to_response=videos,images`)
        .then(response => response.json())
        .then(response => response);
};

export const getAuthToken = () => {
    fetch(`${config.api_url_v3}/authentication/token/new?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(response => {
            const location = window.location;
            const { request_token } = response;
            window.location = `${config.auth_request_token_url}/${request_token}?redirect_to=${location}`;
        })
        .catch(error => console.log(error));
};
