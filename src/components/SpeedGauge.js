import React from 'react';
import useStore from '../store/store';

const SpeedGauge = () => {
  const droneSpeedX = useStore((state) => state.droneSpeedX);
  const droneSpeedY = useStore((state) => state.droneSpeedY);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const getStrokeColor = (speed, isVertical) => {
    if (isVertical) {
      return speed > 0 ? '#4CAF50' : '#F44336';
    } else {
      return speed < 0 ? '#2196F3' : '#FF9800';
    }
  };

  const getStrokeDashoffset = (speed, maxSpeed) => {
    const normalizedSpeed = Math.abs(speed) / maxSpeed;
    return circumference * (1 - normalizedSpeed);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
      }}
    >
      {/* Horizontal Speed Gauge */}
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={getStrokeColor(droneSpeedX, false)}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={getStrokeDashoffset(droneSpeedX, 10)}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20">
          {droneSpeedX}
        </text>
        <text x="50" y="70" textAnchor="middle" fontSize="12">
          {droneSpeedX < 0 ? 'Left' : 'Right'}
        </text>
      </svg>

      {/* Vertical Speed Gauge */}
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={getStrokeColor(droneSpeedY, true)}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={getStrokeDashoffset(droneSpeedY, 10)}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20">
          {Math.abs(droneSpeedY)}
        </text>
        <text x="50" y="70" textAnchor="middle" fontSize="12">
          Vertical
        </text>
      </svg>
    </div>
  );
};

export default SpeedGauge;
