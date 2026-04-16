import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import PaperCard from "@/components/PaperCard";
import { quotes } from "@/data/quotes";
import { useQuizStore } from "@/store/quizStore";
import { renderPoster } from "@/utils/poster";

function buildCopyText(params: { line: string; author: string; dynasty: string; title: string; interpretation: string }) {
  return [
    `「${params.line}」`,
    `—— ${params.dynasty} · ${params.author}`,
    "",
    `我的诗词人设：${params.title}`,
    params.interpretation,
    "",
    "来自：千古名句人格测试 · 诗词小站",
  ].join("\n");
}

export default function Result() {
  const navigate = useNavigate();
  const result = useQuizStore((s) => s.result);
  const restart = useQuizStore((s) => s.restart);

  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [posterBusy, setPosterBusy] = useState(false);
  const [copyBusy, setCopyBusy] = useState(false);

  useEffect(() => {
    return () => {
      if (posterUrl) URL.revokeObjectURL(posterUrl);
    };
  }, [posterUrl]);

  const easterEgg = useMemo(() => {
    if (!result) return null;
    const pool = quotes.filter((q) => q.easterEgg && q.id !== result.quote.id);
    if (pool.length === 0) return result.quote.easterEgg ?? null;
    return pool[Math.floor(Math.random() * pool.length)].easterEgg ?? null;
  }, [result]);

  if (!result) {
    return (
      <div className="bg-mesh paper-noise min-h-full">
        <div className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pb-16 pt-12 sm:px-8">
          <PaperCard className="p-8 text-center">
            <div className='font-["Noto_Serif_SC"] text-2xl font-bold text-ink'>还没有结果</div>
            <div className="mt-3 text-sm text-muted">先去做完测试，再回来领取你的诗词人设卡。</div>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => {
                  restart();
                  navigate("/quiz");
                }}
              >
                去答题
              </Button>
            </div>
          </PaperCard>
        </div>
      </div>
    );
  }

  const copyText = buildCopyText({
    line: result.quote.line,
    author: result.quote.author,
    dynasty: result.quote.dynasty,
    title: `${result.primaryTag} · ${result.quote.personaTitle}`,
    interpretation: result.quote.modernInterpretation,
  });

  return (
    <div className="bg-mesh paper-noise min-h-full">
      <div className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            首页
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              restart();
              navigate("/quiz");
            }}
          >
            重新测试
          </Button>
        </div>

        <PaperCard className="mt-8 p-6 sm:p-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs text-muted ring-1 ring-ink/10">
              你的主气质：{result.primaryTag}
              {result.secondaryTag && (
                <>
                  <span className="h-1 w-1 rounded-full bg-ink/20" />
                  次气质：{result.secondaryTag}
                </>
              )}
            </div>
            <div className='text-balance font-["Noto_Serif_SC"] text-3xl font-black tracking-tight text-ink sm:text-4xl'>
              {result.quote.line}
            </div>
            <div className="text-sm text-muted">
              —— {result.quote.dynasty} · {result.quote.author}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-paper p-5 ring-1 ring-ink/10 sm:p-6">
            <div className="text-xs font-semibold text-muted">诗词人设称号</div>
            <div className='mt-2 font-["Noto_Serif_SC"] text-2xl font-bold text-ink'>
              {result.quote.personaTitle}
            </div>
            <div className="mt-4 text-sm leading-7 text-ink/85">{result.quote.modernInterpretation}</div>
          </div>

          {easterEgg && (
            <div className="mt-6 rounded-2xl bg-white/40 p-5 ring-1 ring-ink/10">
              <div className="text-xs font-semibold text-muted">彩蛋 · 诗词小知识</div>
              <div className="mt-2 text-sm leading-7 text-ink/80">{easterEgg}</div>
            </div>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button
              variant="secondary"
              onClick={async () => {
                try {
                  setCopyBusy(true);
                  await navigator.clipboard.writeText(copyText);
                } finally {
                  setCopyBusy(false);
                }
              }}
              disabled={copyBusy}
            >
              一键复制文案
            </Button>
            <Button
              onClick={async () => {
                try {
                  setPosterBusy(true);
                  const out = await renderPoster({ result });
                  setPosterUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return out.url;
                  });
                  const a = document.createElement("a");
                  a.href = out.url;
                  a.download = "诗词人设卡.png";
                  a.click();
                } finally {
                  setPosterBusy(false);
                }
              }}
              disabled={posterBusy}
            >
              保存图片
            </Button>
          </div>

          <div className="mt-4 text-center text-xs text-muted">
            分享提示：保存图片后可直接发朋友圈/小红书；复制文案适合配图使用。
          </div>
        </PaperCard>

        {posterUrl && (
          <PaperCard className="mt-8 overflow-hidden">
            <img src={posterUrl} alt="诗词人设卡预览" className="h-auto w-full" />
          </PaperCard>
        )}
      </div>
    </div>
  );
}

