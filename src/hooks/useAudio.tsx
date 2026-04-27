import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useSound from 'use-sound';
import { Howler } from 'howler';
import { createAudioLifecycleManager } from '../utils/audio-lifecycle';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playPop: () => void;
  playWin: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Using local audio files
const BGM_URL = './sounds/bgm.mp3';
const CLICK_URL = './sounds/click.mp3';
const POP_URL = './sounds/pop.mp3';
const WIN_URL = './sounds/win.mp3';

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('xiaolegexiao-muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [playBgm, { stop: stopBgm, pause: pauseBgm, sound: bgmSound }] = useSound(BGM_URL, { 
    loop: true, 
    volume: isMuted ? 0 : 0.3 
  });
  
  const [playClickSound] = useSound(CLICK_URL, { volume: isMuted ? 0 : 0.6 });
  const [playPopSound] = useSound(POP_URL, { volume: isMuted ? 0 : 0.8 });
  const [playWinSound] = useSound(WIN_URL, { volume: isMuted ? 0 : 0.7 });

  const [hasInteracted, setHasInteracted] = useState(false);

  // Setup Audio Lifecycle
  useEffect(() => {
    const mgr = createAudioLifecycleManager({
      getExistingAudioContext: () => Howler.ctx,
      onPlayError: (key, err) => console.warn(`Audio Lifecycle resume failed for [${key}]:`, err)
    });

    mgr.trackCustom('bgm', {
      isPlaying: () => bgmSound ? bgmSound.playing() : false,
      pause: () => {
        if (bgmSound) bgmSound.pause();
      },
      resume: () => {
        if (bgmSound && !isMuted) bgmSound.play();
      }
    });

    mgr.attach();

    return () => {
      mgr.detach();
    };
  }, [bgmSound, isMuted]);

  useEffect(() => {
    localStorage.setItem('xiaolegexiao-muted', JSON.stringify(isMuted));
    if (!isMuted && hasInteracted) {
      playBgm();
    } else {
      pauseBgm();
    }
  }, [isMuted, hasInteracted, playBgm, pauseBgm]);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);
  const playClick = () => !isMuted && playClickSound();
  const playPop = () => !isMuted && playPopSound();
  const playWin = () => !isMuted && playWinSound();

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
