import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  onRemove: (id: string) => void;
  title: string;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  children,
  onRemove,
  title,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-zinc-200 rounded-lg shadow-sm mb-4 overflow-hidden relative group"
    >
      <div className="flex items-center justify-between bg-zinc-50 border-b border-zinc-200 px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="text-zinc-400 hover:text-zinc-700 cursor-grab active:cursor-grabbing p-1 -ml-2"
          >
            <GripVertical size={16} />
          </button>
          <span className="font-medium text-sm text-zinc-700 truncate max-w-[200px]">
            {title || '新项'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="text-zinc-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
};
