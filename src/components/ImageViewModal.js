import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './ImageViewModal.module.css';

import icons from '../assets/icons';
import actions from '../store/actions';
import { getImageUrl } from '../utils/functions';

const ImageViewModal = props => {
    const {
        images,
        initialImageIndex,
        tmdbConfiguration,
        closeCallback
    } = props;

    const [ imageIndex, setImageIndex ] = useState(initialImageIndex);
    const url = getImageUrl(tmdbConfiguration.images, images[imageIndex].file_path, 6);

    return (
        <div className={classes.ImageViewContainer}>
            <div className={classes.CloseImageViewButton} onClick={closeCallback}>{icons.close}</div>
            <div className={classes.ImageView}>
                <img src={url ? url : ''} alt="Preview"/>
                {
                    imageIndex !== 0 &&
                    <button
                        onClick={() => setImageIndex(imageIndex - 1)}
                        className={`btn ${classes.ImageViewNavButton} ${classes.PrevImage}`}>
                        &laquo;
                    </button>
                }
                {
                    imageIndex !== images.length - 1 &&
                    <button
                        onClick={() => setImageIndex(imageIndex + 1)}
                        className={`btn ${classes.ImageViewNavButton} ${classes.NextImage}`}>
                        &raquo;
                    </button>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewModal);
