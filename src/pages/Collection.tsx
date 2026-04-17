import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Lock } from 'lucide-react';

const ALL_SKINS = [
  { id: 'default', name: '经典原味', cost: 0, color: 'bg-[#9c755c]' },
  { id: 'ocean', name: '深海湛蓝', cost: 100, color: 'bg-blue-500' },
  { id: 'forest', name: '森之气息', cost: 200, color: 'bg-emerald-500' },
  { id: 'sunset', name: '落日余晖', cost: 300, color: 'bg-rose-400' },
];

export default function Collection() {
  const navigate = useNavigate();
  const { 
    fragments, points, unlockedSkins, normalCleared, hardCleared, eliteCleared
  } = useGameStore();

  const totalCleared = normalCleared + hardCleared + eliteCleared;

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center p-6 text-gray-800 font-sans">
      <header className="w-full max-w-md flex items-center mb-8 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute left-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="w-full text-center text-xl font-bold">图鉴与成就</h1>
      </header>

      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Stats */}
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">我的资产</h2>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-amber-500 mb-1">{fragments}</span>
              <span className="text-xs text-gray-500 font-medium">碎片</span>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-blue-500 mb-1">{points}</span>
              <span className="text-xs text-gray-500 font-medium">积分</span>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">闯关成就</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">累计通关</span>
                <span className="text-xs text-gray-500">所有难度通关总和</span>
              </div>
              <span className="text-lg font-black text-purple-500">{totalCleared} 次</span>
            </div>
            <div className="w-full h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">普通通关</span>
              </div>
              <span className="text-lg font-bold text-gray-600">{normalCleared} 次</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">困难通关</span>
              </div>
              <span className="text-lg font-bold text-gray-600">{hardCleared} 次</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">精英通关</span>
              </div>
              <span className="text-lg font-bold text-gray-600">{eliteCleared} 次</span>
            </div>
          </div>
        </section>

        {/* Skins */}
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">皮肤展示 (积分兑换)</h2>
          <div className="grid grid-cols-2 gap-4">
            {ALL_SKINS.map((skin) => {
              const isUnlocked = unlockedSkins.includes(skin.id);
              return (
                <div 
                  key={skin.id}
                  className={`border-2 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all ${
                    isUnlocked ? 'border-gray-200 bg-gray-50' : 'border-gray-100 bg-white opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg shadow-inner ${skin.color} flex items-center justify-center`}>
                    {!isUnlocked && <Lock size={16} className="text-white/70" />}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm text-gray-800">{skin.name}</div>
                    {!isUnlocked ? (
                      <div className="text-xs font-bold text-blue-500 mt-1">{skin.cost} 积分</div>
                    ) : (
                      <div className="text-xs font-bold text-green-500 mt-1">已解锁</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
