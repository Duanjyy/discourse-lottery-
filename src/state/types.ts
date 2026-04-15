export type SwitchableText = {
  value: string
  visible: boolean
}

export type BasicInfo = {
  name: SwitchableText
  phone: SwitchableText
  email: SwitchableText
  target: SwitchableText
  birthday: SwitchableText
  location: SwitchableText
  avatarDataUrl?: string
  avatarVisible: boolean
}

export type Education = {
  id: string
  school: string
  degree: string
  major: string
  start: string
  end: string
  description: string
  honors: string
}

export type Experience = {
  id: string
  company: string
  title: string
  start: string
  end: string
  content: string
}

export type Project = {
  id: string
  name: string
  role: string
  start: string
  end: string
  description: string
  duties: string
  techStack: string[]
  achievements: string
}

export type SkillItem = {
  id: string
  name: string
  level: string
}

export type SkillBlock = {
  skills: SkillItem[]
  languages: SkillItem[]
  certificates: string[]
  honors: string[]
}

export type Resume = {
  version: number
  basic: BasicInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skillBlock: SkillBlock
  summary: { text: string }
}

export type Settings = {
  templateId: string
  themeColor: string
  fontScale: number
  paragraphSpacing: number
  layout: "single" | "double"
}

