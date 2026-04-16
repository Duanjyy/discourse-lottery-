import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import PaperCard from "@/components/PaperCard";
import { useQuizStore } from "@/store/quizStore";

export default function Home() {
  const navigate = useNavigate();
  const start = useQuizStore((s) => s.start);
  const lastResult = useQuizStore((s) => s.result);

  return (
    <div className="bg-mesh paper-noise min-h-full">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs text-muted ring-1 ring-ink/10">
              轻量 · 治愈 · 易分享
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--jade))]" />
              8 题匹配专属名句
            </div>
            <h1 className='text-balance font-["Noto_Serif_SC"] text-4xl font-black tracking-tight text-ink sm:text-6xl'>
              千古名句人格测试
            </h1>
            <p className="max-w-2xl text-pretty text-base text-muted sm:text-lg">
              用几道轻松的小选择，给你一张“诗词人设卡”。不复杂、不内耗，只负责把你的气质翻译成一句古诗。
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                start();
                navigate("/quiz");
              }}
              className="w-full sm:w-auto"
            >
              开始测试
            </Button>
            {lastResult && (
              <Button variant="secondary" onClick={() => navigate("/result")} className="w-full sm:w-auto">
                查看上次结果
              </Button>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3">
          <PaperCard className="p-6">
            <div className="text-sm font-semibold text-ink">题目很日常</div>
            <div className="mt-2 text-sm leading-6 text-muted">
              独处还是社交、理想还是现实、累了怎么回血……答案里藏着你的诗意偏好。
            </div>
          </PaperCard>
          <PaperCard className="p-6">
            <div className="text-sm font-semibold text-ink">结果很“你”</div>
            <div className="mt-2 text-sm leading-6 text-muted">
              经典名句 + 人设称号 + 现代解读。年轻语境，不说教不晦涩。
            </div>
          </PaperCard>
          <PaperCard className="p-6">
            <div className="text-sm font-semibold text-ink">一键可分享</div>
            <div className="mt-2 text-sm leading-6 text-muted">
              复制文案、保存图片、发朋友圈。让诗词替你把气质说清楚。
            </div>
          </PaperCard>
        </div>

        <div className="mt-10 text-center text-xs text-muted/80 sm:mt-14">
          提示：本测试仅供娱乐与自我投射，诗句很认真，你也可以很轻松。
        </div>
      </div>
    </div>
  );
}
