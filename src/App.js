import React from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';

const App = () => {
    return (
        <div>
            <Header/>
            <p>Welcome to The Movie Shrine!</p>
            <SearchForm/>
        </div>
    );
};

export default App;
