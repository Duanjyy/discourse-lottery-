import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import type { Resume, Settings } from "@/state/types"
import TemplateMinimal from "@/templates/TemplateMinimal"
import TemplateBusiness from "@/templates/TemplateBusiness"
import TemplateCampus from "@/templates/TemplateCampus"
import TemplateTech from "@/templates/TemplateTech"
import type { TemplateProps } from "@/templates/types"

const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

function usePageCount(targetRef: React.RefObject<HTMLElement>, pageHeightPx: number) {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    const compute = () => {
      const h = el.scrollHeight
      const c = Math.max(1, Math.ceil(h / pageHeightPx))
      setCount(c)
    }

    compute()
    const ro = new ResizeObserver(() => compute())
    ro.observe(el)
    return () => ro.disconnect()
  }, [targetRef, pageHeightPx])

  return count
}

function pickTemplate(templateId: string) {
  if (templateId === "business") return TemplateBusiness
  if (templateId === "campus") return TemplateCampus
  if (templateId === "tech") return TemplateTech
  return TemplateMinimal
}

const PreviewPane = forwardRef<HTMLDivElement, { resume: Resume; settings: Settings }>(function PreviewPane(
  { resume, settings },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const pageCount = usePageCount(innerRef, A4_HEIGHT_PX)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      const availableWidth = width - 32
      if (availableWidth < A4_WIDTH_PX) {
        setScale(availableWidth / A4_WIDTH_PX)
      } else {
        setScale(1)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const baseFontPx = useMemo(() => Math.round(14 * settings.fontScale * 10) / 10, [settings.fontScale])
  const sectionGapPx = useMemo(() => Math.round(18 * settings.paragraphSpacing), [settings.paragraphSpacing])

  const Template = useMemo(() => pickTemplate(settings.templateId), [settings.templateId])
  const props: TemplateProps = useMemo(
    () => ({ resume, settings, baseFontPx, sectionGapPx }),
    [resume, settings, baseFontPx, sectionGapPx],
  )

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">实时预览</div>
        <div className="text-xs font-semibold text-zinc-500">
          A4 · {pageCount} 页 · 宽 {A4_WIDTH_PX}px
        </div>
      </div>

      <div ref={containerRef} className="flex flex-1 flex-col items-center overflow-x-hidden pb-8">
        <div
          className="relative"
          style={{
            width: A4_WIDTH_PX * scale,
            height: pageCount * A4_HEIGHT_PX * scale,
          }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: A4_WIDTH_PX,
              transform: `scale(${scale})`,
            }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.45)]" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-[28px] ring-1 ring-zinc-200/70" />

            <div className="absolute left-0 top-0 h-full w-full">
              {Array.from({ length: Math.max(0, pageCount - 1) }).map((_, i) => (
                <div
                  key={i}
                  className="pointer-events-none absolute left-0 w-full border-t border-dashed border-zinc-300"
                  style={{ top: (i + 1) * A4_HEIGHT_PX }}
                />
              ))}
            </div>

            <div
              data-pdf-target="true"
              ref={(node) => {
                innerRef.current = node
                if (!ref) return
                if (typeof ref === "function") ref(node)
                else ref.current = node
              }}
              className="overflow-hidden rounded-[28px] bg-white"
              style={{
                width: A4_WIDTH_PX,
                minHeight: A4_HEIGHT_PX,
              }}
            >
              <Template {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PreviewPane

