import { ChineseProblem } from '../types';
import { useAppStore } from '../store';
import clsx from 'clsx';

interface Props {
  problem: ChineseProblem;
  index: number;
}

export const ProblemRenderer = ({ problem, index }: Props) => {
  const store = useAppStore();

  const renderGuideline = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <div key={i} className="inline-flex flex-col items-center mx-0.5">
        {store.guideline === 'pinyin' && <div className="pinyin-line" />}
        {(store.guideline === 'tianzige' || store.guideline === 'pinyin') && (
          <div className="tianzige" />
        )}
        {store.guideline === 'underline' && (
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
            <div className="text-emerald-700 font-medium mb-1 tracking-widest text-sm">
              {problem.pinyin}
            </div>
            <div className="flex">{renderGuideline(problem.answer.length)}</div>
            {store.answerMode === 'inline' && (
              <div className="text-red-500 mt-1">{problem.answer}</div>
            )}
          </div>
        );

      case 'char_to_pinyin':
        return (
          <div className="flex flex-col items-center">
            <div className="flex mb-1">{renderGuideline(problem.content.length)}</div>
            <div className="text-lg tracking-widest">{problem.content}</div>
            {store.answerMode === 'inline' && (
              <div className="text-red-500 mt-1">{problem.answer}</div>
            )}
          </div>
        );

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
