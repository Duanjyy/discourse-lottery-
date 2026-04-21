import { useState } from 'react';
import { useAppStore } from '../store';
import { DraggableTopicList } from './DraggableTopicList';
import { generateProblems } from '../utils/generate';
import { Difficulty, AppState } from '../types';
import { Settings2, Layers, Type, BookOpen, ChevronDown, Sparkles, SlidersHorizontal, Settings } from 'lucide-react';
import clsx from 'clsx';

export const SettingsPanel = () => {
  const store = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'layout'>('topics');

  const handleGenerate = () => {
    const problems = generateProblems(store);
    store.setProblems(problems);
    setIsExpanded(false); // Auto close on generate
  };

  return (
    <div className="w-full bg-white relative">
      {/* Top Header Bar */}
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 text-white p-2 rounded-lg shadow-sm">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">语文练习卷生成器</h1>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">小学1-6年级专项练习</p>
          </div>
        </div>

        {/* Quick Controls in Header */}
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <button
                key={g}
                onClick={() => store.setGrade(g as 1|2|3|4|5|6)}
                className={clsx(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                  store.grade === g ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-800"
                )}
              >
                {g}年级
              </button>
            ))}
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg">
            {[
              { id: 'basic', label: '基础' },
              { id: 'intermediate', label: '提升' },
              { id: 'advanced', label: '拓展' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => store.setDifficulty(d.id as Difficulty)}
                className={clsx(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  store.difficulty === d.id ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-slate-200"></div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border",
              isExpanded 
                ? "bg-slate-100 text-slate-800 border-slate-200" 
                : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700 shadow-sm"
            )}
          >
            <Settings2 size={16} />
            <span>高级配置</span>
            <ChevronDown size={16} className={clsx("transition-transform duration-300", isExpanded ? "rotate-0" : "rotate-180")} />
          </button>

          <button 
            onClick={handleGenerate}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-lg shadow-md shadow-teal-600/20 transition-all active:scale-[0.98]"
          >
            <Sparkles size={16} />
            一键生成试卷
          </button>
        </div>
      </div>

      {/* Expandable Settings Panel - Slides up from bottom */}
      <div className={clsx(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out z-50",
        isExpanded ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="max-w-6xl mx-auto flex h-[500px]">
          
          {/* Tabs */}
          <div className="w-48 bg-slate-50 border-r border-slate-200 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('topics')}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                activeTab === 'topics' ? "bg-white text-teal-700 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Layers size={18} />
              题型选择与排序
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                activeTab === 'layout' ? "bg-white text-teal-700 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <SlidersHorizontal size={18} />
              排版与样式参数
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-white">
            {activeTab === 'topics' && (
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">题型配置</h2>
                    <p className="text-sm text-slate-500 mt-1">勾选需要的题型，拖拽可改变试卷上的顺序。</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-medium text-slate-700">在试卷中显示大题标题</span>
                    <input 
                      type="checkbox" 
                      checked={store.isGrouped} 
                      onChange={(e) => store.setIsGrouped(e.target.checked)}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                    />
                  </label>
                </div>
                
                <div className="w-full">
                  <DraggableTopicList />
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="max-w-3xl space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">排版参数</h2>
                  <p className="text-sm text-slate-500 mt-1">调整试卷的细节表现，实时生效。</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="flex justify-between text-sm font-bold text-slate-700">
                        <span className="flex items-center gap-2"><Type size={16} className="text-teal-600"/> 题目总数</span>
                        <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{store.totalCount} 道</span>
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="200" 
                        step="10"
                        value={store.totalCount}
                        onChange={(e) => store.setTotalCount(Number(e.target.value))}
                        className="w-full accent-teal-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <p className="text-xs text-slate-500">如果勾选了特定题型的固定题数，总题数可能会被自动撑大。</p>
                    </div>

                    <div className="space-y-4">
                      <label className="flex justify-between text-sm font-bold text-slate-700">
                        <span className="flex items-center gap-2"><Settings size={16} className="text-teal-600"/> 行间距微调</span>
                        <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{store.lineSpacing} px</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        value={store.lineSpacing}
                        onChange={(e) => store.setLineSpacing(Number(e.target.value))}
                        className="w-full accent-teal-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <label className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-teal-400 transition-colors shadow-sm">
                      <div>
                        <span className="text-sm font-bold text-slate-800 block">全局连续题号</span>
                        <span className="text-xs text-slate-500 mt-0.5 block">开启后，跨大题也会连续编号 (1, 2, 3...)</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={store.showNumber}
                        onChange={(e) => store.setShowNumber(e.target.checked)}
                        className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                      />
                    </label>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 block">留白辅助线样式</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'none', label: '无辅助线' },
                          { id: 'underline', label: '下划横线' },
                          { id: 'tianzige', label: '田字格' },
                          { id: 'pinyin', label: '四线三格' },
                        ].map((g) => (
                          <button
                            key={g.id}
                            onClick={() => store.setGuideline(g.id as AppState['guideline'])}
                            className={clsx(
                              "py-3 px-4 text-sm font-medium rounded-xl border text-left transition-all",
                              store.guideline === g.id 
                                ? "bg-teal-50 border-teal-500 text-teal-800 shadow-[0_0_0_1px_rgba(20,184,166,1)]" 
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 block">答案呈现模式</label>
                      <div className="grid gap-3">
                        {[
                          { id: 'none', label: '不附答案', desc: '纯净的练习卷' },
                          { id: 'inline', label: '附在题后标红', desc: '适合教师讲义或家长批改对照' },
                          { id: 'separate', label: '答案单独附后', desc: '单独成页，方便学生自测后核对' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => store.setAnswerMode(m.id as AppState['answerMode'])}
                            className={clsx(
                              "p-4 rounded-xl border text-left transition-all flex flex-col",
                              store.answerMode === m.id 
                                ? "bg-slate-800 border-slate-800 text-white shadow-md" 
                                : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            <span className={clsx("text-sm font-bold", store.answerMode === m.id ? "text-white" : "text-slate-800")}>{m.label}</span>
                            <span className={clsx("text-xs mt-1", store.answerMode === m.id ? "text-slate-300" : "text-slate-500")}>{m.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};
