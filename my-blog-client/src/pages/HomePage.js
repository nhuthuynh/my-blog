import React from 'react';

/**
 *      React Fragment use to wrap multiple tag in return funciton of a componet
 *          React Fragment is exist from react version 16.8
 *          React does not allow to have multiple root elements
 *          When the component is rendered, the tag React.Fragment will be removed
 *          React.Fragment has short hand like <>
 */

const Homepage = () => (
    <>
        <h1>Hello, welcome to my blog</h1>
        <p>This is test</p>
    </>
)

export default Homepage;
