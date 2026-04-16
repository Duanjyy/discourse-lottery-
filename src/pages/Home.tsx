import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import PaperCard from "@/components/PaperCard";
import { useQuizStore } from "@/store/quizStore";

export default function Home() {
  const navigate = useNavigate();
  const start = useQuizStore((s) => s.start);
  const lastResult = useQuizStore((s) => s.result);

  return (
    <div className="bg-mesh paper-noise relative min-h-full overflow-hidden">
      {/* 装饰性古典元素：淡雅圆月/山水意向 */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[40vh] w-[40vh] animate-fade-in rounded-full bg-gradient-to-br from-paper to-[rgb(var(--jade))] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[60vh] w-[60vh] animate-fade-in rounded-full bg-gradient-to-tr from-paper to-[rgb(var(--blush))] opacity-[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-full max-w-4xl flex-col items-center justify-center px-6 py-20 sm:px-12">
        {/* 竖向排版的标题区，彰显古风 */}
        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row-reverse sm:items-start sm:gap-16">
          <h1 className='writing-vertical letter-spacing-lg animate-fade-in-up font-["Noto_Serif_SC"] text-5xl font-black text-ink/90 sm:text-7xl'>
            千古名句<br/>人格测试
          </h1>
          
          <div className="flex flex-col items-center gap-8 sm:items-end sm:pt-4">
            <div className="flex flex-col items-center gap-4 text-center sm:items-end sm:text-right">
              <p className="writing-vertical animate-fade-in-up text-lg tracking-widest text-muted/80 opacity-0 sm:h-48 sm:text-xl" style={{ animationDelay: "300ms" }}>
                测一测你的诗词人设
              </p>
              <div className="mt-4 flex animate-fade-in-up gap-3 text-xs tracking-widest text-muted/60 opacity-0 sm:mt-8" style={{ animationDelay: "500ms" }}>
                <span>轻量</span>
                <span className="h-1 w-1 self-center rounded-full bg-[rgb(var(--jade))]/40" />
                <span>治愈</span>
                <span className="h-1 w-1 self-center rounded-full bg-[rgb(var(--jade))]/40" />
                <span>八题测心</span>
              </div>
            </div>
            
            {/* 极简印章风装饰 */}
            <div className="flex h-12 w-12 animate-fade-in-up items-center justify-center border border-[rgb(var(--blush))]/40 text-xs text-[rgb(var(--blush))]/60 opacity-0 sm:mt-12" style={{ animationDelay: "700ms" }}>
              <span className="writing-vertical letter-spacing-lg ml-1 font-serif">
                诗心
              </span>
            </div>
          </div>
        </div>

        {/* 底部操作区：留白与克制 */}
        <div className="mt-20 flex w-full max-w-xs animate-fade-in-up flex-col gap-4 opacity-0 sm:mt-32" style={{ animationDelay: "900ms" }}>
          <Button
            onClick={() => {
              start();
              navigate("/quiz");
            }}
            className="group relative w-full overflow-hidden bg-ink/90 text-paper transition-all hover:bg-ink hover:shadow-lg hover:shadow-ink/10 sm:h-14 sm:text-lg"
          >
            <span className="relative z-10 tracking-widest">执笔测试</span>
          </Button>
          
          {lastResult && (
            <button
              onClick={() => navigate("/result")}
              className="text-sm tracking-widest text-muted/60 transition-colors hover:text-ink/80"
            >
              回顾往期墨迹
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
