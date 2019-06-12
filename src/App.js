import React  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import MediaDetails from './containers/MediaDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home} />
            <Route path="/movie/:id" render={props => <MediaDetails {...props} mediaType="movie" />} />
            <Route path="/tv/:id" render={props => <MediaDetails {...props} mediaType="tv" />} />
        </BrowserRouter>
    );
};

export default App;
