import { Plus } from "lucide-react"
import { useAppStore } from "@/state/store"
import { Field, Section, SmallButton, TextArea, TextInput } from "@/features/editor/fields"
import TagInput from "@/features/editor/TagInput"
import RowTools from "@/features/editor/sections/RowTools"

export default function ProjectsSection() {
  const resume = useAppStore((s) => s.resume)
  const updateResume = useAppStore((s) => s.updateResume)
  const addProject = useAppStore((s) => s.addProject)
  const removeProject = useAppStore((s) => s.removeProject)
  const moveProject = useAppStore((s) => s.moveProject)

  return (
    <Section title="项目经历" subtitle="项目描述、职责、技术栈、成果">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">建议按时间倒序排列</div>
          <SmallButton onClick={addProject}>
            <Plus className="size-4" />
            新增
          </SmallButton>
        </div>
        {resume.projects.length === 0 ? (
          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-500 ring-1 ring-zinc-200/70">
            还没有项目经历
          </div>
        ) : null}
        {resume.projects.map((prj) => (
          <div key={prj.id} className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-zinc-900">{prj.name || "未命名项目"}</div>
              <RowTools
                onUp={() => moveProject(prj.id, -1)}
                onDown={() => moveProject(prj.id, 1)}
                onRemove={() => removeProject(prj.id)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="项目名称">
                <TextInput
                  value={prj.name}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.projects.find((x) => x.id === prj.id)
                      if (it) it.name = v
                    })
                  }
                />
              </Field>
              <Field label="项目角色">
                <TextInput
                  value={prj.role}
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.projects.find((x) => x.id === prj.id)
                      if (it) it.role = v
                    })
                  }
                />
              </Field>
              <Field label="开始时间">
                <TextInput
                  value={prj.start}
                  placeholder="YYYY-MM"
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.projects.find((x) => x.id === prj.id)
                      if (it) it.start = v
                    })
                  }
                />
              </Field>
              <Field label="结束时间">
                <TextInput
                  value={prj.end}
                  placeholder="YYYY-MM / 至今"
                  onChange={(v) =>
                    updateResume((d) => {
                      const it = d.projects.find((x) => x.id === prj.id)
                      if (it) it.end = v
                    })
                  }
                />
              </Field>
            </div>

            <Field label="项目描述">
              <TextArea
                value={prj.description}
                rows={3}
                onChange={(v) =>
                  updateResume((d) => {
                    const it = d.projects.find((x) => x.id === prj.id)
                    if (it) it.description = v
                  })
                }
              />
            </Field>
            <Field label="个人职责">
              <TextArea
                value={prj.duties}
                rows={3}
                onChange={(v) =>
                  updateResume((d) => {
                    const it = d.projects.find((x) => x.id === prj.id)
                    if (it) it.duties = v
                  })
                }
              />
            </Field>

            <Field label="技术栈" hint="标签形式">
              <TagInput
                value={prj.techStack}
                onChange={(next) =>
                  updateResume((d) => {
                    const it = d.projects.find((x) => x.id === prj.id)
                    if (it) it.techStack = next
                  })
                }
                placeholder="回车添加技术"
              />
            </Field>

            <Field label="成果">
              <TextArea
                value={prj.achievements}
                rows={2}
                onChange={(v) =>
                  updateResume((d) => {
                    const it = d.projects.find((x) => x.id === prj.id)
                    if (it) it.achievements = v
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

