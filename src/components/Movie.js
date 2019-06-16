import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import classes from './MovieAndTV.module.css';

import ImageViewModal from './ImageViewModal';

import actions from '../store/actions';
import { getImageUrl, getLanguage, getTitle, getPeriod, getHoursAndMinutes, getVideoUrl } from '../utils/functions';
import { getTmdbConfig } from '../utils/fetch';

const Movie = props => {
    const [ initialImageIndex, setInitialImageIndex ] = useState(null);
    const {
        data,
        tmdbConfiguration,
        showImageModal,
        setShowImageModal,
        setShowBackdrop
    } = props;

    const configPresent = Object.keys(tmdbConfiguration).length > 0;

    useEffect(() => {
        // make sure the tmdb configuration is set if the page gets reloaded
        const config = JSON.parse(localStorage.getItem('movieShrineTmdbConfig'));

        if (configPresent) return;

        if (config && Object.keys(config).length > 0) {
            props.setTmdbConfiguration(config);
        } else {
            getTmdbConfig(props.setTmdbConfiguration);
        }
    });

    // not rendering anything until we get the tmdbConfiguration info
    if (!configPresent) return null;

    const mediaType = 'Movie';
    const {
        poster_path,
        original_title,
        overview,
        release_date,
        runtime,
        tagline,
        vote_average,
        genres,
        images,
        videos
    } = data;
    const imageUrl = getImageUrl(tmdbConfiguration.images, poster_path, 4);
    const title = getTitle(props.data);
    const year = getPeriod(props.data);
    const language = getLanguage(props.data, tmdbConfiguration.languages);
    const duration = getHoursAndMinutes(runtime);
    const dateReleased = (new Date(release_date)).toLocaleDateString();
    const genresArray = genres && genres.map(genre => genre.name);
    const movieGenres = genresArray && genresArray.join(', ');
    const movieImages = images && images.backdrops;
    const movieVideos = videos && videos.results;

    const videoList = () => {
        if (!movieVideos) return null;
        if (movieVideos.length === 0) return (
            <p className={classes.NoMediaMessage}>There are no available videos for {title}!</p>
        );

        return movieVideos && movieVideos.map(video => {
            return (
                <iframe
                    className={classes.VideoContainer}
                    key={video.id}
                    title={video.name}
                    src={getVideoUrl(video)}
                    frameBorder="0"
                    allowFullScreen> </iframe>
            )
        });
    };

    const imageList = () => {
        if (!movieImages) return null;
        if (movieImages.length === 0) return (
            <p className={classes.NoMediaMessage}>There are no available images for {title}!</p>
        );

        return movieImages && movieImages.map((image, idx) => {
            return (
                <img
                    className={`${classes.ImageContainer} hoverable`}
                    key={`${image.file_path}-${idx}`}
                    src={getImageUrl(tmdbConfiguration.images, image.file_path, 4)}
                    onClick={() => initShowModal(idx)}
                    alt={`From the movie ${title}`}/>
            )
         });
    };

    const initShowModal = imageIndex => {
        setInitialImageIndex(imageIndex);
        setShowBackdrop(true);
        setShowImageModal(true);
    };

    return (
        <main className={classes.Main}>
            <section className={classes.PosterSection}>
                <h2 className={`${classes.Title} hide-on-med-and-up`}>{title}</h2>

                <div className={classes.PosterAndDetails}>
                    <img className={classes.Poster} src={imageUrl} alt={`Poster for ${mediaType.toLowerCase()} ${title}`} />

                    <div className={`${classes.PosterSectionDetails} hide-on-small-only`}>
                        <h2 className={classes.Title}>{title}</h2>
                        <div className={classes.ReleaseYear}>{year}</div>
                        <div className={classes.MediaType}>{mediaType}</div>
                        {
                            tagline &&
                            <div className={classes.Tagline}>
                                <q>{tagline}</q>
                            </div>
                        }
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
                        <strong className={classes.DetailsLabel}>Original title:</strong>
                        <i className={classes.DetailsValue}> {original_title}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Type:</strong>
                        <i className={classes.DetailsValue}> {mediaType}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Language:</strong>
                        <i className={classes.DetailsValue}> {language}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Release date:</strong>
                        <i className={classes.DetailsValue}> {dateReleased}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Runtime:</strong>
                        <i className={classes.DetailsValue}> {duration}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Genres:</strong>
                        <i className={classes.DetailsValue}> {movieGenres}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Rating:</strong>
                        <i className={classes.DetailsValue}> {vote_average}</i>
                    </div>
                </div>

                <div>
                    <strong className={classes.DetailsLabel}>Overview:</strong><br />
                    {overview}
                </div>
            </section>

            <section className={classes.MediaSection}>
                <p className={classes.DetailsLabel}>Videos:</p>
                <div className={classes.Videos}>
                    { videoList() }
                </div>
            </section>

            <section className={classes.MediaSection}>
                <p className={classes.DetailsLabel}>Images:</p>
                <div className={classes.Images}>
                    { imageList() }
                </div>
            </section>

            {
                showImageModal &&
                    <ImageViewModal images={movieImages} initialImageIndex={initialImageIndex} />
            }
        </main>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration,
        showImageModal: state.showImageModal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config)),
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        setShowImageModal: show => dispatch(actions.setShowImageModal(show))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
