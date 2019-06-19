import React from 'react';
import { connect } from 'react-redux';

import SearchResultKnownFor from './SearchResultTemplateKnownFor';
import classes from './SearchResultTemplateTvOrMovie.module.css';
import { getImageUrl, getTitle } from '../utils/functions';

const SearchResultTemplatePerson = props => {
    const { result } = props;
    const title = getTitle(result);
    const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.profile_path, 3);

    return (
        <div className={`${classes.SearchResult} card`}>
            <div className="card-image">
                <img src={imageUrl} alt="Profile" />
            </div>
            <div className={`${classes.CardContent} card-content`}>
                <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
                <p>Known for:</p>
                <div className={classes.KnownForList}>
                    <ul>
                        {
                            result.known_for.map(entry => (
                                <li key={entry.id}>
                                    <SearchResultKnownFor result={entry} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tmdbConfiguration: state.tmdbConfiguration
    }
};

export default connect(mapStateToProps)(SearchResultTemplatePerson);
