import { useAppStore } from '../store';
import { ProblemRenderer } from './ProblemRenderer';
import { TopicType } from '../types';
import { useMemo } from 'react';

const numberToChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六'];

export const Paper = () => {
  const store = useAppStore();
  const date = new Date().toLocaleDateString('zh-CN');

  // Group problems by topic if isGrouped is true
  const groupedProblems = useMemo(() => {
    if (!store.isGrouped) {
      return [{
        topicId: 'all',
        topicName: '',
        columns: 1,
        problems: store.problems
      }];
    }

    const groups: { topicId: string; topicName: string; columns: number | 'auto'; problems: any[] }[] = [];
    let currentTopicIndex = 0;

    store.topics.forEach(t => {
      const topicProblems = store.problems.filter(p => p.type === t.id);
      if (topicProblems.length > 0) {
        groups.push({
          topicId: t.id,
          topicName: `${numberToChinese[currentTopicIndex]}、${t.name}`,
          columns: t.columns,
          problems: topicProblems
        });
        currentTopicIndex++;
      }
    });

    return groups;
  }, [store.problems, store.isGrouped, store.topics]);

  const getColumnsClass = (cols: number | 'auto') => {
    if (cols === 'auto') return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4';
    switch (cols) {
      case 1: return 'columns-1';
      case 2: return 'columns-2';
      case 3: return 'columns-3';
      case 4: return 'columns-4';
      default: return 'columns-1';
    }
  };

  return (
    <div id="paper" className="w-[210mm] min-h-[297mm] bg-white shadow-xl mx-auto my-8 p-12 paper relative overflow-hidden text-zinc-900">
      <div className="text-center mb-10 border-b-2 border-emerald-700 pb-6">
        <h1 className="text-3xl font-bold tracking-widest text-zinc-900 mb-6">
          小学{store.grade}年级语文专项练习
        </h1>
        <div className="flex justify-between text-sm text-zinc-700 font-medium px-4">
          <span>日期：{date}</span>
          <span>班级：___________</span>
          <span>姓名：___________</span>
          <span>得分：___________</span>
        </div>
      </div>

      <div className="space-y-8">
        {groupedProblems.map((group, groupIndex) => (
          <div key={group.topicId} className="break-inside-avoid">
            {store.isGrouped && (
              <h2 className="text-lg font-bold text-emerald-800 mb-4 bg-emerald-50 py-1 px-3 border-l-4 border-emerald-600 inline-block rounded-r-md">
                {group.topicName}
              </h2>
            )}
            
            <div className={`gap-8 ${getColumnsClass(group.columns)}`} style={{ columnRule: '1px solid #e4e4e7' }}>
              {group.problems.map((problem) => {
                const globalIndex = store.problems.findIndex(p => p.id === problem.id);
                return (
                  <div key={problem.id} className="break-inside-avoid w-full inline-block">
                    <ProblemRenderer 
                      problem={problem} 
                      index={globalIndex} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {store.problems.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
          <div className="w-24 h-24 mb-4 opacity-20 border-4 border-dashed border-zinc-400 rounded-full" />
          <p className="text-lg tracking-widest">请在左侧点击“一键生成试卷”</p>
        </div>
      )}
    </div>
  );
};
