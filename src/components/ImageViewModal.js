import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import classes from './ImageViewModal.module.css';

import icons from '../assets/icons';
import actions from '../store/actions';
import { getImageUrl } from '../utils/functions';

const ImageViewModal = props => {
    const modal = useRef(null);
    const {
        images,
        initialImageIndex,
        tmdbConfiguration,
        initModalClose
    } = props;

    const [ imageIndex, setImageIndex ] = useState(initialImageIndex);
    const url = getImageUrl(tmdbConfiguration.images, images[imageIndex].file_path, 6);

    const closeModal = () => {
        props.setInitModalClose(true);
    };

    const handleTransitionEnd = () => {
        if (modal.current.classList.contains('scale-in')) return;
        props.setShowBackdrop(false);
        props.setShowImageModal(false);
        props.setInitModalClose(false);
    };

    useEffect(() => {
        modal.current.classList.add('scale-in');
    }, []);

    useEffect(() => {
        if (!initModalClose) return;
        modal.current.classList.remove('scale-in');
    }, [initModalClose]);

    return (
        <div ref={modal} onTransitionEnd={handleTransitionEnd} className={`${classes.ImageViewContainer} scale-transition scale-out`}>
            <div className={classes.CloseImageViewButton} onClick={closeModal}>{icons.close}</div>
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
        tmdbConfiguration: state.tmdbConfiguration,
        initModalClose: state.initModalClose
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        setInitModalClose: initModalClose => dispatch(actions.setInitModalClose(initModalClose)),
        setShowImageModal: show => dispatch(actions.setShowImageModal(show))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewModal);
