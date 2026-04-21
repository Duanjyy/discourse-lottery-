import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TopicConfig, ColumnCount } from '../types';
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
        "flex flex-col p-4 rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow break-inside-avoid h-fit",
        isDragging && "opacity-60 shadow-lg scale-[1.02] z-10 relative border-teal-400 bg-teal-50/50"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1 -ml-1 transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
        <label className="flex items-center flex-1 gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={topic.enabled}
            onChange={handleToggle}
            className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
          />
          <span className={clsx("text-sm font-bold transition-colors", topic.enabled ? "text-slate-700" : "text-slate-400")}>
            {topic.name}
          </span>
        </label>
      </div>

      {topic.enabled && store.isGrouped && (
        <div className="pl-9 pt-3 mt-3 border-t border-slate-100 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">列数</span>
            <div className="relative">
              <select
                value={topic.columns}
                onChange={(e) => store.updateTopic(topic.id, { columns: (e.target.value === 'auto' ? 'auto' : Number(e.target.value)) as ColumnCount })}
                className="border border-slate-200 rounded-md py-1 pl-2 pr-6 text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none bg-white"
              >
                <option value="auto">自动</option>
                <option value="1">1列</option>
                <option value="2">2列</option>
                <option value="3">3列</option>
                <option value="4">4列</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
                <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">题数</span>
            <div className="relative">
              <select
                value={topic.count}
                onChange={(e) => store.updateTopic(topic.id, { count: e.target.value === 'auto' ? 'auto' : Number(e.target.value) })}
                className="border border-slate-200 rounded-md py-1 pl-2 pr-6 text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none bg-white"
              >
                <option value="auto">平分</option>
                <option value="5">5道</option>
                <option value="10">10道</option>
                <option value="15">15道</option>
                <option value="20">20道</option>
                <option value="30">30道</option>
                <option value="50">50道</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
                <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
