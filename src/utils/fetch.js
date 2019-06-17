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
    // first step in authentication process; get temporary request_token
    fetch(`${config.api_url_v3}/authentication/token/new?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(response => {
            const location = window.location;
            const { request_token } = response;
            // after getting the temporary request_token, redirect the user to allow or deny the token
            // after the user action on the TMDB site is finished, the user is redirected back to the same Movie Shrine page
            window.location = `${config.auth_request_token_url}/${request_token}?redirect_to=${location}`;
        })
        .catch(error => console.log(error));
};

export const getDetails = (sessionId, action) => {
    const url = `https://api.themoviedb.org/3/account?api_key=${config.api_key}&session_id=${sessionId}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.username) {
                action(response); // save user details into state
            }
        })
        .catch(error => console.log(error));
};
