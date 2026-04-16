import { Download, Copy, RotateCcw, Trash2, LayoutGrid, Image as ImageIcon, ImageDown } from "lucide-react"
import { useAppStore } from "@/state/store"

const templates = [
  { id: "minimal", name: "简约" },
  { id: "business", name: "商务" },
  { id: "campus", name: "校园" },
  { id: "tech", name: "技术风" },
] as const

export default function EditorToolbar(props: {
  busy: null | "pdf" | "image" | "copy"
  onExportPdf: () => Promise<void> | void
  onExportImage: () => Promise<void> | void
  onCopyText: () => Promise<void> | void
  onResetBlank: () => void
  onResetSample: () => void
  onClearAll: () => void
}) {
  const settings = useAppStore((s) => s.settings)
  const resume = useAppStore((s) => s.resume)
  const updateSettings = useAppStore((s) => s.updateSettings)
  const updateResume = useAppStore((s) => s.updateResume)

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70">
          模板
          <select
            className="bg-transparent text-xs font-semibold text-zinc-900 outline-none"
            value={settings.templateId}
            onChange={(e) =>
              updateSettings((d) => {
                d.templateId = e.target.value
              })
            }
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70">
          主题
          <input
            className="h-6 w-10 cursor-pointer rounded border border-zinc-200 bg-transparent p-0"
            type="color"
            value={settings.themeColor}
            onChange={(e) =>
              updateSettings((d) => {
                d.themeColor = e.target.value
              })
            }
          />
        </label>

        <label className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70">
          字号
          <input
            className="w-24 accent-zinc-900"
            type="range"
            min={0.9}
            max={1.15}
            step={0.01}
            value={settings.fontScale}
            onChange={(e) =>
              updateSettings((d) => {
                d.fontScale = Number(e.target.value)
              })
            }
          />
        </label>

        <label className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70">
          间距
          <input
            className="w-24 accent-zinc-900"
            type="range"
            min={0.85}
            max={1.35}
            step={0.01}
            value={settings.paragraphSpacing}
            onChange={(e) =>
              updateSettings((d) => {
                d.paragraphSpacing = Number(e.target.value)
              })
            }
          />
        </label>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-100"
          onClick={() =>
            updateSettings((d) => {
              d.layout = d.layout === "single" ? "double" : "single"
            })
          }
          type="button"
        >
          <LayoutGrid className="size-4" />
          {settings.layout === "single" ? "单列" : "双列"}
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-100"
          onClick={() =>
            updateResume((d) => {
              d.basic.avatarVisible = !d.basic.avatarVisible
            })
          }
          type="button"
        >
          <ImageIcon className="size-4" />
          {resume.basic.avatarVisible ? "头像开" : "头像关"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={props.onExportPdf}
          disabled={props.busy === "pdf" || props.busy === "image"}
          type="button"
        >
          <Download className="size-4" />
          {props.busy === "pdf" ? "导出中…" : "导出 PDF"}
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={props.onExportImage}
          disabled={props.busy === "pdf" || props.busy === "image"}
          type="button"
        >
          <ImageDown className="size-4" />
          {props.busy === "image" ? "生成中…" : "导出图片"}
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={props.onCopyText}
          disabled={props.busy === "copy"}
          type="button"
        >
          <Copy className="size-4" />
          {props.busy === "copy" ? "复制中…" : "复制文本"}
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-100"
          onClick={props.onResetSample}
          type="button"
        >
          <RotateCcw className="size-4" />
          示例
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-100"
          onClick={props.onResetBlank}
          type="button"
        >
          <RotateCcw className="size-4" />
          清空
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-rose-700 ring-1 ring-zinc-200/70 transition hover:bg-rose-50"
          onClick={props.onClearAll}
          type="button"
        >
          <Trash2 className="size-4" />
          清空本地
        </button>
      </div>
    </div>
  )
}

