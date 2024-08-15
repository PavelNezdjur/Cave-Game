import { create } from 'zustand';
import { initGame, getFullToken } from '../services/api';
import { checkCollision } from '../utils/collision';

const useStore = create((set, get) => ({
  playerName: '',
  difficulty: 0,
  droneSize: 20,
  score: 0,
  droneX: 250,
  droneY: 0,
  droneSpeedX: 0,
  droneSpeedY: 0,
  caveSegments: [],
  gameStatus: 'idle', // 'idle', 'playing', 'won', 'lost'
  playerId: null,
  playerToken: null,
  segmentNumber: 0,
  isConnected: false,
  isLoading: true,

  setPlayerInfo: (name, difficulty) => set({ playerName: name, difficulty }),
  setPlayerId: (id) => set({ playerId: id }),
  setPlayerToken: (token) => set({ playerToken: token }),
  setGameStatus: (status) => set({ gameStatus: status }),
  setDroneSize: (size) => set({ droneSize: size }),
  updateDronePosition: (x, y) => set({ droneX: x, droneY: y }),
  addCaveSegment: (segment) =>
    set((state) => ({ caveSegments: [...state.caveSegments, segment] })),
  updateScore: (score) => set({ score }),
  setIsLoading: (status) => set({ isLoading: status }),
  setIsConnected: (status) => set({ isConnected: status }),

  startGame: async (name, difficulty) => {
    set({ playerName: name, difficulty, gameStatus: 'playing', score: 0 });
    if (difficulty !== 0) {
      get().setDroneSize(get().droneSize + difficulty); // увеличение размера дрона в зависимости от текущей сложности
    }
    try {
      const id = await initGame(name, difficulty);
      set({ playerId: id });
      const token = await getFullToken(id);
      set({ playerToken: token });
    } catch (error) {
      console.error('Error starting game:', error);
      set({ gameStatus: 'idle' });
    }
  },

  updateDroneSpeed: (key) => {
    const { droneSpeedX, droneSpeedY } = get();
    switch (key) {
      case 'ArrowLeft':
        set({ droneSpeedX: Math.max(droneSpeedX - 1, -10) });
        break;
      case 'ArrowRight':
        set({ droneSpeedX: Math.min(droneSpeedX + 1, 10) });
        break;
      case 'ArrowUp':
        set({ droneSpeedY: Math.min(droneSpeedY + 1, 10) });
        break;
      case 'ArrowDown':
        set({ droneSpeedY: Math.max(droneSpeedY - 1, 0) });
        break;
      default:
        break;
    }
  },

  moveDrone: () => {
    const {
      droneX,
      droneY,
      droneSpeedX,
      droneSpeedY,
      caveSegments,
      droneSize,
    } = get();

    const newX = droneX + droneSpeedX;
    const newY = droneY + droneSpeedY;

    set(() => ({
      droneX: newX,
      droneY: newY,
    }));

    if (checkCollision(newX, newY, droneSize, caveSegments)) {
      get().setGameStatus('lost');
      return;
    }
  },

  resetGame: () => {
    set({
      playerName: '',
      difficulty: 0,
      droneSize: 20,
      score: 0,
      droneX: 250,
      droneY: 0,
      droneSpeedX: 0,
      droneSpeedY: 0,
      caveSegments: [],
      gameStatus: 'idle',
      playerId: null,
      playerToken: null,
      isLoading: true,
    });
  },

  endGame: (won) => {
    const { playerName, difficulty, score } = get();
    set({ gameStatus: won ? 'won' : 'lost' });
    if (won) {
      const savedScores =
        JSON.parse(localStorage.getItem('caveGameScores')) || [];
      savedScores.push({ playerName, difficulty, score });
      localStorage.setItem('caveGameScores', JSON.stringify(savedScores));
    }
  },
}));

export default useStore;
