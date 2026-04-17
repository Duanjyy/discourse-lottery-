import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CardData } from '../store/gameStore';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  card: CardData;
  isCovered: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ card, isCovered, onClick, style, className }) => {
  // Card base size 44px for a compact board
  const size = 44;
  const left = card.x * size;
  const top = card.y * size - card.layer * 5;
  const zIndex = card.layer * 10;

  return (
    <div
      onClick={isCovered ? undefined : onClick}
      className={cn(
        "absolute w-11 h-11 rounded-lg shadow-md border-b-4 flex items-center justify-center text-2xl transition-all duration-200 select-none",
        isCovered 
          ? "bg-gray-200 border-gray-300 cursor-not-allowed" 
          : "bg-white border-gray-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-95",
        className
      )}
      style={{
        left: style?.left ?? `${left}px`,
        top: style?.top ?? `${top}px`,
        zIndex: style?.zIndex ?? zIndex,
        ...style
      }}
    >
      <div className={cn("transition-opacity", isCovered && "opacity-50 grayscale")}>
        {card.type}
      </div>
      {isCovered && (
        <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none" />
      )}
    </div>
  );
};
