import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, FileDown, ShieldCheck, Zap } from "lucide-react"
import { STORAGE_KEY } from "@/state/store"

function formatTime(ts: number) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(ts)
  } catch {
    return ""
  }
}

export default function Home() {
  const navigate = useNavigate()

  const draft = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as { state?: { updatedAt?: number } }
      const updatedAt = parsed?.state?.updatedAt
      if (!updatedAt || typeof updatedAt !== "number") return { updatedAt: undefined }
      return { updatedAt }
    } catch {
      return null
    }
  }, [])

  return (
    <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_10%_0%,rgba(37,99,235,0.18),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(16,185,129,0.12),transparent_55%),linear-gradient(180deg,#0b1220,rgba(11,18,32,0.92))] text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-white/8 ring-1 ring-white/15">
                <span className="text-lg font-semibold tracking-tight">CV</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm text-white/70">纯前端 · 离线 · 隐私本地</div>
                <div className="text-base font-semibold tracking-tight">简历生成器</div>
              </div>
            </div>
            <a
              className="text-sm text-white/70 hover:text-white"
              href="https://"
              onClick={(e) => e.preventDefault()}
            >
              无登录 / 无上传
            </a>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-8">
              <div className="max-w-2xl">
                <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                  写简历，不必把隐私交给任何人
                </h1>
                <p className="mt-4 text-pretty text-base leading-7 text-white/70">
                  填写信息 → 选模板 → 实时预览 → 一键导出 PDF。所有数据只保存在你的浏览器里，离线也能用。
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-[0_20px_60px_-25px_rgba(255,255,255,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-28px_rgba(255,255,255,0.75)] active:translate-y-0"
                  onClick={() => navigate("/editor")}
                >
                  立即创建
                  <ArrowRight className="size-4" />
                </button>
                {draft?.updatedAt ? (
                  <button
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/14"
                    onClick={() => navigate("/editor")}
                  >
                    继续上次编辑
                    <span className="text-xs font-normal text-white/70">{formatTime(draft.updatedAt)}</span>
                  </button>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/6 p-5 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Zap className="size-4 text-emerald-300" />
                    实时预览
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/70">左填右看，模板切换不丢内容。</div>
                </div>
                <div className="rounded-2xl bg-white/6 p-5 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <FileDown className="size-4 text-sky-300" />
                    PDF 导出
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/70">A4 尺寸、清晰可打印、无水印。</div>
                </div>
                <div className="rounded-2xl bg-white/6 p-5 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <ShieldCheck className="size-4 text-violet-300" />
                    隐私本地
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/70">无登录、无上传、仅 localStorage。</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-b from-white/10 to-white/0 blur-2xl" />
              <div className="relative rounded-[28px] bg-white/6 p-6 ring-1 ring-white/10">
                <div className="text-sm font-semibold">使用说明</div>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-white/70">
                  <li>1. 填写基础信息与经历</li>
                  <li>2. 选择模板、主题色、字号与布局</li>
                  <li>3. 右侧 A4 预览，确认分页</li>
                  <li>4. 一键导出 PDF 或复制文本</li>
                </ol>
                <div className="mt-6 rounded-2xl bg-white/5 p-4 text-xs leading-5 text-white/60 ring-1 ring-white/10">
                  提示：数据会自动保存到浏览器本地。更换设备/清理浏览器数据后将无法恢复。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
