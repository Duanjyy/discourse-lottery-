import type { TemplateProps } from "@/templates/types"

function Line(props: { children: string }) {
  if (!props.children.trim()) return null
  return <span className="text-[12px] text-zinc-600">{props.children}</span>
}

function rangeText(start: string, end: string) {
  const a = start.trim()
  const b = end.trim()
  if (!a && !b) return ""
  if (a && b) return `${a} - ${b}`
  return a || b
}

function SectionTitle(props: { children: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-zinc-200" />
      <div className="text-[11px] font-semibold tracking-[0.18em]" style={{ color: props.color }}>
        {props.children}
      </div>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  )
}

export default function TemplateMinimal({ resume, settings, baseFontPx, sectionGapPx }: TemplateProps) {
  const b = resume.basic
  const color = settings.themeColor

  const name = b.name.visible ? b.name.value || "未命名" : "未命名"

  const contacts = [
    b.phone.visible ? b.phone.value : "",
    b.email.visible ? b.email.value : "",
    b.location.visible ? b.location.value : "",
    b.birthday.visible ? b.birthday.value : "",
    b.target.visible ? b.target.value : "",
  ].filter(Boolean)

  return (
    <div className="bg-white text-zinc-900" style={{ fontSize: baseFontPx, padding: 40 }}>
      <div className="flex items-start gap-6">
        {b.avatarVisible ? (
          <div className="mt-1 size-16 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200">
            {b.avatarDataUrl ? (
              <img className="h-full w-full object-cover" src={b.avatarDataUrl} alt="" />
            ) : (
              <div className="grid h-full w-full place-items-center text-xs font-semibold text-zinc-500">
                {(b.name.value || " ").trim().slice(-2)}
              </div>
            )}
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="text-[28px] font-semibold tracking-tight">{b.name.visible ? b.name.value || "未命名" : "未命名"}</div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {contacts.map((c) => (
              <Line key={c}>{c}</Line>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6" style={{ rowGap: sectionGapPx }}>
        {resume.education.length ? (
          <div>
            <SectionTitle color={color}>教育经历</SectionTitle>
            <div className="mt-3 grid gap-3">
              {resume.education.map((e) => (
                <div key={e.id} className="grid gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-semibold">{e.school}</div>
                    <div className="text-[12px] text-zinc-500">{rangeText(e.start, e.end)}</div>
                  </div>
                  <div className="text-[12px] text-zinc-600">
                    {[e.major, e.degree].filter(Boolean).join(" · ")}
                  </div>
                  {e.description.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.description}</div> : null}
                  {e.honors.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.honors}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {resume.experience.length ? (
          <div>
            <SectionTitle color={color}>工作 / 实习</SectionTitle>
            <div className="mt-3 grid gap-3">
              {resume.experience.map((e) => (
                <div key={e.id} className="grid gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-semibold">
                      {e.company}
                      {e.title ? <span className="text-zinc-500"> · {e.title}</span> : null}
                    </div>
                    <div className="text-[12px] text-zinc-500">{rangeText(e.start, e.end)}</div>
                  </div>
                  {e.content.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.content}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {resume.projects.length ? (
          <div>
            <SectionTitle color={color}>项目经历</SectionTitle>
            <div className="mt-3 grid gap-3">
              {resume.projects.map((p) => (
                <div key={p.id} className="grid gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-semibold">
                      {p.name}
                      {p.role ? <span className="text-zinc-500"> · {p.role}</span> : null}
                    </div>
                    <div className="text-[12px] text-zinc-500">{rangeText(p.start, p.end)}</div>
                  </div>
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
            <SectionTitle color={color}>技能证书</SectionTitle>
            <div className="mt-3 grid gap-3">
              {resume.skillBlock.skills.length ? (
                <div className="grid gap-2">
                  <div className="text-[12px] font-semibold text-zinc-800">技能</div>
                  <div className="flex flex-wrap gap-2">
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
                <div className="grid gap-2">
                  <div className="text-[12px] font-semibold text-zinc-800">语言</div>
                  <div className="flex flex-wrap gap-2">
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
                <div className="grid gap-2">
                  <div className="text-[12px] font-semibold text-zinc-800">证书</div>
                  <div className="flex flex-wrap gap-2">
                    {resume.skillBlock.certificates.map((c) => (
                      <span key={c} className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {resume.skillBlock.honors.length ? (
                <div className="grid gap-2">
                  <div className="text-[12px] font-semibold text-zinc-800">荣誉</div>
                  <div className="flex flex-wrap gap-2">
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
            <SectionTitle color={color}>自我评价</SectionTitle>
            <div className="mt-3 text-[12px] leading-6 text-zinc-700">{resume.summary.text}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
