// Dependencies
import React from 'react';
import propTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';

const Alert = ({ type = 'error', message, open, onClose }) => {
  // States
  const { display, opacity } = useSpring({
    to: { display: open ? 'block' : 'none', opacity: open ? 1 : 0 },
    config: config.wobbly
  });

  switch (type) {
    default:
      return (
        <animated.div
          className="relative py-3 pl-4 pr-10 mt-2 mb-4 text-red-700 transition-all duration-200 origin-top transform bg-red-100 border border-red-400 rounded-lg"
          role="alert"
          style={{ display, opacity }}
        >
          <strong className="mr-1 font-bold">Holy smokes!</strong>
          <span className="block">
            {message === '[object Object]' ? 'Fields cannot be empty' : message}
            .
          </span>
          <span
            className="absolute right-0 visible px-4 py-3 transform -translate-y-1/2 outline-none top-1/2 bottom-1/2 focus:shadow-outline"
            role="button"
            tabIndex="0"
            onClick={() => onClose(false)}
            onKeyDown={() => onClose(false)}
          >
            <svg
              className="absolute top-0 left-0 w-6 h-6 text-red-500 fill-current"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </animated.div>
      );
  }
};

Alert.defaultProps = {
  type: ''
};

Alert.propTypes = {
  type: propTypes.string,
  message: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired
};

export default Alert;
