import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import PaperCard from "@/components/PaperCard";
import ProgressDots from "@/components/ProgressDots";
import { questions } from "@/data/questions";
import { useSwipe } from "@/hooks/useSwipe";
import { useQuizStore } from "@/store/quizStore";

export default function Quiz() {
  const navigate = useNavigate();
  const currentIndex = useQuizStore((s) => s.currentIndex);
  const answers = useQuizStore((s) => s.answers);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const prev = useQuizStore((s) => s.prev);
  const next = useQuizStore((s) => s.next);
  const finalize = useQuizStore((s) => s.finalize);

  const q = questions[currentIndex];
  const picked = answers[q.id];
  const total = questions.length;

  const canGoNext = picked != null;
  const isLast = currentIndex === total - 1;

  const swipe = useSwipe({
    onLeft: () => {
      if (isLast) return;
      if (!canGoNext) return;
      next();
    },
    onRight: () => {
      if (currentIndex === 0) return;
      prev();
    },
  });

  const optionUi = useMemo(
    () =>
      q.options.map((o) => {
        const active = o.id === picked;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setAnswer(q.id, o.id)}
            className={[
              "group w-full rounded-2xl px-4 py-4 text-left transition",
              "ring-1 ring-ink/10 hover:ring-ink/20",
              "bg-paper hover:bg-white/70",
              active ? "ring-ink/30 shadow-[0_16px_45px_rgba(15,23,42,0.10)]" : "",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <div
                className={[
                  "mt-1.5 h-2.5 w-2.5 rounded-full transition",
                  active ? "bg-[rgb(var(--jade))]" : "bg-ink/15 group-hover:bg-ink/25",
                ].join(" ")}
              />
              <div className="text-sm leading-6 text-ink/90">{o.text}</div>
            </div>
          </button>
        );
      }),
    [picked, q.id, q.options, setAnswer],
  );

  return (
    <div className="bg-mesh paper-noise min-h-full">
      <div className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            返回
          </Button>
          <div className="text-xs text-muted">
            {currentIndex + 1} / {total}
          </div>
        </div>

        <div className="mt-6">
          <ProgressDots total={total} current={currentIndex} />
        </div>

        <PaperCard className="mt-8 p-6 sm:p-8" {...swipe}>
          <div className="space-y-2">
            <div className='text-xs font-medium text-muted font-["Noto_Serif_SC"]'>第 {currentIndex + 1} 题</div>
            <div className='text-balance font-["Noto_Serif_SC"] text-2xl font-bold tracking-tight text-ink sm:text-3xl'>
              {q.title}
            </div>
            {q.subtitle && <div className="text-sm text-muted">{q.subtitle}</div>}
          </div>

          <div className="mt-8 grid gap-3">{optionUi}</div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="secondary" onClick={() => prev()} disabled={currentIndex === 0}>
              上一题
            </Button>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {!isLast && (
                <Button onClick={() => next()} disabled={!canGoNext}>
                  下一题
                </Button>
              )}
              {isLast && (
                <Button
                  onClick={() => {
                    finalize();
                    navigate("/result");
                  }}
                  disabled={!canGoNext}
                >
                  生成我的人设卡
                </Button>
              )}
            </div>
          </div>
        </PaperCard>

        <div className="mt-8 text-center text-xs text-muted">
          小提示：移动端可左右滑动切题（左滑下一题，右滑上一题）。
        </div>
      </div>
    </div>
  );
}

