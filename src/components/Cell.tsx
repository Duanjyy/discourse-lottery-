import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CellData } from '../utils/minesweeper';

interface CellProps {
  cell: CellData;
  onClick: () => void;
  onLongPress: () => void;
  onDoubleClick: () => void;
}

const colorMap: Record<number, string> = {
  1: 'text-blue-500',
  2: 'text-emerald-500',
  3: 'text-red-500',
  4: 'text-purple-500',
  5: 'text-yellow-600',
  6: 'text-cyan-500',
  7: 'text-black',
  8: 'text-gray-500',
};

const Cell: React.FC<CellProps> = ({ cell, onClick, onLongPress, onDoubleClick }) => {
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = setTimeout(() => {
      onLongPress();
      setTimer(null);
    }, 500); // 500ms long press
    setTimer(t);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  const handleTouchMove = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onLongPress();
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className={twMerge(
        clsx(
          'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-lg sm:text-xl rounded shadow-sm select-none transition-all duration-200',
          !cell.isRevealed
            ? 'bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer'
            : 'bg-zinc-900 border border-zinc-800 shadow-inner',
          cell.isRevealed && cell.isMine && !cell.isFlagged ? 'bg-red-500/20 border-red-500' : ''
        )
      )}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {cell.isRevealed ? (
        cell.isMine ? (
          '💣'
        ) : cell.neighborMines > 0 ? (
          <span className={colorMap[cell.neighborMines]} style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}>
            {cell.neighborMines}
          </span>
        ) : null
      ) : cell.isFlagged ? (
        <span className="drop-shadow-md">🚩</span>
      ) : null}
    </div>
  );
};

export default Cell;
