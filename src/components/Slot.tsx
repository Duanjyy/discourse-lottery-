import React from 'react';
import { CardData } from '../store/gameStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SlotProps {
  cards: CardData[];
  capacity: number;
}

export const Slot: React.FC<SlotProps> = ({ cards, capacity }) => {
  const totalSlots = Math.max(capacity, cards.length);
  return (
    <div className="bg-[#9c755c] p-2 rounded-xl border-4 border-[#6e4e37] flex items-center justify-start gap-1 overflow-x-auto min-w-[320px] max-w-[95vw]">
      {Array.from({ length: totalSlots }).map((_, index) => {
        const card = cards[index];
        return (
          <div 
            key={card ? card.id : `empty-${index}`}
            className="w-11 h-11 bg-[#7b583f] rounded-lg shadow-inner flex-shrink-0 flex items-center justify-center border-t-2 border-[#5c402d]"
          >
            {card && (
              <div className={cn(
                "w-11 h-11 bg-white rounded-lg shadow-md border-b-4 border-gray-200 flex items-center justify-center text-2xl",
                card.isEliminating ? "animate-pop pointer-events-none" : "animate-zoom-in"
              )}>
                {card.type}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
