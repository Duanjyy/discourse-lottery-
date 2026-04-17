import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Card } from '../components/Card';
import { Slot } from '../components/Slot';
import { ArrowLeft, RefreshCw, Lightbulb, Search, PlusSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Game() {
  const navigate = useNavigate();
  const { 
    cards, slot, isGameOver, isWin, clickCard, props, useProp, resetGame, slotCapacity, getCoveredStatus, resetCount 
  } = useGameStore();

  const handleReset = () => {
    if (resetCount <= 0) {
      alert("本局重置次数已用完！");
      return;
    }
    const success = resetGame();
    if (!success) {
      alert("本局重置次数已用完！");
    }
  };

  const coveredStatus = useMemo(() => getCoveredStatus(), [cards, getCoveredStatus]);

  useEffect(() => {
    if (isWin) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isWin]);

  const idleCards = cards.filter(c => c.status === 'idle');

  // Compute board bounds to center the cards
  const boardWidth = 8 * 44;
  const boardHeight = 8 * 44;

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center select-none overflow-hidden relative font-sans">
      {/* Header */}
      <header className="w-full max-w-md p-4 flex items-center justify-between z-10">
        <button 
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95 transition-transform text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="font-bold text-gray-500">第 {useGameStore.getState().currentLevel} 关</div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95 transition-transform text-gray-700 relative"
          >
            <RefreshCw size={18} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
              {resetCount}
            </div>
          </button>
        </div>
      </header>

      {/* Board Area */}
      <main className="flex-1 w-full flex items-center justify-center relative z-0">
        <div 
          className="relative"
          style={{ width: boardWidth, height: boardHeight }}
        >
          {idleCards.map((card) => (
            <Card 
              key={card.id}
              card={card}
              isCovered={coveredStatus[card.id]}
              onClick={() => clickCard(card.id)}
            />
          ))}
        </div>
      </main>

      {/* Slot Area */}
      <div className="w-full max-w-md p-4 pb-8 flex flex-col items-center gap-6 z-10">
        <Slot cards={slot} capacity={slotCapacity} />
        
        {/* Props Area */}
        <div className="flex gap-4">
          <PropButton 
            icon={<Search size={22} />} 
            count={props.hint} 
            onClick={() => useProp('hint')} 
            label="提示"
          />
          <PropButton 
            icon={<ArrowLeft size={22} />} 
            count={props.remove} 
            onClick={() => useProp('remove')} 
            label="移除"
            className="-rotate-90"
          />
          <PropButton 
            icon={<RefreshCw size={22} />} 
            count={props.shuffle} 
            onClick={() => useProp('shuffle')} 
            label="洗牌"
          />
          <PropButton 
            icon={<PlusSquare size={22} />} 
            count={props.expand} 
            onClick={() => useProp('expand')} 
            label="扩容"
          />
        </div>
      </div>

      {/* Overlays */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="text-6xl mb-4">🥲</div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">闯关失败</h2>
            <p className="text-gray-500 mb-8">卡槽已满，再试一次吧！</p>
            <button 
              onClick={handleReset}
              className="bg-green-500 text-white px-8 py-3 rounded-full font-bold text-lg w-full shadow-lg shadow-green-500/30 hover:bg-green-600 active:scale-95 transition-all"
            >
              重新开始 ({resetCount}次)
            </button>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 text-gray-400 font-medium hover:text-gray-600"
            >
              返回首页
            </button>
          </div>
        </div>
      )}

      {isWin && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">第 {useGameStore.getState().currentLevel} 关 通关成功！</h2>
            <p className="text-gray-500 mb-8">恭喜你清空了所有卡牌</p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-full font-bold shadow-sm hover:bg-gray-300 active:scale-95 transition-all"
              >
                返回首页
              </button>
              <button 
                onClick={() => {
                  const nextLevel = useGameStore.getState().currentLevel + 1;
                  if (nextLevel > 50) {
                    alert("恭喜你，已经通关所有50关！");
                    navigate('/');
                  } else {
                    useGameStore.getState().initGame(nextLevel);
                  }
                }}
                className="flex-1 bg-amber-500 text-white px-4 py-3 rounded-full font-bold shadow-lg shadow-amber-500/30 hover:bg-amber-600 active:scale-95 transition-all"
              >
                下一关
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PropButton({ icon, count, onClick, label, className }: { icon: React.ReactNode, count: number, onClick: () => void, label: string, className?: string }) {
  const disabled = count <= 0;
  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        disabled={disabled}
        onClick={onClick}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center relative border-b-4 transition-all active:scale-95 active:border-b-0 active:translate-y-1
          ${disabled 
            ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' 
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
      >
        <div className={className}>{icon}</div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-[#f3f4f6]
          ${disabled ? 'bg-gray-400' : 'bg-red-500'}`}
        >
          {count}
        </div>
      </button>
      <span className="text-xs font-medium text-gray-500">{label}</span>
    </div>
  );
}
