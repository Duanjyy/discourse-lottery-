import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CardData {
  id: string;
  type: string;
  layer: number;
  x: number;
  y: number;
  status: 'idle' | 'in-slot' | 'eliminated';
  isEliminating?: boolean;
}

interface Pos {
  layer: number;
  x: number;
  y: number;
}

const getPyramidPositions = (maxLayer: number) => {
  const pos: Pos[] = [];
  const layers = [
    { l: 0, min: 0, max: 7, step: 1 },
    { l: 1, min: 0.5, max: 6.5, step: 1 },
    { l: 2, min: 1, max: 6, step: 1 },
    { l: 3, min: 1.5, max: 5.5, step: 1 },
    { l: 4, min: 2, max: 5, step: 1 },
    { l: 5, min: 2.5, max: 4.5, step: 1 },
    { l: 6, min: 3, max: 4, step: 1 },
    { l: 7, min: 3.5, max: 3.5, step: 1 },
  ];
  for (const layer of layers) {
    if (layer.l > maxLayer) continue;
    for (let x = layer.min; x <= layer.max; x += layer.step) {
      for (let y = layer.min; y <= layer.max; y += layer.step) {
        pos.push({ layer: layer.l, x, y });
      }
    }
  }
  return pos;
};

const TYPES = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍑', '🍒', '🍍', '🥝', '🥑', '🌽', '🥕', '🥦', '🍄', '🍔', '🍟', '🍕', '🌭'];

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export interface GameState {
  currentLevel: number;
  cards: CardData[];
  slot: CardData[];
  isGameOver: boolean;
  isWin: boolean;
  
  props: {
    remove: number;
    hint: number;
    shuffle: number;
    expand: number;
  };
  slotCapacity: number;

  normalCleared: number;
  hardCleared: number;
  eliteCleared: number;
  fragments: number;
  points: number;
  unlockedPatterns: string[];
  unlockedSkins: string[];
  resetCount: number;

  initGame: (level: number, keepResetCount?: boolean) => void;
  clickCard: (id: string) => void;
  useProp: (propType: 'remove' | 'hint' | 'shuffle' | 'expand') => void;
  resetGame: () => boolean;
  getCoveredStatus: () => Record<string, boolean>;
  removeEliminatedFromSlot: (type: string) => void;
  checkWinLose: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentLevel: 1,
      cards: [],
      slot: [],
      isGameOver: false,
      isWin: false,
      
      props: {
        remove: 1,
        hint: 2,
        shuffle: 1,
        expand: 1,
      },
      slotCapacity: 7,

      normalCleared: 0,
      hardCleared: 0,
      eliteCleared: 0,
      fragments: 0,
      points: 0,
      unlockedPatterns: ['🍎'],
      unlockedSkins: ['default'],
      resetCount: 3,

      initGame: (level: number, keepResetCount: boolean = false) => {
        let numCards = 30;
        let maxLayer = 2;
        let typesCount = 5;
        let slotCapacity = 7;

        if (level === 2) {
          numCards = 90;
          maxLayer = 4;
          typesCount = 10;
        } else if (level === 3) {
          numCards = 150;
          maxLayer = 7;
          typesCount = 15;
          slotCapacity = 6; // 精英关卡更难
        }

        const positions = shuffle(getPyramidPositions(maxLayer)).slice(0, numCards);
        const selectedTypes = shuffle(TYPES).slice(0, typesCount);
        
        const cardTypes: string[] = [];
        for (let i = 0; i < numCards / 3; i++) {
          const type = selectedTypes[i % selectedTypes.length];
          cardTypes.push(type, type, type);
        }
        
        const shuffledTypes = shuffle(cardTypes);
        
        const cards: CardData[] = positions.map((pos, index) => ({
          id: `card-${index}`,
          type: shuffledTypes[index],
          layer: pos.layer,
          x: pos.x,
          y: pos.y,
          status: 'idle',
        }));

        set((state) => ({
          currentLevel: level,
          cards,
          slot: [],
          isGameOver: false,
          isWin: false,
          slotCapacity,
          resetCount: keepResetCount ? state.resetCount : 3,
          props: {
            remove: 1,
            hint: 2,
            shuffle: 1,
            expand: 1,
          },
        }));
      },

      removeEliminatedFromSlot: (type: string) => {
        set((state) => {
          const newSlot = state.slot.filter(c => !(c.type === type && c.isEliminating));
          return { slot: newSlot };
        });
        get().checkWinLose();
      },

      checkWinLose: () => {
        set((state) => {
          if (state.isGameOver || state.isWin) return state;
          
          const activeSlot = state.slot.filter(c => !c.isEliminating);
          const remainingIdle = state.cards.filter(c => c.status === 'idle').length;
          const isWin = remainingIdle === 0 && state.slot.length === 0;
          const isGameOver = !isWin && activeSlot.length >= state.slotCapacity;

          if (isWin) {
            if (state.currentLevel === 1) return { isWin, normalCleared: state.normalCleared + 1, fragments: state.fragments + 10 };
            if (state.currentLevel === 2) return { isWin, hardCleared: state.hardCleared + 1, points: state.points + 20 };
            if (state.currentLevel === 3) return { isWin, eliteCleared: state.eliteCleared + 1, points: state.points + 50, fragments: state.fragments + 30 };
          }
          if (isGameOver) {
            return { isGameOver };
          }
          return state;
        });
      },

      getCoveredStatus: () => {
        const { cards } = get();
        const covered: Record<string, boolean> = {};
        const idleCards = cards.filter(c => c.status === 'idle');
        
        for (let i = 0; i < idleCards.length; i++) {
          const cardA = idleCards[i];
          covered[cardA.id] = false;
          for (let j = 0; j < idleCards.length; j++) {
            if (i === j) continue;
            const cardB = idleCards[j];
            if (cardB.layer > cardA.layer) {
              if (Math.abs(cardB.x - cardA.x) < 1 && Math.abs(cardB.y - cardA.y) < 1) {
                covered[cardA.id] = true;
                break;
              }
            }
          }
        }
        return covered;
      },

      clickCard: (id: string) => {
        const state = get();
        if (state.isGameOver || state.isWin) return;
        
        const coveredStatus = state.getCoveredStatus();
        if (coveredStatus[id]) return; // 被遮挡不能点击

        const card = state.cards.find(c => c.id === id);
        if (!card || card.status !== 'idle') return;

        const activeSlot = state.slot.filter(c => !c.isEliminating);
        if (activeSlot.length >= state.slotCapacity) return;

        // Move to slot
        const newCards = state.cards.map(c => c.id === id ? { ...c, status: 'in-slot' as const } : c);
        
        let newSlot = [...state.slot];
        const lastIndex = newSlot.map(c => c.type).lastIndexOf(card.type);
        if (lastIndex !== -1) {
          newSlot.splice(lastIndex + 1, 0, { ...card, status: 'in-slot' as const });
        } else {
          newSlot.push({ ...card, status: 'in-slot' as const });
        }
        
        // Check for matches
        const typeCount: Record<string, CardData[]> = {};
        newSlot.forEach(c => {
          if (!c.isEliminating) {
            if (!typeCount[c.type]) typeCount[c.type] = [];
            typeCount[c.type].push(c);
          }
        });

        let finalSlot = [...newSlot];
        let finalCards = [...newCards];

        for (const [type, group] of Object.entries(typeCount)) {
          if (group.length === 3) {
            finalSlot = finalSlot.map(c => c.type === type ? { ...c, isEliminating: true } : c);
            const idsToRemove = group.map(c => c.id);
            finalCards = finalCards.map(c => idsToRemove.includes(c.id) ? { ...c, status: 'eliminated' as const } : c);
            
            setTimeout(() => {
              get().removeEliminatedFromSlot(type);
            }, 300);
          }
        }

        set({
          cards: finalCards,
          slot: finalSlot,
        });

        get().checkWinLose();
      },

      useProp: (propType) => {
        const state = get();
        if (state.isGameOver || state.isWin || state.props[propType] <= 0) return;

        if (propType === 'remove') {
          const activeSlot = state.slot.filter(c => !c.isEliminating);
          if (activeSlot.length === 0) return;
          // Remove the first active card in slot
          const cardToRemove = activeSlot[0];
          const newSlot = state.slot.filter(c => c.id !== cardToRemove.id);
          const newCards = state.cards.map(c => c.id === cardToRemove.id ? { ...c, status: 'eliminated' as const } : c);
          set({
            slot: newSlot,
            cards: newCards,
            props: { ...state.props, remove: state.props.remove - 1 }
          });
          get().checkWinLose();
        } 
        else if (propType === 'shuffle') {
          // Shuffle all idle cards' positions
          const idleCards = state.cards.filter(c => c.status === 'idle');
          const positions = idleCards.map(c => ({ layer: c.layer, x: c.x, y: c.y }));
          const shuffledPositions = shuffle(positions);
          
          let posIndex = 0;
          const newCards = state.cards.map(c => {
            if (c.status === 'idle') {
              const p = shuffledPositions[posIndex++];
              return { ...c, layer: p.layer, x: p.x, y: p.y };
            }
            return c;
          });
          set({
            cards: newCards,
            props: { ...state.props, shuffle: state.props.shuffle - 1 }
          });
        }
        else if (propType === 'expand') {
          set({
            slotCapacity: state.slotCapacity + 1,
            props: { ...state.props, expand: state.props.expand - 1 }
          });
        }
        else if (propType === 'hint') {
          // Find a card that is clickable and matches something in slot, or find 3 clickable cards
          // For simplicity, we just won't implement a complex hint logic here. Let's make it simple: 
          // Find one clickable card and automatically click it.
          const coveredStatus = state.getCoveredStatus();
          const clickableCards = state.cards.filter(c => c.status === 'idle' && !coveredStatus[c.id]);
          if (clickableCards.length > 0) {
            // try to find one that matches something in the slot
            const slotTypes = state.slot.map(c => c.type);
            let target = clickableCards.find(c => slotTypes.includes(c.type));
            if (!target) target = clickableCards[0];
            
            set({ props: { ...state.props, hint: state.props.hint - 1 } });
            get().clickCard(target.id);
          }
        }
      },

      resetGame: () => {
        const state = get();
        if (state.resetCount <= 0) return false;
        
        set({ resetCount: state.resetCount - 1 });
        state.initGame(state.currentLevel, true);
        
        return true;
      }
    }),
    {
      name: 'xiaolegexiao-storage',
      partialize: (state) => ({
        normalCleared: state.normalCleared,
        hardCleared: state.hardCleared,
        eliteCleared: state.eliteCleared,
        fragments: state.fragments,
        points: state.points,
        unlockedPatterns: state.unlockedPatterns,
        unlockedSkins: state.unlockedSkins,
      }),
    }
  )
);
