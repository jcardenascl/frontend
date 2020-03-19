// Dependencies
import React from 'react';
import propTypes from 'prop-types';

// Styles
import '@styles/styles.scss';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: propTypes.func.isRequired,
  pageProps: propTypes.objectOf(Object).isRequired
};

export default App;
