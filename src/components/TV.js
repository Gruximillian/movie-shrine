import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import classes from './MovieAndTV.module.css';
import icons from '../assets/icons';

import actions from '../store/actions';
import { getImageUrl, getLanguage, getTitle, getPeriod, getVideoUrl } from '../utils/functions';
import { getTmdbConfig } from '../utils/fetch';

const TV = props => {
    const [ imagePreviewIndex, setImagePreviewIndex ] = useState(null);
    const tmdbConfig = props.tmdbConfiguration;
    const configPresent = Object.keys(tmdbConfig).length > 0;
    const setShowBackdrop = props.setShowBackdrop;

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

    useEffect(() => {
        setShowBackdrop(imagePreviewIndex !== null);
    }, [imagePreviewIndex, setShowBackdrop]);

    // not rendering anything until we get the tmdbConfig info
    if (!configPresent) return null;

    const mediaType = 'TV';
    const {
        poster_path,
        original_name,
        overview,
        first_air_date,
        last_air_date,
        tagline,
        vote_average,
        genres,
        images,
        videos,
        number_of_episodes,
        number_of_seasons,
        status
    } = props.data;
    const imageUrl = getImageUrl(tmdbConfig.images, poster_path, 4);
    const title = getTitle(props.data);
    const year = getPeriod(props.data);
    const language = getLanguage(props.data, tmdbConfig.languages);
    const firstAired = (new Date(first_air_date)).toLocaleDateString();
    const lastAired = (new Date(last_air_date)).toLocaleDateString();
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

    const showImage = imageIndex => {
        setImagePreviewIndex(imageIndex);
    };

    const closePreview = () => {
        setImagePreviewIndex(null)
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
                    src={getImageUrl(tmdbConfig.images, image.file_path, 4)}
                    onClick={() => showImage(idx)}
                    alt={`From the movie ${title}`}/>
            )
        });
    };

    const url = imagePreviewIndex !== null && getImageUrl(tmdbConfig.images, movieImages[imagePreviewIndex].file_path, 6);

    return (
        <main className={classes.Main}>
            <section className={classes.PosterSection}>
                <h2 className={`${classes.Title} hide-on-med-and-up`}>{title}</h2>

                <div className={classes.PosterAndDetails}>
                    <img className={classes.Poster} src={imageUrl} alt={`Poster for ${mediaType.toLowerCase()} show ${title}`} />

                    <div className={`${classes.PosterSectionDetails} hide-on-small-only`}>
                        <h2 className={classes.Title}>{title}</h2>
                        <div className={classes.ReleaseYear}>{year}</div>
                        <div className={classes.MediaType}>{mediaType} Show</div>
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
                        <strong className={classes.DetailsLabel}>Original name:</strong>
                        <i className={classes.DetailsValue}> {original_name}</i>
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
                        <strong className={classes.DetailsLabel}>First air date:</strong>
                        <i className={classes.DetailsValue}> {firstAired}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Last air date:</strong>
                        <i className={classes.DetailsValue}> {lastAired}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Number of episodes:</strong>
                        <i className={classes.DetailsValue}> {number_of_episodes}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Number of seasons:</strong>
                        <i className={classes.DetailsValue}> {number_of_seasons}</i>
                    </div>
                    <div className={classes.DetailsEntry}>
                        <strong className={classes.DetailsLabel}>Genres:</strong>
                        <i className={classes.DetailsValue}> {movieGenres}</i>
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
                imagePreviewIndex !== null &&

                <div className={classes.ImagePreviewContainer}>
                    <div className={classes.CloseImagePreviewButton} onClick={closePreview}>{icons.close}</div>
                    <div className={classes.ImagePreview}>
                        <img src={url ? url : ''} alt="Preview"/>
                        {
                            imagePreviewIndex !== 0 &&
                            <button
                                onClick={() => showImage(imagePreviewIndex - 1)}
                                className={`btn ${classes.ImagePreviewNavButton} ${classes.PrevImage}`}>
                                &laquo;
                            </button>
                        }
                        {
                            imagePreviewIndex !== movieImages.length - 1 &&
                            <button
                                onClick={() => showImage(imagePreviewIndex + 1)}
                                className={`btn ${classes.ImagePreviewNavButton} ${classes.NextImage}`}>
                                &raquo;
                            </button>
                        }
                    </div>
                </div>
            }
        </main>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config)),
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TV);
