import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Difficulty } from '../utils/minesweeper';
import { Volume2, VolumeX } from 'lucide-react';

const Header: React.FC = () => {
  const {
    minesLeft,
    timeElapsed,
    status,
    difficulty,
    soundEnabled,
    initGame,
    resetGame,
    incrementTime,
    toggleSound,
  } = useGameStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'playing') {
      timer = setInterval(() => {
        incrementTime();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, incrementTime]);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    initGame(e.target.value as Difficulty);
  };

  const getFace = () => {
    if (status === 'won') return '😎';
    if (status === 'lost') return '😵';
    return '😃';
  };

  // 格式化数字为3位，如 005, 999
  const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
      <div className="flex items-center justify-between w-full max-w-xs sm:max-w-sm px-3 py-2 bg-zinc-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)] border border-zinc-700/50">
        
        {/* 地雷剩余 */}
        <div className="bg-black/40 rounded-lg px-2 py-1 min-w-[60px] text-center border border-zinc-800/50 shadow-inner flex items-center justify-center">
          <span className="font-mono text-xl sm:text-2xl font-bold text-coral-500 tracking-wider" style={{ color: '#ef4444', textShadow: '0 0 8px rgba(239,68,68,0.5)' }}>
            {formatNumber(minesLeft)}
          </span>
        </div>

        {/* 状态表情按钮 */}
        <button
          onClick={resetGame}
          className="text-3xl sm:text-4xl hover:scale-110 active:scale-95 transition-transform select-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {getFace()}
        </button>

        {/* 时间 */}
        <div className="bg-black/40 rounded-lg px-2 py-1 min-w-[60px] text-center border border-zinc-800/50 shadow-inner flex items-center justify-center">
          <span className="font-mono text-xl sm:text-2xl font-bold text-coral-500 tracking-wider" style={{ color: '#ef4444', textShadow: '0 0 8px rgba(239,68,68,0.5)' }}>
            {formatNumber(timeElapsed)}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-1 sm:mt-0 items-center">
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="bg-zinc-800 text-zinc-300 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1 border border-zinc-700 outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none text-center shadow-lg"
        >
          <option value="beginner">初级 (9x9)</option>
          <option value="intermediate">中级 (16x16)</option>
          <option value="expert">高级 (12x24)</option>
        </select>

        <button 
          onClick={toggleSound}
          className="p-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Header;
