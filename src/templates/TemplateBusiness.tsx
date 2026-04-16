import type { TemplateProps } from "@/templates/types"

function rangeText(start: string, end: string) {
  const a = start.trim()
  const b = end.trim()
  if (!a && !b) return ""
  if (a && b) return `${a} - ${b}`
  return a || b
}

function ItemTitle(props: { left: string; right?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <div className="font-semibold text-zinc-900">{props.left}</div>
      {props.right ? <div className="text-[12px] font-semibold text-zinc-500">{props.right}</div> : null}
    </div>
  )
}

function Title(props: { children: string; color: string }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="h-2 w-2 rounded-full" style={{ background: props.color }} />
      <div className="text-[13px] font-semibold tracking-tight text-zinc-900">{props.children}</div>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  )
}

export default function TemplateBusiness({ resume, settings, baseFontPx }: TemplateProps) {
  const b = resume.basic
  const color = settings.themeColor
  const name = b.name?.visible ? b.name.value || "未命名" : "未命名"

  const contactLines = [
    b.target?.visible ? b.target.value : "",
    b.phone?.visible ? b.phone.value : "",
    b.email?.visible ? b.email.value : "",
    b.location?.visible ? b.location.value : "",
    b.birthday?.visible ? b.birthday.value : "",
  ].filter(Boolean)

  return (
    <div className="bg-white text-zinc-900" style={{ fontSize: baseFontPx }}>
      <div className="grid grid-cols-[240px_1fr]">
        <div className="min-h-[1123px] bg-zinc-950 px-7 py-10 text-white">
          <div className="flex items-start gap-4">
            {b.avatarVisible ? (
              <div className="size-14 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
                {b.avatarDataUrl ? (
                  <img className="h-full w-full object-cover" src={b.avatarDataUrl} alt="" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs font-semibold text-white/70">
                    {name.trim().slice(-2)}
                  </div>
                )}
              </div>
            ) : null}
            <div className="min-w-0">
              <div className="text-[22px] font-semibold tracking-tight">{name}</div>
              <div className="mt-2 h-px w-10 bg-white/30" />
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            {contactLines.map((c) => (
              <div key={c} className="text-[12px] leading-5 text-white/70">
                {c}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white/6 p-4 ring-1 ring-white/10">
            <div className="text-[12px] font-semibold text-white/80">导出提示</div>
            <div className="mt-2 text-[11px] leading-5 text-white/60">
              在右侧预览确认分页后导出 PDF。全程本地保存，无需登录。
            </div>
          </div>
        </div>

        <div className="min-h-[1123px] px-10 py-10">
          {resume.education.length ? (
            <div>
              <Title color={color}>教育经历</Title>
              <div className="mt-3 grid gap-3">
                {resume.education.map((e) => (
                  <div key={e.id} className="grid gap-1">
                    <ItemTitle left={e.school} right={rangeText(e.start, e.end)} />
                    <div className="text-[12px] text-zinc-600">{[e.major, e.degree].filter(Boolean).join(" · ")}</div>
                    {e.description.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.description}</div> : null}
                    {e.honors.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.honors}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {resume.experience.length ? (
            <div>
              <Title color={color}>工作 / 实习</Title>
              <div className="mt-3 grid gap-3">
                {resume.experience.map((e) => (
                  <div key={e.id} className="grid gap-1">
                    <ItemTitle left={`${e.company}${e.title ? ` · ${e.title}` : ""}`} right={rangeText(e.start, e.end)} />
                    {e.content.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.content}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {resume.projects.length ? (
            <div>
              <Title color={color}>项目经历</Title>
              <div className="mt-3 grid gap-3">
                {resume.projects.map((p) => (
                  <div key={p.id} className="grid gap-1">
                    <ItemTitle left={`${p.name}${p.role ? ` · ${p.role}` : ""}`} right={rangeText(p.start, p.end)} />
                    {p.description.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{p.description}</div> : null}
                    {p.duties.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{p.duties}</div> : null}
                    {p.techStack.length ? (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {p.techStack.map((t) => (
                          <span key={t} className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {p.achievements.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{p.achievements}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {resume.skillBlock.skills.length ||
          resume.skillBlock.languages.length ||
          resume.skillBlock.certificates.length ||
          resume.skillBlock.honors.length ? (
            <div>
              <Title color={color}>技能证书</Title>
              <div className="mt-3 grid gap-3">
                {resume.skillBlock.skills.length ? (
                  <div>
                    <div className="text-[12px] font-semibold text-zinc-800">技能</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resume.skillBlock.skills
                        .filter((s) => s.name.trim())
                        .map((s) => (
                          <span key={s.id} className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                            {s.name}
                            {s.level.trim() ? <span className="text-zinc-500"> · {s.level}</span> : null}
                          </span>
                        ))}
                    </div>
                  </div>
                ) : null}
                {resume.skillBlock.languages.length ? (
                  <div>
                    <div className="text-[12px] font-semibold text-zinc-800">语言</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resume.skillBlock.languages
                        .filter((s) => s.name.trim())
                        .map((s) => (
                          <span key={s.id} className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                            {s.name}
                            {s.level.trim() ? <span className="text-zinc-500"> · {s.level}</span> : null}
                          </span>
                        ))}
                    </div>
                  </div>
                ) : null}
                {resume.skillBlock.certificates.length ? (
                  <div>
                    <div className="text-[12px] font-semibold text-zinc-800">证书</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resume.skillBlock.certificates.map((c) => (
                        <span key={c} className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {resume.skillBlock.honors.length ? (
                  <div>
                    <div className="text-[12px] font-semibold text-zinc-800">荣誉</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resume.skillBlock.honors.map((c) => (
                        <span key={c} className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {resume.summary.text.trim() ? (
            <div>
              <Title color={color}>自我评价</Title>
              <div className="mt-3 text-[12px] leading-6 text-zinc-700">{resume.summary.text}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

