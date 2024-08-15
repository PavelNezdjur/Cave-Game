export const saveGameSession = (playerName, difficulty, score) => {
  const gameSessions = JSON.parse(localStorage.getItem('gameSessions')) || [];
  gameSessions.push({ playerName, difficulty, score });
  gameSessions.sort((a, b) => b.score - a.score);
  localStorage.setItem('gameSessions', JSON.stringify(gameSessions));
};

if (won) {
  const savedScores = JSON.parse(localStorage.getItem('caveGameScores')) || [];
  savedScores.push({ playerName, difficulty, score });
  localStorage.setItem('caveGameScores', JSON.stringify(savedScores));
}
