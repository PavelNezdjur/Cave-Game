import React from 'react';
import useStore from '../store/store';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const contentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  maxWidth: '80%',
  maxHeight: '80%',
  overflow: 'auto',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '5px',
};

const GameOverModal = () => {
  const gameStatus = useStore((state) => state.gameStatus);
  const score = useStore((state) => state.score);
  const resetGame = useStore((state) => state.resetGame);

  if (gameStatus !== 'won' && gameStatus !== 'lost') {
    return null;
  }

  const handleRestart = () => {
    resetGame();
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h2>{gameStatus === 'won' ? 'Congratulations!' : 'Game Over'}</h2>
        <p>
          {gameStatus === 'won'
            ? 'You successfully navigated the cave!'
            : 'Your drone crashed!'}
        </p>
        <p>Your final score: {Math.floor(score)}</p>
        <button style={buttonStyle} onClick={handleRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
