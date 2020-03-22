// Dependencies
import React from 'react';
import propTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';

// Styles
import '@styles/styles.scss';

NProgress.configure({
  showSpinner: false
});
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: propTypes.func.isRequired,
  pageProps: propTypes.objectOf(Object).isRequired
};

export default App;
