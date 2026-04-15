import { Plus } from "lucide-react"
import { useAppStore } from "@/state/store"
import { Field, Section, SmallButton, TextArea, TextInput } from "@/features/editor/fields"
import RowTools from "@/features/editor/sections/RowTools"

export default function EducationSection() {
  const resume = useAppStore((s) => s.resume)
  const updateResume = useAppStore((s) => s.updateResume)
  const addEducation = useAppStore((s) => s.addEducation)
  const removeEducation = useAppStore((s) => s.removeEducation)
  const moveEducation = useAppStore((s) => s.moveEducation)

  return (
    <Section title="教育经历" subtitle="支持新增、删除、上移下移排序">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">建议按时间倒序排列</div>
          <SmallButton onClick={addEducation}>
            <Plus className="size-4" />
            新增
          </SmallButton>
        </div>
        {resume.education.length === 0 ? (
          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-500 ring-1 ring-zinc-200/70">
            还没有教育经历
          </div>
        ) : null}
        {resume.education.map((edu) => (
          <div key={edu.id} className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-zinc-900">{edu.school || "未命名学校"}</div>
              <RowTools
                onUp={() => moveEducation(edu.id, -1)}
                onDown={() => moveEducation(edu.id, 1)}
                onRemove={() => removeEducation(edu.id)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="学校">
                <TextInput
                  value={edu.school}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.education.find((x) => x.id === edu.id)
                      if (it) it.school = v
                    })
                  }
                />
              </Field>
              <Field label="学历">
                <TextInput
                  value={edu.degree}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.education.find((x) => x.id === edu.id)
                      if (it) it.degree = v
                    })
                  }
                />
              </Field>
              <Field label="专业">
                <TextInput
                  value={edu.major}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.education.find((x) => x.id === edu.id)
                      if (it) it.major = v
                    })
                  }
                />
              </Field>
              <Field label="入学时间">
                <TextInput
                  value={edu.start}
                  placeholder="YYYY-MM"
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.education.find((x) => x.id === edu.id)
                      if (it) it.start = v
                    })
                  }
                />
              </Field>
              <Field label="毕业时间">
                <TextInput
                  value={edu.end}
                  placeholder="YYYY-MM"
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.education.find((x) => x.id === edu.id)
                      if (it) it.end = v
                    })
                  }
                />
              </Field>
            </div>
            <Field label="描述">
              <TextArea
                value={edu.description}
                rows={3}
                onChange={(v) =>
                  updateResume((d) => {
                    const it = d.education.find((x) => x.id === edu.id)
                    if (it) it.description = v
                  })
                }
              />
            </Field>
            <Field label="荣誉">
              <TextArea
                value={edu.honors}
                rows={2}
                onChange={(v) =>
                  updateResume((d) => {
                    const it = d.education.find((x) => x.id === edu.id)
                    if (it) it.honors = v
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

