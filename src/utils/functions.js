import config from '../config/tmdb';

export const getImageUrl = (imgConfigJSON, imagePath, imgSizeIndex) => {
  const baseUrl = `${imgConfigJSON.secure_base_url}${imgConfigJSON.poster_sizes[imgSizeIndex]}/`;
  const imageWidth = imgConfigJSON.poster_sizes[imgSizeIndex].substring(1);

  return imagePath ? `${baseUrl}${imagePath}` : `https://via.placeholder.com/${imageWidth}.jpg`;
};

export const getTitle = (resultJSON) => {
  return resultJSON.name || resultJSON.original_name || resultJSON.title || resultJSON.original_title;
};

export const getPeriod = (resultJSON) => {
  if (resultJSON.release_date) {
    const date = new Date(resultJSON.release_date);
    return date.getFullYear() || null;
  }

  const firstAirDate = new Date(resultJSON.first_air_date);
  const lastAirDate = new Date(resultJSON.last_air_date);
  const period = !isNaN(lastAirDate.getFullYear())
    ? `${firstAirDate.getFullYear()} - ${lastAirDate.getFullYear()}`
    : firstAirDate.getFullYear();

  return period || null;
};

export const getLanguage = (resultJSON, languages) => {
  if (!resultJSON.original_language) return;

  return languages.find((language) => language.iso_639_1 === resultJSON.original_language).english_name;
};

export const getHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;

  return `${hours}h ${min}min`;
};

export const getVideoUrl = (videoData) => {
  if (videoData.site.toLowerCase() === 'youtube') return `https://www.youtube.com/embed/${videoData.key}?controls=1`;
  if (videoData.site.toLowerCase() === 'vimeo') return `https://player.vimeo.com/video/${videoData.key}`;

  return null;
};

export const toggleBodyScroll = (lock) => {
  if (lock) {
    document.body.classList.add('scroll-lock');
  } else {
    document.body.classList.remove('scroll-lock');
  }
};

export const backToStartingUrl = () => {
  const search = window.location.search;
  const baseUrl = window.location.origin + window.location.pathname;

  if (!search) return;
  window.location = baseUrl;
};

export const getSearchObjectFromLocation = () => {
  // check if this was a redirect from TMDB site after the request_token confirmation
  const search = window.location.search;
  // if not, do nothing
  if (search === '') return null;

  const params = search.substring(1).split('&');
  const searchObject = {};

  params.forEach((param) => {
    const [key, value] = param.split('=');
    searchObject[key] = value;
  });

  return searchObject;
};

export const getSessionIdFromStorage = () => {
  // load session data on mount if it is present
  const session = localStorage.getItem('movieShrineSession');
  if (!session) return;

  const { session_id } = JSON.parse(session);
  return session_id;
};

export const mediaListUrl = (listType, mediaType, credentials, pageNumber) => {
  const { id, sessionId } = credentials;
  const page = pageNumber || 1; // optional parameter
  return `${config.api_url_v3}/account/${id}/${listType}/${mediaType}?api_key=${config.rt}&session_id=${sessionId}&sort_by=created_at.asc&page=${page}`;
};

export const toggleInMediaListUrl = (listType, credentials) => {
  const { id, sessionId } = credentials;
  return `${config.api_url_v3}/account/${id}/${listType}?api_key=${config.rt}&session_id=${sessionId}`;
};
