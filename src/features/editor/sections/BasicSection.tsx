import { Trash2, Upload } from "lucide-react"
import type { SwitchableText } from "@/state/types"
import { useAppStore } from "@/state/store"
import { Field, Section, SmallButton, TextInput } from "@/features/editor/fields"
import { compressImageToDataUrl } from "@/utils/compressImage"

function SwitchableField(props: {
  label: string
  value: SwitchableText
  placeholder?: string
  onChange: (next: SwitchableText) => void
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <div>
        <Field label={props.label}>
          <TextInput
            value={props.value.value}
            placeholder={props.placeholder}
            onChange={(v) => props.onChange({ ...props.value, value: v })}
          />
        </Field>
      </div>
      <label className="mt-6 inline-flex select-none items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70">
        <input
          className="accent-zinc-900"
          type="checkbox"
          checked={props.value.visible}
          onChange={(e) => props.onChange({ ...props.value, visible: e.target.checked })}
        />
        显示
      </label>
    </div>
  )
}

export default function BasicSection() {
  const resume = useAppStore((s) => s.resume)
  const updateResume = useAppStore((s) => s.updateResume)

  return (
    <Section title="基础信息" subtitle="每一项可单独控制显示" defaultOpen>
      <div className="grid gap-3">
        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold text-zinc-700">头像</div>
            <label className="inline-flex select-none items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70">
              <input
                className="accent-zinc-900"
                type="checkbox"
                checked={resume.basic.avatarVisible}
                onChange={(e) =>
                  updateResume((d) => {
                    d.basic.avatarVisible = e.target.checked
                  })
                }
              />
              显示
            </label>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-14 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200">
              {resume.basic.avatarDataUrl ? (
                <img className="h-full w-full object-cover" src={resume.basic.avatarDataUrl} alt="" />
              ) : (
                <div className="grid h-full w-full place-items-center text-xs font-semibold text-zinc-400">无</div>
              )}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 transition hover:bg-zinc-50">
              <Upload className="size-4" />
              上传并压缩
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  const dataUrl = await compressImageToDataUrl(f)
                  updateResume((d) => {
                    d.basic.avatarDataUrl = dataUrl
                  })
                  e.target.value = ""
                }}
              />
            </label>
            {resume.basic.avatarDataUrl ? (
              <SmallButton
                intent="danger"
                onClick={() =>
                  updateResume((d) => {
                    d.basic.avatarDataUrl = undefined
                  })
                }
              >
                <Trash2 className="size-4" />
                移除
              </SmallButton>
            ) : null}
          </div>
        </div>

        <SwitchableField
          label="姓名"
          value={resume.basic.name}
          placeholder="例如：张三"
          onChange={(next) => updateResume((d) => void (d.basic.name = next))}
        />
        <SwitchableField
          label="电话"
          value={resume.basic.phone}
          placeholder="例如：138-0000-0000"
          onChange={(next) => updateResume((d) => void (d.basic.phone = next))}
        />
        <SwitchableField
          label="邮箱"
          value={resume.basic.email}
          placeholder="例如：name@example.com"
          onChange={(next) => updateResume((d) => void (d.basic.email = next))}
        />
        <SwitchableField
          label="求职意向"
          value={resume.basic.target}
          placeholder="例如：前端开发"
          onChange={(next) => updateResume((d) => void (d.basic.target = next))}
        />
        <SwitchableField
          label="出生日期"
          value={resume.basic.birthday}
          placeholder="例如：1999-06"
          onChange={(next) => updateResume((d) => void (d.basic.birthday = next))}
        />
        <SwitchableField
          label="现居地"
          value={resume.basic.location}
          placeholder="例如：深圳"
          onChange={(next) => updateResume((d) => void (d.basic.location = next))}
        />
      </div>
    </Section>
  )
}

