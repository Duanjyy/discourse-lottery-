import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import Cell from './Cell';

const Board: React.FC = () => {
  const { board, handleCellClick, handleCellLongPress, handleCellDoubleClick } = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(30);

  useEffect(() => {
    const updateCellSize = () => {
      if (!containerRef.current || !board || board.length === 0) return;
      
      // Get container dimensions (subtracting padding)
      const containerWidth = containerRef.current.clientWidth - 16; // 8px padding each side
      const containerHeight = containerRef.current.clientHeight - 16;
      
      const rows = board.length;
      const cols = board[0].length;
      
      // Calculate max cell size to fit width and height, including gaps
      // grid gap is 2px
      const maxCellWidth = (containerWidth - (cols - 1) * 2) / cols;
      const maxCellHeight = (containerHeight - (rows - 1) * 2) / rows;
      
      // Use the smaller dimension to keep cells square, but set a minimum and maximum size
      const newSize = Math.max(10, Math.min(Math.min(maxCellWidth, maxCellHeight), 40));
      
      setCellSize(newSize);
    };

    // Update initially and on window resize
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    
    // Also update when board dimensions change (e.g. difficulty change)
    return () => window.removeEventListener('resize', updateCellSize);
  }, [board]);

  if (!board || board.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden flex items-center justify-center p-2"
    >
      <div 
        className="grid gap-[2px] bg-zinc-800 p-1.5 sm:p-2 rounded-xl shadow-2xl border border-zinc-700/50 m-auto"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${board.length}, ${cellSize}px)`
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              cell={cell}
              size={cellSize}
              onClick={() => handleCellClick(x, y)}
              onLongPress={() => handleCellLongPress(x, y)}
              onDoubleClick={() => handleCellDoubleClick(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
