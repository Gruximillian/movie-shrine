import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import classes from './MediaDetails.module.css';

import ImageViewModal from './ImageViewModal';
import TmdbActions from './TmdbActions';

import actions from '../store/actions';
import {
  getImageUrl,
  getLanguage,
  getTitle,
  getPeriod,
  getHoursAndMinutes,
  getVideoUrl,
  getSessionIdFromStorage
} from '../utils/functions';
import { getMediaDetails } from '../utils/fetch';

const MediaDetails = (props) => {
  const [initialImageIndex, setInitialImageIndex] = useState(null);
  const [mediaDetails, setMediaDetails] = useState({});
  const [numberOfVideos, setNumberOfVideos] = useState(10);
  const [numberOfImages, setNumberOfImages] = useState(20);

  const id = props.match.params.id;

  const {
    loggedIn,
    mediaType,
    tmdbConfiguration,
    showImageModal,
    setShowImageModal,
    setShowBackdrop,
    initiateGetTmdbConfig,
    setTmdbConfiguration,
    initiateGetUserDetails
  } = props;

  const configPresent = Object.keys(tmdbConfiguration).length > 0;

  useEffect(() => {
    if (!loggedIn) return;
    const sessionId = getSessionIdFromStorage();
    initiateGetUserDetails(sessionId);
  }, [loggedIn, initiateGetUserDetails]);

  useEffect(() => {
    // this could go into saga, but then the response should be saved in the global state
    getMediaDetails(id, mediaType)
      .then((data) => setMediaDetails(data))
      .catch((error) => console.log(error));
  }, [id, mediaType]);

  useEffect(() => {
    // make sure the tmdb configuration is set if the page gets reloaded
    const config = JSON.parse(localStorage.getItem('movieShrineTmdbConfig'));

    if (configPresent) return;

    if (config && Object.keys(config).length > 0) {
      setTmdbConfiguration(config);
    } else {
      initiateGetTmdbConfig();
    }
  }, [configPresent, setTmdbConfiguration, initiateGetTmdbConfig]);

  // not rendering anything until we get the tmdbConfiguration info
  if (!configPresent) return null;

  // make sure that the type is present; needed for the user actions (add/remove to favorites/watchlist)
  mediaDetails.media_type = mediaType;

  const {
    // general properties
    poster_path,
    overview,
    tagline,
    vote_average,
    genres,
    images,
    videos,
    // movie only properties
    original_title,
    release_date,
    runtime,
    // tv show only properties
    original_name,
    first_air_date,
    last_air_date,
    number_of_episodes,
    number_of_seasons,
    status
  } = mediaDetails;
  const posterUrl = getImageUrl(tmdbConfiguration.images, poster_path, 4);
  const title = getTitle(mediaDetails);
  const year = getPeriod(mediaDetails);
  const language = getLanguage(mediaDetails, tmdbConfiguration.languages);
  const duration = runtime && getHoursAndMinutes(runtime);
  const dateReleased = release_date && new Date(release_date).toLocaleDateString();
  const firstAired = first_air_date && new Date(first_air_date).toLocaleDateString();
  const lastAired = last_air_date && new Date(last_air_date).toLocaleDateString();
  const genresArray = genres && genres.map((genre) => genre.name);
  const mediaGenres = genresArray && genresArray.join(', ');
  const mediaImages = images && images.backdrops;
  const mediaVideos = videos && videos.results;
  const mediaTypeFull = mediaType === 'movie' ? 'Movie' : 'TV Show';

  const videosToShow = [];
  if (mediaVideos) {
    for (let i = 0; i < numberOfVideos; i++) {
      mediaVideos[i] && videosToShow.push(mediaVideos[i]);
    }
  }

  const imagesToShow = [];
  if (mediaImages) {
    for (let i = 0; i < numberOfImages; i++) {
      mediaImages[i] && imagesToShow.push(mediaImages[i]);
    }
  }

  const videoList = () => {
    if (!mediaVideos) return null;
    if (mediaVideos.length === 0)
      return <p className={classes.NoMediaMessage}>There are no available videos for {title}!</p>;

    return videosToShow.map((video) => {
      return (
        <iframe
          className={classes.VideoContainer}
          key={video.id}
          title={video.name}
          src={getVideoUrl(video)}
          frameBorder="0"
          allowFullScreen
        >
          {' '}
        </iframe>
      );
    });
  };

  const imageList = () => {
    if (!mediaImages) return null;
    if (mediaImages.length === 0)
      return <p className={classes.NoMediaMessage}>There are no available images for {title}!</p>;

    return imagesToShow.map((image, idx) => {
      return (
        <img
          className={`${classes.ImageContainer} hoverable`}
          key={`${image.file_path}-${idx}`}
          src={getImageUrl(tmdbConfiguration.images, image.file_path, 4)}
          onClick={() => initShowModal(idx)}
          alt={`From the ${mediaTypeFull} ${title}`}
        />
      );
    });
  };

  const loadMore = (mediaType) => {
    if (mediaType === 'videos') {
      setNumberOfVideos(numberOfVideos + 10);
    }
    if (mediaType === 'images') {
      setNumberOfImages(numberOfImages + 20);
    }
  };

  const loadMoreButton = (mediaType) => {
    const imagesButton = mediaType === 'images' && mediaImages && mediaImages.length > numberOfImages;
    const videosButton = mediaType === 'videos' && mediaVideos && mediaVideos.length > numberOfVideos;

    if (imagesButton || videosButton)
      return (
        <div className={`${classes.LoadMore} center-align`}>
          <button className="btn" onClick={() => loadMore(mediaType)}>
            Load more {mediaType}
          </button>
        </div>
      );
  };

  const initShowModal = (imageIndex) => {
    setInitialImageIndex(imageIndex);
    setShowBackdrop(true);
    setShowImageModal(true);
  };

  return (
    <main className={classes.Main}>
      <section className={classes.PosterSection}>
        <h2 className={`${classes.Title} hide-on-med-and-up`}>{title}</h2>

        <div className={classes.PosterAndDetails}>
          <div className={classes.PosterContainer}>
            <img className={classes.Poster} src={posterUrl} alt={`Poster for ${mediaTypeFull} ${title}`} />
            {loggedIn && <TmdbActions mediaItem={mediaDetails} />}
          </div>

          <div className={`${classes.PosterSectionDetails} hide-on-small-only`}>
            <h2 className={classes.Title}>{title}</h2>
            <div className={classes.ReleaseYear}>{year}</div>
            <div className={classes.MediaType}>{mediaTypeFull}</div>
            {tagline && (
              <div className={classes.Tagline}>
                <q>{tagline}</q>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={classes.DetailsSection}>
        <div>
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Title:</strong>
            <i className={classes.DetailsValue}> {title}</i>
          </div>
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Original {mediaType === 'movie' ? 'title' : 'name'}:</strong>
            <i className={classes.DetailsValue}> {original_title || original_name}</i>
          </div>
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Type:</strong>
            <i className={classes.DetailsValue}> {mediaType}</i>
          </div>
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Language:</strong>
            <i className={classes.DetailsValue}> {language}</i>
          </div>
          {dateReleased && (
            <div className={classes.DetailsEntry}>
              <strong className={classes.DetailsLabel}>Release date:</strong>
              <i className={classes.DetailsValue}> {dateReleased}</i>
            </div>
          )}
          {duration && (
            <div className={classes.DetailsEntry}>
              <strong className={classes.DetailsLabel}>Runtime:</strong>
              <i className={classes.DetailsValue}> {duration}</i>
            </div>
          )}
          {firstAired && (
            <div className={classes.DetailsEntry}>
              <strong className={classes.DetailsLabel}>First air date:</strong>
              <i className={classes.DetailsValue}> {firstAired}</i>
            </div>
          )}
          {lastAired && (
            <div className={classes.DetailsEntry}>
              <strong className={classes.DetailsLabel}>Last air date:</strong>
              <i className={classes.DetailsValue}> {lastAired}</i>
            </div>
          )}
          {number_of_episodes && (
            <div className={classes.DetailsEntry}>
              <strong className={classes.DetailsLabel}>Number of episodes:</strong>
              <i className={classes.DetailsValue}> {number_of_episodes}</i>
            </div>
          )}
          {number_of_seasons && (
            <div className={classes.DetailsEntry}>
              <strong className={classes.DetailsLabel}>Number of seasons:</strong>
              <i className={classes.DetailsValue}> {number_of_seasons}</i>
            </div>
          )}
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Genres:</strong>
            <i className={classes.DetailsValue}> {mediaGenres}</i>
          </div>
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Rating:</strong>
            <i className={classes.DetailsValue}> {vote_average}</i>
          </div>
          <div className={classes.DetailsEntry}>
            <strong className={classes.DetailsLabel}>Status:</strong>
            <i className={classes.DetailsValue}> {status}</i>
          </div>
        </div>

        <div>
          <strong className={classes.DetailsLabel}>Overview:</strong>
          <br />
          {overview}
        </div>
      </section>

      <section className={classes.MediaSection}>
        <p className={classes.DetailsLabel}>Videos:</p>
        <div className={classes.Videos}>{videosToShow && videoList()}</div>
      </section>

      {loadMoreButton('videos')}

      <section className={classes.MediaSection}>
        <p className={classes.DetailsLabel}>Images:</p>
        <div className={classes.Images}>{imagesToShow && imageList()}</div>
      </section>

      {loadMoreButton('images')}

      {showImageModal && <ImageViewModal images={mediaImages} initialImageIndex={initialImageIndex} />}
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    tmdbConfiguration: state.tmdbConfiguration,
    showImageModal: state.showImageModal,
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initiateGetTmdbConfig: () => dispatch(actions.initiateGetTmdbConfig()),
    setTmdbConfiguration: (config) => dispatch(actions.setTmdbConfiguration(config)),
    setShowBackdrop: (show) => dispatch(actions.setShowBackdrop(show)),
    setShowImageModal: (show) => dispatch(actions.setShowImageModal(show)),
    initiateGetUserDetails: (sessionId) => dispatch(actions.initiateGetUserDetails(sessionId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetails);
