import React from 'react';
import { Palette, LayoutTemplate } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

const THEME_COLORS = [
  { label: '经典蓝', value: '#2563eb' },
  { label: '商务灰', value: '#475569' },
  { label: '沉稳黑', value: '#18181b' },
  { label: '活力绿', value: '#059669' },
  { label: '优雅紫', value: '#7c3aed' },
  { label: '中国红', value: '#dc2626' },
];

const TEMPLATES = [
  { id: 'minimal', name: '极简风' },
  { id: 'business', name: '商务风' },
  { id: 'campus', name: '校园风' },
  { id: 'tech', name: '技术风' },
] as const;

export const SettingsPanel: React.FC = () => {
  const { resumeData, updateSettings } = useResumeStore();
  const { settings } = resumeData;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-5 mb-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <LayoutTemplate size={20} className="text-zinc-500" />
        <h2 className="font-semibold text-zinc-800">模板与样式</h2>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-700">选择模板</label>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => updateSettings({ template: tpl.id })}
              className={`py-2 px-3 rounded-md text-sm font-medium transition-colors border ${
                settings.template === tpl.id
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
          <Palette size={16} className="text-zinc-400" />
          主题颜色
        </label>
        <div className="flex flex-wrap gap-2">
          {THEME_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => updateSettings({ themeColor: color.value })}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-110 ${
                settings.themeColor === color.value ? 'border-zinc-400 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">正文字体大小</label>
          <select
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value })}
            className="px-3 py-2 border border-zinc-300 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="12px">小 (12px)</option>
            <option value="14px">中 (14px)</option>
            <option value="16px">大 (16px)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">行间距</label>
          <select
            value={settings.lineHeight}
            onChange={(e) => updateSettings({ lineHeight: e.target.value })}
            className="px-3 py-2 border border-zinc-300 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="1.2">紧凑 (1.2)</option>
            <option value="1.5">标准 (1.5)</option>
            <option value="1.8">宽松 (1.8)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
