// Dependencies
import React from 'react';
import propTypes from 'prop-types';

// Components
import { Header } from '.';

const Layout = ({ children }) => (
  <>
    <Header />

    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
};

export default Layout;
