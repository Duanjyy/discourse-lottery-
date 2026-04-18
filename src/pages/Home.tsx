import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Trophy, Play, Star, BookOpen, RotateCcw, FastForward } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { initGame, normalCleared, hardCleared, eliteCleared, fragments, points, resetAllProgress, cards, isGameOver, isWin } = useGameStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const currentLevelProgress = Math.max(1, normalCleared + 1);
  const hasInProgressGame = cards && cards.length > 0 && !isGameOver && !isWin;

  const handleStart = (level: number) => {
    // Prevent UI jumping by not updating Zustand state synchronously before navigation
    // We use setTimeout to allow navigation to happen first
    setTimeout(() => {
      initGame(level);
    }, 10);
    navigate('/game');
  };

  const handleContinue = () => {
    navigate('/game');
  };

  const handleResetProgress = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    resetAllProgress();
    setShowConfirm(false);
  };

  return (
    <div className="h-full w-full bg-[#f3f4f6] flex flex-col items-center justify-center p-6 text-gray-800 font-sans overflow-hidden">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 drop-shadow-sm mb-2 tracking-wider">
          卡片叠叠乐
        </h1>
        <p className="text-gray-500 text-sm">极致简约的消除挑战</p>
      </div>

      <div className="flex gap-4 mb-10 w-full max-w-sm">
        <div className="flex-1 bg-white p-5 rounded-[1.25rem] shadow-sm flex flex-col items-center justify-center border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <span className="text-3xl font-black text-amber-500 mb-1">{fragments}</span>
          <span className="text-xs font-bold tracking-widest text-gray-400">碎片</span>
        </div>
        
        <div className="flex-1 bg-white p-5 rounded-[1.25rem] shadow-sm flex flex-col items-center justify-center border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <span className="text-3xl font-black text-purple-500 mb-1">
            {normalCleared + hardCleared + eliteCleared}
          </span>
          <span className="text-xs font-bold tracking-widest text-gray-400">通关数</span>
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        {hasInProgressGame && (
          <button 
            onClick={handleContinue}
            className="relative overflow-hidden group bg-gradient-to-r from-amber-400 to-orange-500 border-none rounded-2xl p-4 flex items-center justify-between hover:brightness-110 shadow-lg shadow-amber-500/30 transition-all active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <FastForward size={20} />
              </div>
              <div className="text-left text-white">
                <h2 className="text-lg font-bold">继续闯关</h2>
                <p className="text-xs text-white/80">恢复第 {useGameStore.getState().currentLevel} 关未完成的进度</p>
              </div>
            </div>
          </button>
        )}

        <button 
          onClick={() => handleStart(currentLevelProgress)}
          className="relative overflow-hidden group bg-white border-2 border-green-500 rounded-2xl p-4 flex items-center justify-between hover:bg-green-50 transition-colors active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Play size={20} className="ml-1" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-800">{hasInProgressGame ? "重新开始本关" : "开始闯关"}</h2>
              <p className="text-xs text-gray-500">当前进度：第 {currentLevelProgress} 关 (共999关)</p>
            </div>
          </div>
        </button>

        <button 
          onClick={handleResetProgress}
          className="relative overflow-hidden group bg-white border-2 border-red-200 rounded-2xl p-4 flex items-center justify-between hover:bg-red-50 transition-colors active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
              <RotateCcw size={20} />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-red-600">重置进度</h2>
              <p className="text-xs text-red-400">清除所有关卡记录和收集</p>
            </div>
          </div>
        </button>
      </div>

      {showConfirm && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white/50 flex flex-col items-center text-center animate-in zoom-in-95 duration-300 max-w-[85vw] w-80">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6 shadow-inner">
              <RotateCcw size={32} />
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-2">重置所有进度？</h2>
            <p className="text-gray-500 text-sm mb-8 font-medium">此操作不可撤销，所有关卡和资产将被清空。</p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
              >
                取消
              </button>
              <button 
                onClick={confirmReset}
                className="flex-1 bg-red-500 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 active:scale-95 transition-all"
              >
                确定重置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
