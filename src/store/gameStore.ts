import { create } from 'zustand';
import {
  CellData,
  Difficulty,
  DIFFICULTY_CONFIG,
  GameStatus,
  createEmptyBoard,
  generateMines,
  revealCell,
  checkWin,
} from '../utils/minesweeper';

interface GameState {
  board: CellData[][];
  status: GameStatus;
  difficulty: Difficulty;
  minesLeft: number;
  timeElapsed: number;
  isFlagMode: boolean;

  initGame: (diff?: Difficulty) => void;
  handleCellClick: (x: number, y: number) => void;
  handleCellLongPress: (x: number, y: number) => void;
  handleCellDoubleClick: (x: number, y: number) => void;
  toggleFlagMode: () => void;
  incrementTime: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: [],
  status: 'idle',
  difficulty: 'beginner',
  minesLeft: 10,
  timeElapsed: 0,
  isFlagMode: false,

  initGame: (diff) => {
    const newDiff = diff || get().difficulty;
    const config = DIFFICULTY_CONFIG[newDiff];
    set({
      board: createEmptyBoard(config.rows, config.cols),
      status: 'idle',
      difficulty: newDiff,
      minesLeft: config.mines,
      timeElapsed: 0,
    });
  },

  resetGame: () => {
    get().initGame(get().difficulty);
  },

  incrementTime: () => {
    if (get().status === 'playing') {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    }
  },

  toggleFlagMode: () => {
    set((state) => ({ isFlagMode: !state.isFlagMode }));
  },

  handleCellLongPress: (x: number, y: number) => {
    const { status, board, minesLeft } = get();
    if (status !== 'playing' && status !== 'idle') return;

    const newBoard = [...board.map((r) => [...r.map((c) => ({ ...c }))])];
    const cell = newBoard[y][x];

    if (cell.isRevealed) return;

    if (cell.isFlagged) {
      cell.isFlagged = false;
      set({ board: newBoard, minesLeft: minesLeft + 1 });
    } else if (minesLeft > 0) {
      cell.isFlagged = true;
      set({ board: newBoard, minesLeft: minesLeft - 1 });
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  },

  handleCellDoubleClick: (x: number, y: number) => {
    const { status, board } = get();
    if (status !== 'playing') return;

    const currentBoard = [...board.map((r) => [...r.map((c) => ({ ...c }))])];
    const cell = currentBoard[y][x];

    if (!cell.isRevealed || cell.neighborMines === 0) return;

    // Count flagged neighbors
    let flaggedCount = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const ny = y + dy;
        const nx = x + dx;
        if (ny >= 0 && ny < currentBoard.length && nx >= 0 && nx < currentBoard[0].length) {
          if (currentBoard[ny][nx].isFlagged) {
            flaggedCount++;
          }
        }
      }
    }

    if (flaggedCount === cell.neighborMines) {
      let hitMine = false;
      let newBoard = currentBoard;
      
      // Reveal unflagged neighbors
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < currentBoard.length && nx >= 0 && nx < currentBoard[0].length) {
            const nCell = currentBoard[ny][nx];
            if (!nCell.isRevealed && !nCell.isFlagged) {
              const res = revealCell(newBoard, nx, ny);
              newBoard = res.newBoard;
              if (res.hitMine) hitMine = true;
            }
          }
        }
      }

      if (hitMine) {
        newBoard.forEach((row) =>
          row.forEach((c) => {
            if (c.isMine && !c.isFlagged) c.isRevealed = true;
          })
        );
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate([100, 50, 100]);
        }
        set({ board: newBoard, status: 'lost' });
        return;
      }

      if (checkWin(newBoard)) {
        set({ board: newBoard, status: 'won' });
        return;
      }

      set({ board: newBoard });
    }
  },

  handleCellClick: (x: number, y: number) => {
    const { status, board, isFlagMode, difficulty } = get();
    const config = DIFFICULTY_CONFIG[difficulty];

    if (status === 'won' || status === 'lost') return;

    if (isFlagMode) {
      get().handleCellLongPress(x, y);
      return;
    }

    let currentBoard = [...board.map((r) => [...r.map((c) => ({ ...c }))])];
    const cell = currentBoard[y][x];

    if (cell.isRevealed || cell.isFlagged) return;

    let isFirstClick = status === 'idle';

    if (isFirstClick) {
      generateMines(currentBoard, config.mines, x, y);
      set({ status: 'playing' });
    }

    const { newBoard, hitMine } = revealCell(currentBoard, x, y);

    if (hitMine) {
      newBoard.forEach((row) =>
        row.forEach((c) => {
          if (c.isMine && !c.isFlagged) c.isRevealed = true;
        })
      );
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]);
      }
      set({ board: newBoard, status: 'lost' });
      return;
    }

    if (checkWin(newBoard)) {
      set({ board: newBoard, status: 'won' });
      return;
    }

    set({ board: newBoard });
  },
}));
