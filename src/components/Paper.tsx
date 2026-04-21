import { PageData } from '../hooks/usePagination';
import { useAppStore } from '../store';
import { ProblemRenderer } from './ProblemRenderer';

interface Props {
  page: PageData;
}

export const Paper = ({ page }: Props) => {
  const store = useAppStore();
  const date = new Date().toLocaleDateString('zh-CN');

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
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl mx-auto my-8 pt-12 px-12 pb-6 paper relative overflow-hidden text-zinc-900 flex-shrink-0">
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
        {page.groups.map((group) => (
          <div key={group.topicId} className="break-inside-avoid">
            {store.isGrouped && group.topicName && (
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
    </div>
  );
};
