import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playPop: () => void;
  playWin: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Simple base64 sounds to avoid external dependencies for a standalone app
// Real implementation would use actual sound files
const CLICK_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAB/f39/";
const POP_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAB/f39/";
const WIN_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAB/f39/";

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('xiaolegexiao-muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [bgm] = useState(() => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_732a3fc267.mp3?filename=casual-game-track-104595.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  const [clickAudio] = useState(() => new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_24b40dc079.mp3?filename=click-button-140881.mp3'));
  const [popAudio] = useState(() => new Audio('https://cdn.pixabay.com/download/audio/2021/08/09/audio_6b24baeb5f.mp3?filename=pop-39222.mp3'));
  const [winAudio] = useState(() => new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3'));

  useEffect(() => {
    localStorage.setItem('xiaolegexiao-muted', JSON.stringify(isMuted));
    if (isMuted) {
      bgm.pause();
    } else {
      // Browsers require user interaction before playing audio
      const playBgm = () => {
        bgm.play().catch(e => console.log("BGM play failed, waiting for user interaction", e));
        document.removeEventListener('click', playBgm);
      };
      document.addEventListener('click', playBgm);
      bgm.play().catch(() => {}); // Try to play immediately if possible
      
      return () => document.removeEventListener('click', playBgm);
    }
  }, [isMuted, bgm]);

  const toggleMute = () => setIsMuted(!isMuted);

  const playSound = (audio: HTMLAudioElement) => {
    if (isMuted) return;
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play failed", e));
  };

  const playClick = () => playSound(clickAudio);
  const playPop = () => playSound(popAudio);
  const playWin = () => playSound(winAudio);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playClick, playPop, playWin }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
