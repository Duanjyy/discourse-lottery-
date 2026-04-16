import { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { useAppStore } from "@/state/store"
import EditorToolbar from "@/features/editor/EditorToolbar"
import EditorForm from "@/features/editor/EditorForm"
import PreviewPane from "@/features/editor/PreviewPane"
import { exportResumeToPdf, exportResumeToImage } from "@/utils/exportPdf"
import { buildResumeText } from "@/utils/exportText"

export default function Editor() {
  const navigate = useNavigate()
  const resume = useAppStore((s) => s.resume)
  const settings = useAppStore((s) => s.settings)
  const resetBlank = useAppStore((s) => s.resetBlank)
  const resetSample = useAppStore((s) => s.resetSample)
  const clearStorage = useAppStore((s) => s.clearStorage)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [busy, setBusy] = useState<null | "pdf" | "image" | "copy">(null)

  const pageTitle = useMemo(() => {
    const name = resume.basic.name.value.trim()
    return name ? `${name}-简历` : "简历"
  }, [resume.basic.name.value])

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50/30">
      <div className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center">
          <div className="flex items-center justify-between gap-3 lg:justify-start">
            <button
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="size-4" />
              返回
            </button>
            <div className="flex-1 lg:flex-none">
              <div className="text-sm font-semibold tracking-tight">{pageTitle}</div>
              <div className="text-xs text-zinc-500">本地自动保存 · 无登录 · 无上传</div>
            </div>
          </div>
          <div className="flex-1">
            <EditorToolbar
              busy={busy}
              onExportPdf={async () => {
                if (!previewRef.current) return
                setBusy("pdf")
                try {
                  await exportResumeToPdf(previewRef.current, pageTitle)
                } finally {
                  setBusy(null)
                }
              }}
              onExportImage={async () => {
                if (!previewRef.current) return
                setBusy("image")
                try {
                  await exportResumeToImage(previewRef.current, pageTitle)
                } finally {
                  setBusy(null)
                }
              }}
              onCopyText={async () => {
                setBusy("copy")
                try {
                  const text = buildResumeText(resume)
                  await navigator.clipboard.writeText(text)
                } finally {
                  setBusy(null)
                }
              }}
              onResetBlank={resetBlank}
              onResetSample={resetSample}
              onClearAll={clearStorage}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-4 p-4 lg:min-h-0 lg:flex-row lg:overflow-hidden">
        <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl bg-white/70 ring-1 ring-zinc-200/70 lg:h-auto lg:w-[420px] lg:shrink-0 xl:w-[480px]">
          <div className="h-full overflow-auto p-4">
            <EditorForm />
          </div>
        </div>

        <div className="flex h-[800px] flex-col overflow-hidden rounded-2xl bg-white/70 ring-1 ring-zinc-200/70 lg:h-auto lg:flex-1">
          <div className="h-full overflow-auto p-4">
            <PreviewPane ref={previewRef} resume={resume} settings={settings} />
          </div>
        </div>
      </div>
    </div>
  )
}

