import { ChineseProblem } from '../types';
import { useAppStore } from '../store';
import clsx from 'clsx';

interface Props {
  problem: ChineseProblem;
  index: number;
}

export const ProblemRenderer = ({ problem, index }: Props) => {
  const store = useAppStore();

  const renderGuideline = (count: number, forceType?: 'tianzige' | 'pinyin' | 'underline') => {
    const type = forceType || store.guideline;
    
    return Array.from({ length: count }).map((_, i) => (
      <div key={i} className="inline-flex flex-col items-center mx-0.5">
        {type === 'pinyin' && <div className="pinyin-line" />}
        {type === 'tianzige' && (
          <div className="tianzige" />
        )}
        {type === 'underline' && (
          <div className="w-10 h-6 border-b border-emerald-500 inline-block" />
        )}
      </div>
    ));
  };

  const renderContent = () => {
    switch (problem.type) {
      case 'pinyin_to_char':
        return (
          <div className="flex flex-col items-center">
            <div className="text-emerald-700 font-medium mb-1 tracking-widest text-sm h-5">
              {problem.pinyin}
            </div>
            <div className="flex">{renderGuideline(problem.answer.length, 'tianzige')}</div>
            {store.answerMode === 'inline' && (
              <div className="text-red-500 mt-1">{problem.answer}</div>
            )}
          </div>
        );

      case 'char_to_pinyin':
        return (
          <div className="flex flex-col items-center">
            <div className="flex mb-2">{renderGuideline(problem.content.length, 'pinyin')}</div>
            <div className="text-3xl tracking-[1.5rem] ml-[1.5rem] font-serif">{problem.content}</div>
            {store.answerMode === 'inline' && (
              <div className="text-red-500 mt-1">{problem.answer}</div>
            )}
          </div>
        );

      case 'reading': {
        const lines = problem.content.split('\n');
        const title = lines[0];
        const body = lines.slice(1).join('\n');
        
        return (
          <div className="flex flex-col w-full text-base text-zinc-800">
            <h3 className="text-center font-bold text-lg mb-4 tracking-widest">{title}</h3>
            <div className="leading-loose mb-6 whitespace-pre-wrap indent-8 text-justify">{body}</div>
            
            <div className="space-y-8 pl-4">
              {problem.questions?.map((q, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <span className="font-medium shrink-0">{i + 1}.</span>
                    <span>{q.q}</span>
                  </div>
                  <div className="w-full mt-2">
                    <div className="w-full h-8 border-b border-emerald-500" />
                    <div className="w-full h-8 border-b border-emerald-500" />
                  </div>
                  {store.answerMode === 'inline' && (
                    <div className="text-red-500 text-sm mt-1 border-t border-red-100 pt-1">
                      答：{q.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="flex flex-col">
            <div className="text-base leading-relaxed text-zinc-800 break-words whitespace-pre-wrap">
              {problem.content}
            </div>
            {store.answerMode === 'inline' && problem.answer !== '（略）' && (
              <div className="text-red-500 text-sm mt-1 border-t border-red-100 pt-1 w-fit">
                答：{problem.answer}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div 
      className={clsx(
        "relative flex break-inside-avoid w-full",
        store.lineSpacing > 0 && `mb-[${store.lineSpacing}px]`
      )}
      style={{ marginBottom: `${store.lineSpacing}px` }}
    >
      {store.showNumber && (
        <span className="w-6 shrink-0 text-zinc-500 font-medium pt-0.5">
          {index + 1}.
        </span>
      )}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};
