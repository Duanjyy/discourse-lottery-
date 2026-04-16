import type { TemplateProps } from "@/templates/types"

function rangeText(start: string, end: string) {
  const a = start.trim()
  const b = end.trim()
  if (!a && !b) return ""
  if (a && b) return `${a} - ${b}`
  return a || b
}

function Title(props: { children: string; color: string }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <div className="text-[12px] font-semibold tracking-[0.12em]" style={{ color: props.color }}>
        {props.children}
      </div>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  )
}

export default function TemplateTech({ resume, settings, baseFontPx, sectionGapPx }: TemplateProps) {
  const b = resume.basic
  const color = settings.themeColor
  const name = b.name?.visible ? b.name.value || "未命名" : "未命名"

  const meta = [
    b.target.visible ? b.target.value : "",
    b.phone.visible ? b.phone.value : "",
    b.email.visible ? b.email.value : "",
    b.location.visible ? b.location.value : "",
  ].filter(Boolean)

  const left = (
    <div className="grid gap-6" style={{ rowGap: sectionGapPx }}>
      {resume.experience.length ? (
        <div>
          <Title color={color}>EXPERIENCE</Title>
          <div className="mt-3 grid gap-3">
            {resume.experience.map((e) => (
              <div key={e.id} className="grid gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-semibold">
                    {e.company}
                    {e.title ? <span className="text-zinc-500"> · {e.title}</span> : null}
                  </div>
                  <div className="text-[12px] font-semibold text-zinc-500">{rangeText(e.start, e.end)}</div>
                </div>
                {e.content.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.content}</div> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {resume.projects.length ? (
        <div>
          <Title color={color}>PROJECTS</Title>
          <div className="mt-3 grid gap-3">
            {resume.projects.map((p) => (
              <div key={p.id} className="grid gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-semibold">
                    {p.name}
                    {p.role ? <span className="text-zinc-500"> · {p.role}</span> : null}
                  </div>
                  <div className="text-[12px] font-semibold text-zinc-500">{rangeText(p.start, p.end)}</div>
                </div>
                {p.description.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{p.description}</div> : null}
                {p.duties.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{p.duties}</div> : null}
                {p.techStack.length ? (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg px-2 py-1 text-[11px] font-semibold"
                        style={{ background: `${color}14`, color }}
                      >
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
    </div>
  )

  const right = (
    <div className="grid gap-6" style={{ rowGap: sectionGapPx }}>
      {resume.education.length ? (
        <div>
          <Title color={color}>EDUCATION</Title>
          <div className="mt-3 grid gap-3">
            {resume.education.map((e) => (
              <div key={e.id} className="grid gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-semibold">{e.school}</div>
                  <div className="text-[12px] font-semibold text-zinc-500">{rangeText(e.start, e.end)}</div>
                </div>
                <div className="text-[12px] text-zinc-600">{[e.major, e.degree].filter(Boolean).join(" · ")}</div>
                {e.description.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.description}</div> : null}
                {e.honors.trim() ? <div className="text-[12px] leading-6 text-zinc-700">{e.honors}</div> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {resume.skillBlock.skills.length || resume.skillBlock.languages.length ? (
        <div>
          <Title color={color}>SKILLS</Title>
          <div className="mt-3 grid gap-2">
            {resume.skillBlock.skills.length ? (
              <div className="flex flex-wrap gap-2">
                {resume.skillBlock.skills
                  .filter((s) => s.name.trim())
                  .map((s) => (
                    <span key={s.id} className="rounded-lg bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                      {s.name}
                      {s.level.trim() ? <span className="text-zinc-500"> · {s.level}</span> : null}
                    </span>
                  ))}
              </div>
            ) : null}
            {resume.skillBlock.languages.length ? (
              <div className="flex flex-wrap gap-2">
                {resume.skillBlock.languages
                  .filter((s) => s.name.trim())
                  .map((s) => (
                    <span key={s.id} className="rounded-lg bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700">
                      {s.name}
                      {s.level.trim() ? <span className="text-zinc-500"> · {s.level}</span> : null}
                    </span>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {resume.summary.text.trim() ? (
        <div>
          <Title color={color}>SUMMARY</Title>
          <div className="mt-3 text-[12px] leading-6 text-zinc-700">{resume.summary.text}</div>
        </div>
      ) : null}
    </div>
  )

  return (
    <div className="bg-white font-mono text-zinc-900" style={{ fontSize: baseFontPx, padding: 40 }}>
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="text-[26px] font-semibold tracking-tight">{name}</div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-zinc-600">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
        {b.avatarVisible ? (
          <div className="mt-1 size-14 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200">
            {b.avatarDataUrl ? (
              <img className="h-full w-full object-cover" src={b.avatarDataUrl} alt="" />
            ) : (
              <div className="grid h-full w-full place-items-center text-xs font-semibold text-zinc-500">
                {(b.name.value || " ").trim().slice(-2)}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-6 h-px bg-zinc-200" />

      {settings.layout === "double" ? (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>{left}</div>
          <div>{right}</div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6" style={{ rowGap: sectionGapPx }}>
          {left}
          {right}
        </div>
      )}
    </div>
  )
}

