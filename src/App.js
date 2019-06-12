import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import TV from './components/TV';

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Header/>
                <Route exact path="/" component={Home} />
                <Route path="/movie/:id" component={Movie} />
                <Route path="/tv/:id" component={TV} />
            </BrowserRouter>
        </Fragment>
    );
};

export default App;
