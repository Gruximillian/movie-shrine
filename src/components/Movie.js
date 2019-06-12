import React from 'react';
import { connect } from 'react-redux';

const Movie = props => {
    console.log(props.tmdbConfiguration.images);
    console.log(props.data);
    return (
        <main>

        </main>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(Movie);
