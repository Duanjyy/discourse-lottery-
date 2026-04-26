import React from 'react';
import { useGameStore } from '../store/gameStore';
import { RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameOverModal: React.FC = () => {
  const { status, timeElapsed, resetGame } = useGameStore();

  if (status === 'idle' || status === 'playing') return null;

  const isWon = status === 'won';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-zinc-800 border border-zinc-700/50 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden"
        >
          {/* 装饰性背景光晕 */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 blur-3xl opacity-30 ${isWon ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

          <div className="relative z-10">
            <div className="text-6xl mb-4">{isWon ? '🎉' : '💥'}</div>
            <h2 className="text-3xl font-bold text-zinc-100 mb-2 tracking-wide">
              {isWon ? '通关成功！' : '游戏结束'}
            </h2>
            
            {isWon && (
              <p className="text-zinc-400 mb-8">
                用时: <span className="font-mono text-emerald-400 text-xl font-bold">{timeElapsed}</span> 秒
              </p>
            )}
            {!isWon && (
              <p className="text-zinc-400 mb-8">
                不要气馁，再试一次吧！
              </p>
            )}

            <button
              onClick={resetGame}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg
                ${isWon 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-emerald-500/20' 
                  : 'bg-red-500 hover:bg-red-400 text-red-950 shadow-red-500/20'
                }
              `}
            >
              <RefreshCcw size={22} className={isWon ? '' : 'text-red-950'} />
              再来一局
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GameOverModal;
