import { useAppStore } from '../store';
import { DraggableTopicList } from './DraggableTopicList';
import { generateProblems } from '../utils/generate';
import { Difficulty, AppState } from '../types';
import { Settings2, Layers, Type, BookOpen } from 'lucide-react';

export const Sidebar = () => {
  const store = useAppStore();

  const handleGenerate = () => {
    const problems = generateProblems(store);
    store.setProblems(problems);
  };

  return (
    <div className="w-full bg-white h-screen overflow-y-auto border-r border-slate-200 flex flex-col custom-scrollbar relative">
      <div className="p-6 sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-teal-600 text-white p-2 rounded-lg">
            <BookOpen size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">语文练习题</h1>
        </div>
        <p className="text-xs text-slate-500 font-medium pl-11">个性化试卷生成工具</p>
      </div>

      <div className="flex-1 p-6 space-y-8 pb-32">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-700">
            <Settings2 size={18} className="text-teal-600" />
            <h2 className="text-sm font-bold tracking-wide">基础设置</h2>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 space-y-5 border border-slate-100">
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">选择年级</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((g) => (
                  <button
                    key={g}
                    onClick={() => store.setGrade(g as 1|2|3|4|5|6)}
                    className={`py-2 text-sm rounded-lg font-medium transition-all duration-200 ${store.grade === g ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600 hover:shadow-sm'}`}
                  >
                    {g}年级
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">难度层级</label>
              <div className="flex gap-2">
                {[
                  { id: 'basic', label: '基础' },
                  { id: 'intermediate', label: '提升' },
                  { id: 'advanced', label: '拓展' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => store.setDifficulty(d.id as Difficulty)}
                    className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${store.difficulty === d.id ? 'bg-slate-800 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700">
              <Layers size={18} className="text-teal-600" />
              <h2 className="text-sm font-bold tracking-wide">题型配置</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 hover:bg-slate-100 transition-colors">
              <span className="text-xs font-medium text-slate-600">显示分类标题</span>
              <input 
                type="checkbox" 
                checked={store.isGrouped} 
                onChange={(e) => store.setIsGrouped(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
            </label>
          </div>
          
          <DraggableTopicList />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-700">
            <Type size={18} className="text-teal-600" />
            <h2 className="text-sm font-bold tracking-wide">排版参数</h2>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 space-y-5 border border-slate-100">
            <div className="space-y-3">
              <label className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>总题数</span>
                <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{store.totalCount} 道</span>
              </label>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="10"
                value={store.totalCount}
                onChange={(e) => store.setTotalCount(Number(e.target.value))}
                className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <label className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>行间距微调</span>
                <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{store.lineSpacing} px</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={store.lineSpacing}
                onChange={(e) => store.setLineSpacing(Number(e.target.value))}
                className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">留白辅助线</label>
              <div className="relative">
                <select 
                  value={store.guideline}
                  onChange={(e) => store.setGuideline(e.target.value as AppState['guideline'])}
                  className="w-full p-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none shadow-sm"
                >
                  <option value="none">无辅助线</option>
                  <option value="underline">下划横线</option>
                  <option value="tianzige">田字格</option>
                  <option value="pinyin">四线三格</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">答案模式</label>
              <div className="relative">
                <select 
                  value={store.answerMode}
                  onChange={(e) => store.setAnswerMode(e.target.value as AppState['answerMode'])}
                  className="w-full p-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none shadow-sm"
                >
                  <option value="none">不附答案</option>
                  <option value="inline">附在题后标红</option>
                  <option value="separate">答案单独附后</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <label className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-400 transition-colors shadow-sm">
              <span className="text-sm font-medium text-slate-700">全局连续题号</span>
              <input 
                type="checkbox" 
                checked={store.showNumber}
                onChange={(e) => store.setShowNumber(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-white/0 pt-12 z-20">
        <button 
          onClick={handleGenerate}
          className="w-full py-3.5 bg-slate-900 hover:bg-teal-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          一键生成试卷
        </button>
      </div>
    </div>
  );
};
