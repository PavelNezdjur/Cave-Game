import React, { useState, useEffect } from 'react';
import useStore from '../store/store';

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f7f9fc',
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  fontFamily: "'Roboto', sans-serif",
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '10px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const thTdStyle = {
  border: 'none',
  padding: '12px 15px',
  textAlign: 'left',
  color: '#555',
};

const thStyle = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
};

const rowStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff',
});

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '20px 0',
  cursor: 'pointer',
  borderRadius: '5px',
  width: '100%',
  transition: 'background-color 0.3s ease',
};

const inputStyle = {
  width: '100%',
  padding: '12px 20px',
  margin: '10px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '16px',
  transition: 'border-color 0.3s ease',
};

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const startGame = useStore((state) => state.startGame);

  useEffect(() => {
    const savedScores =
      JSON.parse(localStorage.getItem('caveGameScores')) || [];
    setScores(savedScores.sort((a, b) => b.score - a.score));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() && difficulty >= 0 && difficulty <= 10) {
      startGame(playerName, difficulty);
    } else {
      alert('Please enter a valid name and difficulty (0-10)');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Cave Game Scoreboard</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Rank</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Player</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Score</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} style={rowStyle(index)}>
              <td style={thTdStyle}>{index + 1}</td>
              <td style={thTdStyle}>{score.playerName}</td>
              <td style={thTdStyle}>{Math.floor(score.score)}</td>
              <td style={thTdStyle}>{score.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ color: '#333', fontFamily: "'Roboto', sans-serif" }}>
        Start New Game
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          style={inputStyle}
          required
        />
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          min="0"
          max="10"
          style={inputStyle}
          required
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Scoreboard;
