import { useAppStore } from '../store';
import { DraggableTopicList } from './DraggableTopicList';
import { generateProblems } from '../utils/generate';

export const Sidebar = () => {
  const store = useAppStore();

  const handleGenerate = () => {
    const problems = generateProblems(store);
    store.setProblems(problems);
  };

  return (
    <div className="w-80 bg-zinc-50 h-screen overflow-y-auto border-r border-zinc-200 p-6 flex flex-col gap-8 custom-scrollbar">
      <div>
        <h1 className="text-xl font-bold text-zinc-800 mb-2">语文练习题生成器</h1>
        <p className="text-sm text-zinc-500">定制您的专属练习卷</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">基础设置</h2>
        
        <div className="space-y-2">
          <label className="text-sm text-zinc-600 block">选择年级</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <button
                key={g}
                onClick={() => store.setGrade(g as 1|2|3|4|5|6)}
                className={`py-1.5 text-sm rounded-md transition-colors ${store.grade === g ? 'bg-emerald-600 text-white' : 'bg-white border border-zinc-200 text-zinc-700 hover:border-emerald-500'}`}
              >
                {g}年级
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-600 block">难度层级</label>
          <div className="flex gap-2">
            {[
              { id: 'basic', label: '基础' },
              { id: 'intermediate', label: '提升' },
              { id: 'advanced', label: '拓展' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => store.setDifficulty(d.id as any)}
                className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${store.difficulty === d.id ? 'bg-emerald-600 text-white' : 'bg-white border border-zinc-200 text-zinc-700 hover:border-emerald-500'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">题型配置</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-zinc-500">显示分类标题</span>
            <input 
              type="checkbox" 
              checked={store.isGrouped} 
              onChange={(e) => store.setIsGrouped(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
          </label>
        </div>
        
        <DraggableTopicList />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">排版参数</h2>
        
        <div className="space-y-2">
          <label className="flex justify-between text-sm text-zinc-600">
            <span>总题数</span>
            <span className="font-medium text-emerald-600">{store.totalCount} 道</span>
          </label>
          <input 
            type="range" 
            min="10" 
            max="200" 
            step="10"
            value={store.totalCount}
            onChange={(e) => store.setTotalCount(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm text-zinc-600">
            <span>行间距微调</span>
            <span className="font-medium text-emerald-600">{store.lineSpacing} px</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={store.lineSpacing}
            onChange={(e) => store.setLineSpacing(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-600 block">留白辅助线</label>
          <select 
            value={store.guideline}
            onChange={(e) => store.setGuideline(e.target.value as any)}
            className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="none">无辅助线</option>
            <option value="underline">下划横线</option>
            <option value="tianzige">田字格</option>
            <option value="pinyin">四线三格</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-zinc-600">全局连续题号</label>
          <input 
            type="checkbox" 
            checked={store.showNumber}
            onChange={(e) => store.setShowNumber(e.target.checked)}
            className="rounded text-emerald-600 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-600 block">答案模式</label>
          <select 
            value={store.answerMode}
            onChange={(e) => store.setAnswerMode(e.target.value as any)}
            className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="none">不附答案</option>
            <option value="inline">附在题后标红</option>
            <option value="separate">单独附后</option>
          </select>
        </div>
      </div>

      <div className="sticky bottom-0 pt-4 pb-2 bg-zinc-50 border-t border-zinc-200 mt-auto">
        <button 
          onClick={handleGenerate}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-all active:scale-[0.98]"
        >
          一键生成试卷
        </button>
      </div>
    </div>
  );
};
