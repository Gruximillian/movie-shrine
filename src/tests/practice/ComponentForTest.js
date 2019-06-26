import React, { useState } from 'react';

const ComponentForTest = props => {
    const [ count, setCount ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState('');

    const updateCountBy = value => {
        if (count + value < 0) {
            setErrorMessage('Counter cannot be less than 0!');
            setCount(0);
        } else {
            setCount(count + value);
            setErrorMessage('');
        }
    };

    return (
        <div data-test="component-component-for-test">
            <h1 data-test="title">{props.title || 'The test component'}</h1>
            <p data-test="counter-display">The count is: { count }</p>
            <button data-test="increment-button" onClick={() => updateCountBy(1)}>Increase counter</button>
            <button data-test="decrement-button" onClick={() => updateCountBy(-1)}>Increase counter</button>
            {
                errorMessage &&
                <p data-test="error-message">{errorMessage}</p>
            }
        </div>
    );
};

export default ComponentForTest;
