import React from 'react';
import { useGameStore } from '../store/gameStore';
import Cell from './Cell';

const Board: React.FC = () => {
  const { board, handleCellClick, handleCellLongPress, handleCellDoubleClick } = useGameStore();

  return (
    <div className="overflow-auto w-full flex justify-center py-4">
      <div 
        className="grid gap-[2px] bg-zinc-800 p-2 rounded-xl shadow-2xl border border-zinc-700/50"
        style={{
          gridTemplateColumns: `repeat(${board[0]?.length || 1}, minmax(0, 1fr))`
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              cell={cell}
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
