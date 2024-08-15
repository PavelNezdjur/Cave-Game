import React, { useEffect } from 'react';
import useStore from './store/store';
import { useWebSocket } from './hooks/useWebSocket';
import Cave from './components/Cave';
import Drone from './components/Drone';
import SpeedGauge from './components/SpeedGauge';
import GameOverModal from './components/GameOverModal';
import Scoreboard from './components/ScoreBoard';
import Loader from './components/Loader';

const containerStyle = {
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f7f9fc',
  fontFamily: "'Roboto', sans-serif",
};

const gameContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  gap: '20px',
};

const gameDataStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  gap: '20px',
  color: '#333',
};

const scoreStyle = {
  fontSize: '20px',
  color: '#333',
  marginTop: '10px',
  fontFamily: "'Roboto', sans-serif",
};

const App = () => {
  const {
    gameStatus,
    playerId,
    playerToken,
    updateDroneSpeed,
    moveDrone,
    score,
    droneSpeedY,
    droneY,
    updateScore,
    difficulty,
    droneSize,
    caveSegments,
    isLoading,
    setIsLoading,
  } = useStore();

  const { sendMessage, isConnected } = useWebSocket(
    'wss://cave-drone-server.shtoa.xyz/cave'
  );

  useEffect(() => {
    if (isConnected && playerId && playerToken) {
      sendMessage(`player:${playerId}-${playerToken}`);
    }
  }, [isConnected, playerId, playerToken, sendMessage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'playing') return;
      updateDroneSpeed(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, updateDroneSpeed]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const gameLoop = setInterval(moveDrone, 50);
    return () => clearInterval(gameLoop);
  }, [gameStatus, moveDrone]);

  const segmentNumber = Math.floor(droneY / 5);

  useEffect(() => {
    updateScore(score + segmentNumber + droneSpeedY + difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentNumber]);

  useEffect(() => {
    if (caveSegments.length > 0) {
      setIsLoading(false);
    }
  }, [caveSegments, setIsLoading]);

  if (!isConnected) {
    return <Loader message={'Generating connection...'} />;
  }

  return (
    <div style={containerStyle}>
      {gameStatus === 'idle' ? (
        <Scoreboard />
      ) : isLoading ? (
        <Loader message={'Generating cave...'} />
      ) : (
        <div style={gameContainerStyle}>
          <Cave width={500} height={400} />
          <Drone size={droneSize} />
          <div style={gameDataStyle}>
            <SpeedGauge />
            <div style={scoreStyle}>Score: {Math.floor(score)}</div>
          </div>
        </div>
      )}
      <GameOverModal />
    </div>
  );
};

export default App;
