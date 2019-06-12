import React from 'react';
import { connect } from 'react-redux';

const Movie = props => {
    console.log(props.data);
    return (
        <p>Movie</p>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(Movie);
