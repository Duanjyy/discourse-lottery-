import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TopicConfig } from '../types';
import { useAppStore } from '../store';
import { GripVertical } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  topic: TopicConfig;
}

export const SortableTopicItem = ({ topic }: Props) => {
  const store = useAppStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggle = () => {
    store.updateTopic(topic.id, { enabled: !topic.enabled });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "flex flex-col p-3 rounded-lg border border-zinc-200 bg-white shadow-sm transition-all",
        isDragging && "opacity-50 shadow-md scale-105 z-10 relative"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          className="text-zinc-400 hover:text-zinc-600 cursor-grab active:cursor-grabbing p-1 -ml-1"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
        <label className="flex items-center flex-1 gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={topic.enabled}
            onChange={handleToggle}
            className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <span className={clsx("text-sm font-medium transition-colors", topic.enabled ? "text-zinc-800" : "text-zinc-400")}>
            {topic.name}
          </span>
        </label>
      </div>

      {topic.enabled && store.isGrouped && (
        <div className="pl-8 pt-2 mt-2 border-t border-zinc-100 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">列数</span>
            <select
              value={topic.columns}
              onChange={(e) => store.updateTopic(topic.id, { columns: e.target.value as any })}
              className="border border-zinc-200 rounded p-1 text-zinc-700 outline-none focus:border-emerald-500"
            >
              <option value="auto">自动</option>
              <option value="1">1列</option>
              <option value="2">2列</option>
              <option value="3">3列</option>
              <option value="4">4列</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">题数</span>
            <select
              value={topic.count}
              onChange={(e) => store.updateTopic(topic.id, { count: e.target.value === 'auto' ? 'auto' : Number(e.target.value) })}
              className="border border-zinc-200 rounded p-1 text-zinc-700 outline-none focus:border-emerald-500"
            >
              <option value="auto">平分</option>
              <option value="5">5道</option>
              <option value="10">10道</option>
              <option value="15">15道</option>
              <option value="20">20道</option>
              <option value="30">30道</option>
              <option value="50">50道</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
