import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import classes from './LoginModal.module.css';

import actions from '../store/actions';
import { getAuthToken } from '../utils/fetch';
import icons from '../assets/icons';

const LoginModal = props => {
    const { initModalClose } = props;
    const [ authenticate, setAuthenticate ] = useState(false);
    const modal = useRef(null);

    const initLogin = () => {
        setAuthenticate(true);
    };

    const handleTransitionEnd = () => {
        if (modal.current.classList.contains('scale-in')) return;
        props.setShowBackdrop(false);
        props.setShowLoginModal(false);
        props.setInitModalClose(false);
        if (authenticate) getAuthToken();
    };

    const closeModal = () => {
        props.setInitModalClose(true);
    };

    useEffect(() => {
        modal.current.classList.add('scale-in');
    }, []);

    useEffect(() => {
        if (!initModalClose && !authenticate) return;
        modal.current.classList.remove('scale-in');
    }, [authenticate, initModalClose]);

    return (
        <div className={classes.LoginModalWrapper}>
            <div ref={modal} onTransitionEnd={handleTransitionEnd} className={`${classes.LoginModal} scale-transition scale-out`}>
                <div className={classes.CloseModalButton} onClick={closeModal}>{icons.close}</div>
                <div>
                    <p className={classes.LoginModalTitle}>Authenticate</p>
                    <p>To authenticate you will be temporary redirected to "The Movie Database" website!</p>
                    <p>After you authenticate you will be redirected back to this page and you will be able to add movies and TV shows to your "Favourites" and "Watch later" lists.</p>
                    <div onClick={initLogin} className={`${classes.LoginButton} btn btn-small`}>Login</div>
                    <p>You need a TMDB account in order to be able to authenticate.</p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        initModalClose: state.initModalClose
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        setShowLoginModal: show => dispatch(actions.setShowLoginModal(show)),
        setInitModalClose: initModalClose => dispatch(actions.setInitModalClose(initModalClose)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
