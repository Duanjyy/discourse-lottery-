import React from 'react';
import { Download, Trash2, Github } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

interface HeaderProps {
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onExport }) => {
  const { resetData } = useResumeStore();

  const handleReset = () => {
    if (window.confirm('确定要清空所有简历数据吗？此操作不可恢复。')) {
      resetData();
    }
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
          R
        </div>
        <h1 className="font-bold text-xl text-zinc-800">极简简历生成器</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={18} />
          <span>清空数据</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Download size={18} />
          <span>导出 PDF</span>
        </button>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 text-zinc-400 hover:text-zinc-800 transition-colors"
        >
          <Github size={24} />
        </a>
      </div>
    </header>
  );
};
