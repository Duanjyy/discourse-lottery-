import React from 'react';
import clsx from 'clsx';
import { useGameStore } from '../store/gameStore';
import { Pickaxe, Flag } from 'lucide-react';

const BottomBar: React.FC = () => {
  const { isFlagMode, toggleFlagMode } = useGameStore();

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center p-1 sm:p-1.5 bg-zinc-800/90 backdrop-blur-md rounded-full shadow-2xl border border-zinc-700/50">
      <button
        onClick={() => {
          if (isFlagMode) toggleFlagMode();
        }}
        className={clsx(
          'flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 font-medium select-none text-sm sm:text-base',
          !isFlagMode
            ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            : 'text-zinc-500 hover:text-zinc-400'
        )}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <Pickaxe size={18} className="sm:w-5 sm:h-5" />
        <span>挖掘</span>
      </button>

      <div className="w-px h-4 sm:h-6 bg-zinc-700/50 mx-1"></div>

      <button
        onClick={() => {
          if (!isFlagMode) toggleFlagMode();
        }}
        className={clsx(
          'flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 font-medium select-none text-sm sm:text-base',
          isFlagMode
            ? 'bg-coral-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            : 'text-zinc-500 hover:text-zinc-400'
        )}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <Flag size={18} className="sm:w-5 sm:h-5" />
        <span>标记</span>
      </button>
    </div>
  );
};

export default BottomBar;
