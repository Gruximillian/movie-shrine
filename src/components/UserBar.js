import React from 'react';
import { connect } from 'react-redux';

import classes from './UserBar.module.css';
// import actions from "../store/actions";

const UserBar = props => {
    const { userDetails } = props;
    const getUserFavourites = userDetails => {
        console.log('getting favourites list for:', userDetails);
    };

    const getUserWatchLaterList = userDetails => {
        console.log('getting watch later list for:', userDetails);
    };

    return (
        <section className={classes.UserBar}>
            <span onClick={() => getUserFavourites(userDetails)} className={classes.UserAction}>Favourites</span>
            <span onClick={() => getUserWatchLaterList(userDetails)} className={classes.UserAction}>Watch later</span>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // setShowBackdrop: show => dispatch(actions.setShowBackdrop(show)),
        // setShowLoginModal: show => dispatch(actions.setShowLoginModal(show)),
        // setUserDetails: details => dispatch(actions.setUserDetails(details)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
