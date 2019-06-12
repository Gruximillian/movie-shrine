import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Header/>
                <Route exact path="/" component={Home} />
            </BrowserRouter>
        </Fragment>
    );
};

export default App;
