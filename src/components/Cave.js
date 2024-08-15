import React, { useRef, useEffect } from 'react';
import useStore from '../store/store';

const Cave = ({ width, height }) => {
  const canvasRef = useRef(null);
  const { caveSegments, droneY, droneX, setGameStatus, endGame } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;

    ctx.beginPath();

    // пещера
    const startIndex = Math.max(0, Math.floor(droneY / 5));
    const endIndex = Math.min(
      caveSegments.length,
      startIndex + Math.ceil(height / 5) + 20
    );

    let previousSegment = caveSegments[startIndex];

    for (let i = startIndex + 1; i < endIndex; i++) {
      const segment = caveSegments[i];
      if (segment && previousSegment) {
        const yPrev = (i - 1) * 5 - droneY;
        const yCurrent = i * 5 - droneY;

        // линии Безье, чтобы сгладить стенки пещеры
        // левая стенка
        ctx.moveTo(width / 2 + previousSegment[0], yPrev);
        ctx.lineTo(width / 2 + segment[0], yCurrent);

        // правая стенка
        ctx.moveTo(width / 2 + previousSegment[1], yPrev);
        ctx.lineTo(width / 2 + segment[1], yCurrent);

        // Закрашиваем пещеру внутри
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(width / 2 + previousSegment[0], yPrev);
        ctx.lineTo(width / 2 + segment[0], yCurrent);
        ctx.lineTo(width / 2 + segment[1], yCurrent);
        ctx.lineTo(width / 2 + previousSegment[1], yPrev);
        ctx.closePath();
        ctx.fill();
      }

      // Проверка на победу
      if (i >= 150 && i === caveSegments.length - 1) {
        setGameStatus('won');
        endGame('won');
      }

      previousSegment = segment;
    }

    ctx.stroke();
  }, [caveSegments, droneY, droneX, width, height, setGameStatus, endGame]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Cave;
