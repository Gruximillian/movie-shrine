import React from 'react';
import { connect } from 'react-redux';

const TV = props => {
    console.log(props.data);
    return (
        <p>TV Show</p>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(TV);
