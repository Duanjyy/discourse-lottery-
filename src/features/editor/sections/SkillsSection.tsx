import { Plus } from "lucide-react"
import { useAppStore } from "@/state/store"
import { Field, Section, SmallButton, TextInput } from "@/features/editor/fields"
import TagInput from "@/features/editor/TagInput"
import RowTools from "@/features/editor/sections/RowTools"

export default function SkillsSection() {
  const resume = useAppStore((s) => s.resume)
  const updateResume = useAppStore((s) => s.updateResume)

  const addSkill = useAppStore((s) => s.addSkill)
  const removeSkill = useAppStore((s) => s.removeSkill)
  const moveSkill = useAppStore((s) => s.moveSkill)

  const addLanguage = useAppStore((s) => s.addLanguage)
  const removeLanguage = useAppStore((s) => s.removeLanguage)
  const moveLanguage = useAppStore((s) => s.moveLanguage)

  return (
    <Section title="技能证书" subtitle="标签 + 熟练度描述">
      <div className="grid gap-3">
        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-900">专业技能</div>
            <SmallButton onClick={addSkill}>
              <Plus className="size-4" />
              新增
            </SmallButton>
          </div>
          {resume.skillBlock.skills.length === 0 ? <div className="text-sm text-zinc-500">还没有技能</div> : null}
          <div className="grid gap-2">
            {resume.skillBlock.skills.map((sk) => (
              <div key={sk.id} className="grid gap-2 rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-200/70">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-zinc-700">{sk.name || "技能"}</div>
                  <RowTools
                    onUp={() => moveSkill(sk.id, -1)}
                    onDown={() => moveSkill(sk.id, 1)}
                    onRemove={() => removeSkill(sk.id)}
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="名称">
                    <TextInput
                      value={sk.name}
                      onChange={(v) =>
                        updateResume((d) => {
                          const it = d.skillBlock.skills.find((x) => x.id === sk.id)
                          if (it) it.name = v
                        })
                      }
                    />
                  </Field>
                  <Field label="熟练度">
                    <TextInput
                      value={sk.level}
                      placeholder="例如：熟练 / 良好"
                      onChange={(v) =>
                        updateResume((d) => {
                          const it = d.skillBlock.skills.find((x) => x.id === sk.id)
                          if (it) it.level = v
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-900">语言能力</div>
            <SmallButton onClick={addLanguage}>
              <Plus className="size-4" />
              新增
            </SmallButton>
          </div>
          {resume.skillBlock.languages.length === 0 ? <div className="text-sm text-zinc-500">还没有语言</div> : null}
          <div className="grid gap-2">
            {resume.skillBlock.languages.map((lg) => (
              <div key={lg.id} className="grid gap-2 rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-200/70">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-zinc-700">{lg.name || "语言"}</div>
                  <RowTools
                    onUp={() => moveLanguage(lg.id, -1)}
                    onDown={() => moveLanguage(lg.id, 1)}
                    onRemove={() => removeLanguage(lg.id)}
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="名称">
                    <TextInput
                      value={lg.name}
                      onChange={(v) =>
                        updateResume((d) => {
                          const it = d.skillBlock.languages.find((x) => x.id === lg.id)
                          if (it) it.name = v
                        })
                      }
                    />
                  </Field>
                  <Field label="描述">
                    <TextInput
                      value={lg.level}
                      placeholder="例如：CET-6 / 熟练"
                      onChange={(v) =>
                        updateResume((d) => {
                          const it = d.skillBlock.languages.find((x) => x.id === lg.id)
                          if (it) it.level = v
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
          <Field label="证书（标签）" hint="回车添加">
            <TagInput
              value={resume.skillBlock.certificates}
              onChange={(next) =>
                updateResume((d) => {
                  d.skillBlock.certificates = next
                })
              }
              placeholder="回车添加证书"
            />
          </Field>
        </div>

        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
          <Field label="荣誉奖项（标签）" hint="回车添加">
            <TagInput
              value={resume.skillBlock.honors}
              onChange={(next) =>
                updateResume((d) => {
                  d.skillBlock.honors = next
                })
              }
              placeholder="回车添加荣誉"
            />
          </Field>
        </div>
      </div>
    </Section>
  )
}

