import type { Resume } from "@/state/types"

function line(...parts: Array<string | undefined | null>) {
  const v = parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .join(" ")
  return v
}

function rangeText(start: string, end: string) {
  const a = start.trim()
  const b = end.trim()
  if (!a && !b) return ""
  if (a && b) return `${a} - ${b}`
  return a || b
}

export function buildResumeText(resume: Resume) {
  const out: string[] = []
  const b = resume.basic

  out.push(line(b.name.visible ? b.name.value : ""))
  const meta = [
    b.phone.visible ? b.phone.value : "",
    b.email.visible ? b.email.value : "",
    b.target.visible ? b.target.value : "",
    b.location.visible ? b.location.value : "",
    b.birthday.visible ? b.birthday.value : "",
  ].filter(Boolean)
  if (meta.length) out.push(meta.join(" | "))

  if (resume.education.length) {
    out.push("")
    out.push("教育经历")
    for (const e of resume.education) {
      out.push(line("•", e.school, rangeText(e.start, e.end)))
      out.push(line("  ", [e.major, e.degree].filter(Boolean).join(" · ")))
      if (e.description.trim()) out.push(line("  ", e.description))
      if (e.honors.trim()) out.push(line("  ", e.honors))
    }
  }

  if (resume.experience.length) {
    out.push("")
    out.push("工作 / 实习经历")
    for (const e of resume.experience) {
      out.push(line("•", e.company, e.title ? `(${e.title})` : "", rangeText(e.start, e.end)))
      if (e.content.trim()) out.push(line("  ", e.content))
    }
  }

  if (resume.projects.length) {
    out.push("")
    out.push("项目经历")
    for (const p of resume.projects) {
      out.push(line("•", p.name, p.role ? `(${p.role})` : "", rangeText(p.start, p.end)))
      if (p.description.trim()) out.push(line("  ", p.description))
      if (p.duties.trim()) out.push(line("  ", `职责：${p.duties}`))
      if (p.techStack.length) out.push(line("  ", `技术栈：${p.techStack.join(" / ")}`))
      if (p.achievements.trim()) out.push(line("  ", `成果：${p.achievements}`))
    }
  }

  const sb = resume.skillBlock
  if (sb.skills.length || sb.languages.length || sb.certificates.length || sb.honors.length) {
    out.push("")
    out.push("技能证书")
    if (sb.skills.length) {
      out.push(line("•", "技能：", sb.skills.filter((x) => x.name.trim()).map((x) => `${x.name}${x.level.trim() ? `(${x.level})` : ""}`).join(" / ")))
    }
    if (sb.languages.length) {
      out.push(
        line(
          "•",
          "语言：",
          sb.languages.filter((x) => x.name.trim()).map((x) => `${x.name}${x.level.trim() ? `(${x.level})` : ""}`).join(" / "),
        ),
      )
    }
    if (sb.certificates.length) out.push(line("•", "证书：", sb.certificates.join(" / ")))
    if (sb.honors.length) out.push(line("•", "荣誉：", sb.honors.join(" / ")))
  }

  if (resume.summary.text.trim()) {
    out.push("")
    out.push("自我评价")
    out.push(resume.summary.text.trim())
  }

  return out.join("\n").trim() + "\n"
}

