import React from 'react';
import { AnimateKeyframes }  from 'react-simple-animate';

const Rotate = props => (
  <AnimateKeyframes
    play={true} // set play true to start the animation
    iterationCount="infinite"
    direction="alternate"
    duration={5}
    keyframes={[
        'transform: rotateX(0) rotateY(0) rotateZ(0)',
        'transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg)',
    ]}
    >
      {props.children}
  </AnimateKeyframes>
);

export default Rotate;