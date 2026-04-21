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

  const formatLongText = (text: string) => {
    // Split the text by (...) to style the parentheses separately
    const parts = text.split(/(\([^)]*\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('(') && part.endsWith(')')) {
        // Increase the size of the parentheses and add some horizontal tracking inside
        return (
          <span key={i} className="text-xl mx-1 tracking-[0.25em] font-medium text-slate-500 inline-block translate-y-[2px]">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
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

      default:
        return (
          <div className="flex flex-col">
            <div className="text-[15px] leading-loose text-slate-800 break-words whitespace-pre-wrap tracking-wide">
              {formatLongText(problem.content)}
            </div>
            {store.answerMode === 'inline' && problem.answer !== '（略）' && (
              <div className="text-rose-500 text-sm mt-2 border-t border-rose-100 pt-1.5 w-fit">
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
