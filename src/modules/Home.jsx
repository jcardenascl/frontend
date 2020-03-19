// Dependencies
import React from 'react';
import propTypes from 'prop-types';

const Home = ({ action, user }) => {
  console.log(action, user);

  return <h2>Dashboard Home</h2>;
};

Home.defaultProps = {
  action: ''
};

Home.propTypes = {
  action: propTypes.string,
  user: propTypes.shape({
    id: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
    privilege: propTypes.string,
    active: propTypes.bool,
    token: propTypes.string
  }).isRequired
};

export default Home;
