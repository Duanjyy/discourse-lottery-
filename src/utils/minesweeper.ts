export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface CellData {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 20, cols: 12, mines: 48 }, // 12x20，雷密度 20%
};

export const createEmptyBoard = (rows: number, cols: number): CellData[][] => {
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => ({
      x,
      y,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );
};

export const getNeighbors = (board: CellData[][], x: number, y: number): CellData[] => {
  const neighbors: CellData[] = [];
  const rows = board.length;
  const cols = board[0].length;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
        neighbors.push(board[ny][nx]);
      }
    }
  }
  return neighbors;
};

export const generateMines = (
  board: CellData[][],
  minesCount: number,
  firstClickX: number,
  firstClickY: number
) => {
  const rows = board.length;
  const cols = board[0].length;
  let minesPlaced = 0;

  // 保护首次点击的区域（自身及周围一圈不生成地雷）
  const isProtected = (x: number, y: number) => {
    return Math.abs(x - firstClickX) <= 1 && Math.abs(y - firstClickY) <= 1;
  };

  while (minesPlaced < minesCount) {
    const y = Math.floor(Math.random() * rows);
    const x = Math.floor(Math.random() * cols);

    if (!board[y][x].isMine && !isProtected(x, y)) {
      board[y][x].isMine = true;
      minesPlaced++;
    }
  }

  // 计算每个格子的邻居地雷数
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!board[y][x].isMine) {
        board[y][x].neighborMines = getNeighbors(board, x, y).filter(
          (c) => c.isMine
        ).length;
      }
    }
  }
};

export const revealCell = (
  board: CellData[][],
  x: number,
  y: number
): { newBoard: CellData[][]; hitMine: boolean } => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const cell = newBoard[y][x];

  if (cell.isRevealed || cell.isFlagged) {
    return { newBoard, hitMine: false };
  }

  cell.isRevealed = true;

  if (cell.isMine) {
    return { newBoard, hitMine: true };
  }

  if (cell.neighborMines === 0) {
    const queue: [number, number][] = [[x, y]];
    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      const neighbors = getNeighbors(newBoard, cx, cy);
      
      for (const n of neighbors) {
        if (!n.isRevealed && !n.isFlagged) {
          n.isRevealed = true;
          if (n.neighborMines === 0) {
            queue.push([n.x, n.y]);
          }
        }
      }
    }
  }

  return { newBoard, hitMine: false };
};

export const checkWin = (board: CellData[][]): boolean => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x];
      if (!cell.isMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
};
