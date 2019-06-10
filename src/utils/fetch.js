import config from '../config/tmdb';

export const getTmdbConfig = action => {
    fetch(`${config.api_url_v3}/configuration?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(response => {
            action(response);
        })
        .catch((err) => console.log(err));
};
