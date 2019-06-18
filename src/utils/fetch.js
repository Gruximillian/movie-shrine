import config from '../config/tmdb';

export const getMediaDetails = (id, mediaType) => {
    return fetch(`${config.api_url_v3}/${mediaType}/${id}?api_key=${config.api_key}&append_to_response=videos,images`)
        .then(response => response.json())
        .then(response => response);
    // since we are returning the promise from this function,
    // the catch method is omitted here and called where this function is called
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

export const requestSessionId = (token, action) => {
    // after the user allows the request_token, get the new session_id using that token
    const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${config.api_key}`;
    const body = JSON.stringify({
        "request_token": token
    });

    fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            const { success, session_id } = response;
            if (success) {
                // save the session_id to localStorage so it can be used again
                localStorage.setItem('movieShrineSession', JSON.stringify({ session_id }));
                // set loggedIn state property to true
                action(true);
            } else {
                action(false);
            }
        })
        .catch(error => console.log(error));
};
