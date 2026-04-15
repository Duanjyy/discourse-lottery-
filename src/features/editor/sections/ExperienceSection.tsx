import { Plus } from "lucide-react"
import { useAppStore } from "@/state/store"
import { Field, Section, SmallButton, TextArea, TextInput } from "@/features/editor/fields"
import RowTools from "@/features/editor/sections/RowTools"

export default function ExperienceSection() {
  const resume = useAppStore((s) => s.resume)
  const updateResume = useAppStore((s) => s.updateResume)
  const addExperience = useAppStore((s) => s.addExperience)
  const removeExperience = useAppStore((s) => s.removeExperience)
  const moveExperience = useAppStore((s) => s.moveExperience)

  return (
    <Section title="工作 / 实习经历" subtitle="多条记录，可排序，可删除">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">建议按时间倒序排列</div>
          <SmallButton onClick={addExperience}>
            <Plus className="size-4" />
            新增
          </SmallButton>
        </div>
        {resume.experience.length === 0 ? (
          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-500 ring-1 ring-zinc-200/70">
            还没有工作 / 实习经历
          </div>
        ) : null}
        {resume.experience.map((exp) => (
          <div key={exp.id} className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-zinc-900">{exp.company || "未命名公司"}</div>
              <RowTools
                onUp={() => moveExperience(exp.id, -1)}
                onDown={() => moveExperience(exp.id, 1)}
                onRemove={() => removeExperience(exp.id)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="公司名称">
                <TextInput
                  value={exp.company}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.experience.find((x) => x.id === exp.id)
                      if (it) it.company = v
                    })
                  }
                />
              </Field>
              <Field label="职位">
                <TextInput
                  value={exp.title}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.experience.find((x) => x.id === exp.id)
                      if (it) it.title = v
                    })
                  }
                />
              </Field>
              <Field label="开始时间">
                <TextInput
                  value={exp.start}
                  placeholder="YYYY-MM"
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.experience.find((x) => x.id === exp.id)
                      if (it) it.start = v
                    })
                  }
                />
              </Field>
              <Field label="结束时间">
                <TextInput
                  value={exp.end}
                  placeholder="YYYY-MM / 至今"
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.experience.find((x) => x.id === exp.id)
                      if (it) it.end = v
                    })
                  }
                />
              </Field>
            </div>
            <Field label="工作内容">
              <TextArea
                value={exp.content}
                rows={4}
                onChange={(v) =>
                  updateResume((d) => {
                    const it = d.experience.find((x) => x.id === exp.id)
                    if (it) it.content = v
                  })
                }
              />
            </Field>
          </div>
        ))}
      </div>
    </Section>
  )
}

