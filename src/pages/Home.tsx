import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Trophy, Play, Star, BookOpen } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { initGame, normalCleared, hardCleared, eliteCleared, fragments, points } = useGameStore();

  const handleStart = (level: number) => {
    initGame(level);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center p-6 text-gray-800 font-sans">
      <div className="mt-12 mb-8 text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 drop-shadow-sm mb-2 tracking-wider">
          消了个消
        </h1>
        <p className="text-gray-500 text-sm">极致简约的消除挑战</p>
      </div>

      <div className="flex gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm w-full max-w-sm justify-around">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-amber-500">{fragments}</span>
          <span className="text-xs text-gray-400">碎片</span>
        </div>
        <div className="w-px bg-gray-200" />
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-blue-500">{points}</span>
          <span className="text-xs text-gray-400">积分</span>
        </div>
        <div className="w-px bg-gray-200" />
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-purple-500">
            {normalCleared + hardCleared + eliteCleared}
          </span>
          <span className="text-xs text-gray-400">通关数</span>
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <button 
          onClick={() => handleStart(1)}
          className="relative overflow-hidden group bg-white border-2 border-green-500 rounded-2xl p-4 flex items-center justify-between hover:bg-green-50 transition-colors active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Play size={20} className="ml-1" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-800">普通关卡</h2>
              <p className="text-xs text-gray-500">适合新手入门，轻松消除</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => handleStart(2)}
          disabled={normalCleared < 10}
          className="relative overflow-hidden group bg-white border-2 border-amber-500 rounded-2xl p-4 flex items-center justify-between hover:bg-amber-50 transition-colors active:scale-95 disabled:opacity-60 disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Star size={20} />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-800">困难关卡</h2>
              <p className="text-xs text-gray-500">需通关10次普通关卡解锁</p>
            </div>
          </div>
          {normalCleared < 10 && (
            <div className="text-xs font-bold text-gray-400">{normalCleared}/10</div>
          )}
        </button>

        <button 
          onClick={() => handleStart(3)}
          disabled={normalCleared < 20}
          className="relative overflow-hidden group bg-white border-2 border-purple-500 rounded-2xl p-4 flex items-center justify-between hover:bg-purple-50 transition-colors active:scale-95 disabled:opacity-60 disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Trophy size={20} />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-800">精英关卡</h2>
              <p className="text-xs text-gray-500">需通关20次普通关卡解锁</p>
            </div>
          </div>
          {normalCleared < 20 && (
            <div className="text-xs font-bold text-gray-400">{normalCleared}/20</div>
          )}
        </button>
      </div>

      <button 
        onClick={() => navigate('/collection')}
        className="mt-8 w-full max-w-sm bg-gray-800 text-white rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-gray-700 active:scale-95 transition-all font-bold"
      >
        <BookOpen size={20} />
        查看图鉴与成就
      </button>
    </div>
  );
}
