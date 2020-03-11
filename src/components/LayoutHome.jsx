// Dependencies
import React from 'react';
import propTypes from 'prop-types';

// Components
import { HeaderHome } from '.';

const Layout = ({ children }) => (
  <>
    <HeaderHome />

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
