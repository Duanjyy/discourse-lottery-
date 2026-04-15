import { useMemo } from "react"
import { useAppStore } from "@/state/store"
import { Field, Section, TextArea } from "@/features/editor/fields"

export default function SummarySection() {
  const resume = useAppStore((s) => s.resume)
  const updateResume = useAppStore((s) => s.updateResume)
  const count = useMemo(() => resume.summary.text.length, [resume.summary.text])
  const limit = 450

  return (
    <Section title="自我评价" subtitle="实时字数统计">
      <div className="grid gap-2">
        <Field label="内容" hint={`${count}/${limit}`}>
          <TextArea
            value={resume.summary.text}
            rows={6}
            onChange={(v) =>
              updateResume((d) => {
                d.summary.text = v
              })
            }
          />
        </Field>
        {count > limit ? (
          <div className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
            字数偏多，建议精简到 {limit} 字以内
          </div>
        ) : (
          <div className="rounded-xl bg-zinc-50 px-3 py-2 text-xs text-zinc-600 ring-1 ring-zinc-200/70">
            建议 3–5 句话：优势 + 经验 + 风格。避免空泛词汇，尽量用可量化结果。
          </div>
        )}
      </div>
    </Section>
  )
}

