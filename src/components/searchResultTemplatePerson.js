import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import SearchResultKnownFor from './searchResultTemplateKnownFor';
import classes from './searchResultTemplateTvOrMovie.module.css';
import { getImageUrl, getTitle } from '../utils/functions';

const SearchResultTemplatePerson = (props) => {
  const overviewContainer = useRef(null);
  const overviewContent = useRef(null);
  const [showMoreContentText, setShowMoreContentText] = useState(false);
  const [showMoreContentActive, setShowMoreContentActive] = useState(false);
  const { result } = props;
  const title = getTitle(result);
  const imageUrl = getImageUrl(props.tmdbConfiguration.images, result.profile_path, 3);

  const toggleShowMore = () => {
    setShowMoreContentActive(!showMoreContentActive);

    if (!showMoreContentActive && showMoreContentText) {
      overviewContainer.current.style.height = `${overviewContent.current.offsetHeight + 20}px`;
    } else {
      overviewContainer.current.style.height = '200px';
    }
  };

  useEffect(() => {
    setShowMoreContentText(overviewContent.current.offsetHeight > overviewContainer.current.offsetHeight);
  }, []);

  return (
    <div className={`${classes.SearchResult} card`}>
      <div className="card-image">
        <img src={imageUrl} alt="Profile" />
      </div>
      <div className={`${classes.CardContent} card-content`}>
        <h3 className={`${classes.ResultTitle} card-title`}>{title}</h3>
        <p>Known for:</p>
        <div ref={overviewContainer} className={classes.OverviewContainer}>
          <ul ref={overviewContent}>
            {result.known_for.map((entry) => (
              <li key={entry.id}>
                <SearchResultKnownFor result={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showMoreContentText && (
        <div className={classes.ShowMoreToggle} onClick={toggleShowMore}>
          {showMoreContentActive ? 'Less Content' : 'More Content'}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tmdbConfiguration: state.tmdbConfiguration
  };
};

export default connect(mapStateToProps)(SearchResultTemplatePerson);
