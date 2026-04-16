import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, FileText, Lock, LayoutTemplate, Printer, Sparkles, ChevronRight, Github } from "lucide-react"
import { STORAGE_KEY } from "@/state/store"

function formatTime(ts: number) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
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
    <div className="relative min-h-dvh overflow-hidden bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-200">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[32rem] w-[100%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(240,240,240,1)_0%,transparent_50%)]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between border-b border-zinc-200/60 bg-white/60 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm">
            <FileText className="size-4" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-wide">CV Builder</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
          <div className="hidden items-center gap-1.5 sm:flex">
            <Lock className="size-3.5" />
            <span>本地隐私</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-zinc-900"
          >
            <Github className="size-4" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-md">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>完全免费、纯前端、无登录限制</span>
          </div>

          <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            打造专业简历，<br />
            <span className="bg-gradient-to-br from-zinc-800 to-zinc-400 bg-clip-text text-transparent">
              从未如此简单与安全
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-500 sm:text-xl">
            实时预览，多款精美模板。你的所有信息仅保存在浏览器本地，彻底告别隐私泄露焦虑，一键导出高清 A4 PDF。
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <button
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95"
              onClick={() => navigate("/editor")}
            >
              <span>立即创建简历</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>

            {draft?.updatedAt && (
              <button
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 active:scale-95"
                onClick={() => navigate("/editor")}
              >
                <span>继续上次编辑</span>
                <span className="text-xs text-zinc-400">({formatTime(draft.updatedAt)})</span>
                <ChevronRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <Lock className="size-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-zinc-900">绝对的隐私安全</h3>
            <p className="mt-2 leading-relaxed text-zinc-500">
              无后端服务器，无数据库。你的简历数据仅通过 localStorage 存在你的设备中，真正的“阅后即焚”。
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <LayoutTemplate className="size-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-zinc-900">所见即所得</h3>
            <p className="mt-2 leading-relaxed text-zinc-500">
              左侧输入，右侧实时渲染 A4 纸张效果。支持一键切换多套精美排版（简约、商务、极客等），无缝适配。
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
              <Printer className="size-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-zinc-900">高清 PDF 导出</h3>
            <p className="mt-2 leading-relaxed text-zinc-500">
              基于纯前端的高清像素级渲染，导出无水印、无瑕疵的 PDF 文件，完美还原每一处细节排版，直接可用。
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
