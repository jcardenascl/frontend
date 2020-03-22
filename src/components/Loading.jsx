// Dependencies
import React from 'react';
import propTypes from 'prop-types';

// Components
import { Fade } from '@components';

const Loading = ({ spacing = 'py-0', background = 'bg-yellow-900' }) => (
  <Fade className={`flex justify-center ${spacing}`}>
    <div className="loader">
      <span className={background} />
      <span className={background} />
      <span className={background} />
      <span className={background} />
    </div>
  </Fade>
);

Loading.defaultProps = {
  spacing: 'py-8',
  background: 'bg-yellow-900'
};

Loading.propTypes = {
  spacing: propTypes.string,
  background: propTypes.string
};

export default Loading;
