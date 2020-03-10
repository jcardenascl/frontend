// Dependencies
import React from 'react';
import propTypes from 'prop-types';

// Components
import { Header } from '.';

const Layout = ({ children }) => (
  <>
    <Header />

    <main>{children}</main>

    <script
      src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.0.1/dist/alpine.js"
      defer
    />
  </>
);

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
};

export default Layout;
