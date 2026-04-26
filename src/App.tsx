import React, { useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import BottomBar from './components/BottomBar';
import GameOverModal from './components/GameOverModal';
import { useGameStore } from './store/gameStore';

function App() {
  const { initGame } = useGameStore();

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-900 text-zinc-100 flex flex-col font-sans overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full w-full max-w-4xl mx-auto p-2 sm:p-4">
        <h1 className="text-center text-xl sm:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500 mb-2 sm:mb-4 drop-shadow-sm select-none shrink-0">
          Minesweeper
        </h1>
        
        <div className="shrink-0 mb-2">
          <Header />
        </div>
        
        <div className="flex-1 flex justify-center items-center overflow-hidden touch-none relative min-h-0">
          <Board />
        </div>

        <div className="shrink-0 h-[60px] sm:h-[80px]"></div>
        <BottomBar />
        <GameOverModal />
      </div>
    </div>
  );
}

export default App;
