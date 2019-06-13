import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Movie.module.css';

import actions from '../store/actions';
import { getImageUrl, getLanguage, getTitle, getYear, getHoursAndMinutes, getVideoUrl } from '../utils/functions';
import { getTmdbConfig } from '../utils/fetch';

const Movie = props => {
    const tmdbConfig = props.tmdbConfiguration;
    const configPresent = Object.keys(tmdbConfig).length > 0;

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

    // not rendering anything until we get the tmdbConfig info
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
    } = props.data;
    const imageUrl = getImageUrl(tmdbConfig.images, poster_path, 4);
    const title = getTitle(props.data);
    const year = getYear(props.data);
    const language = getLanguage(props.data, tmdbConfig.languages);
    const duration = getHoursAndMinutes(runtime);
    const dateReleased = (new Date(release_date)).toLocaleDateString();
    const genresArray = genres && genres.map(genre => genre.name);
    const movieGenres = genresArray && genresArray.join(', ');
    const movieImages = images && images.backdrops;
    const movieVideos = videos && videos.results;
    // console.log(props.tmdbConfiguration.images.poster_sizes);
    // console.log(props.data);
    // console.log(movieImages);
    // ${movieVideos[0].key}

    const videoList = () => {
        if (!movieVideos) return null;
        if (movieVideos.length === 0) return (
            <p className={classes.NoVideosMessage}>There are no available videos for {title}!</p>
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

    return (
        <main className={classes.Main}>
            <section className={classes.PosterSection}>
                <h2 className={`${classes.Title} hide-on-med-and-up`}>{title}</h2>

                <div className={classes.PosterAndDetails}>
                    <img className={classes.Poster} src={imageUrl} alt={`Poster for ${mediaType.toLowerCase()} ${title}`} />

                    <div className={`${classes.PosterSectionDetails} hide-on-small-only`}>
                        <h2 className={classes.Title}>{title}</h2>
                        <div className={classes.ReleaseYear}>{year}</div>
                        <div className={classes.MediaType}>Movie</div>
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

            <section className={classes.VideosSection}>
                <p className={classes.DetailsLabel}>Videos</p>
                <div className={classes.Videos}>
                    { videoList() }
                </div>
            </section>
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
        setTmdbConfiguration: config => dispatch(actions.setTmdbConfiguration(config))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
