import React from 'react';
import useStore from '../store/store';

const Drone = ({ size }) => {
  const droneX = useStore((state) => state.droneX);

  return (
    <svg
      width={size}
      height={size}
      style={{ position: 'absolute', left: droneX - size / 2, top: 0 }}
    >
      <polygon points={`${size / 2},${size} 0,0 ${size},0`} fill="green" />
    </svg>
  );
};

export default Drone;
