// Dependencies
import React, { useRef } from 'react';
import { animated } from 'react-spring';
import propTypes from 'prop-types';

// Hooks
import { useOnScrollFade } from '@hooks';

const Fade = ({ children, ...props }) => {
  // States and refs
  const ref = useRef();
  const fade = useOnScrollFade({
    target: ref,
    threshold: [0, 1]
  });

  return (
    <animated.div ref={ref} style={fade} {...props}>
      {children}
    </animated.div>
  );
};

Fade.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
};

export default Fade;
