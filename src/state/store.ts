import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createBlankResume, createDefaultSettings, createSampleResume, RESUME_VERSION } from "@/state/defaults"
import type { Resume, Settings } from "@/state/types"
import { createId } from "@/utils/id"

export type AppState = {
  resume: Resume
  settings: Settings
  updatedAt: number

  updateResume: (updater: (draft: Resume) => void) => void
  updateSettings: (updater: (draft: Settings) => void) => void

  addEducation: () => void
  removeEducation: (id: string) => void
  moveEducation: (id: string, dir: -1 | 1) => void

  addExperience: () => void
  removeExperience: (id: string) => void
  moveExperience: (id: string, dir: -1 | 1) => void

  addProject: () => void
  removeProject: (id: string) => void
  moveProject: (id: string, dir: -1 | 1) => void

  addSkill: () => void
  removeSkill: (id: string) => void
  moveSkill: (id: string, dir: -1 | 1) => void

  addLanguage: () => void
  removeLanguage: (id: string) => void
  moveLanguage: (id: string, dir: -1 | 1) => void

  addCertificate: (value: string) => void
  removeCertificate: (value: string) => void

  addHonor: (value: string) => void
  removeHonor: (value: string) => void

  resetBlank: () => void
  resetSample: () => void
  clearStorage: () => void
}

function moveById<T extends { id: string }>(list: T[], id: string, dir: -1 | 1) {
  const index = list.findIndex((x) => x.id === id)
  if (index < 0) return list
  const nextIndex = index + dir
  if (nextIndex < 0 || nextIndex >= list.length) return list
  const next = list.slice()
  const [item] = next.splice(index, 1)
  next.splice(nextIndex, 0, item)
  return next
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object"
}

function normalizeSwitchableText(base: Resume["basic"]["name"], v: unknown): Resume["basic"]["name"] {
  if (!isRecord(v)) return base
  const value = typeof v.value === "string" ? v.value : base.value
  const visible = typeof v.visible === "boolean" ? v.visible : base.visible
  return { value, visible }
}

function normalizeResume(v: unknown): Resume {
  const base = createBlankResume()
  if (!isRecord(v)) return base

  const basicIn = isRecord(v.basic) ? v.basic : {}
  const skillBlockIn = isRecord(v.skillBlock) ? v.skillBlock : {}

  return {
    version: RESUME_VERSION,
    basic: {
      name: normalizeSwitchableText(base.basic.name, basicIn.name),
      phone: normalizeSwitchableText(base.basic.phone, basicIn.phone),
      email: normalizeSwitchableText(base.basic.email, basicIn.email),
      target: normalizeSwitchableText(base.basic.target, basicIn.target),
      birthday: normalizeSwitchableText(base.basic.birthday, basicIn.birthday),
      location: normalizeSwitchableText(base.basic.location, basicIn.location),
      avatarVisible: typeof basicIn.avatarVisible === "boolean" ? basicIn.avatarVisible : base.basic.avatarVisible,
      avatarDataUrl: typeof basicIn.avatarDataUrl === "string" ? basicIn.avatarDataUrl : undefined,
    },
    education: Array.isArray(v.education) ? (v.education as Resume["education"]) : base.education,
    experience: Array.isArray(v.experience) ? (v.experience as Resume["experience"]) : base.experience,
    projects: Array.isArray(v.projects) ? (v.projects as Resume["projects"]) : base.projects,
    skillBlock: {
      skills: Array.isArray(skillBlockIn.skills) ? (skillBlockIn.skills as Resume["skillBlock"]["skills"]) : base.skillBlock.skills,
      languages: Array.isArray(skillBlockIn.languages)
        ? (skillBlockIn.languages as Resume["skillBlock"]["languages"])
        : base.skillBlock.languages,
      certificates: Array.isArray(skillBlockIn.certificates)
        ? (skillBlockIn.certificates as Resume["skillBlock"]["certificates"])
        : base.skillBlock.certificates,
      honors: Array.isArray(skillBlockIn.honors) ? (skillBlockIn.honors as Resume["skillBlock"]["honors"]) : base.skillBlock.honors,
    },
    summary: {
      text: isRecord(v.summary) && typeof v.summary.text === "string" ? v.summary.text : base.summary.text,
    },
  }
}

function normalizeSettings(v: unknown): Settings {
  const base = createDefaultSettings()
  if (!isRecord(v)) return base
  return {
    templateId: typeof v.templateId === "string" ? v.templateId : base.templateId,
    themeColor: typeof v.themeColor === "string" ? v.themeColor : base.themeColor,
    fontScale: typeof v.fontScale === "number" ? v.fontScale : base.fontScale,
    paragraphSpacing: typeof v.paragraphSpacing === "number" ? v.paragraphSpacing : base.paragraphSpacing,
    layout: v.layout === "single" || v.layout === "double" ? v.layout : base.layout,
  }
}

export const STORAGE_KEY = "resume_builder_v1"

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      resume: createSampleResume(),
      settings: createDefaultSettings(),
      updatedAt: Date.now(),

      updateResume: (updater) =>
        set((state) => {
          const next = structuredClone(state.resume)
          updater(next)
          return { resume: next, updatedAt: Date.now() }
        }),

      updateSettings: (updater) =>
        set((state) => {
          const next = structuredClone(state.settings)
          updater(next)
          return { settings: next, updatedAt: Date.now() }
        }),

      addEducation: () =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.education.push({
            id: createId("edu"),
            school: "",
            degree: "",
            major: "",
            start: "",
            end: "",
            description: "",
            honors: "",
          })
          return { resume: next, updatedAt: Date.now() }
        }),

      removeEducation: (id) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.education = next.education.filter((x) => x.id !== id)
          return { resume: next, updatedAt: Date.now() }
        }),

      moveEducation: (id, dir) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.education = moveById(next.education, id, dir)
          return { resume: next, updatedAt: Date.now() }
        }),

      addExperience: () =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.experience.push({
            id: createId("exp"),
            company: "",
            title: "",
            start: "",
            end: "",
            content: "",
          })
          return { resume: next, updatedAt: Date.now() }
        }),

      removeExperience: (id) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.experience = next.experience.filter((x) => x.id !== id)
          return { resume: next, updatedAt: Date.now() }
        }),

      moveExperience: (id, dir) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.experience = moveById(next.experience, id, dir)
          return { resume: next, updatedAt: Date.now() }
        }),

      addProject: () =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.projects.push({
            id: createId("prj"),
            name: "",
            role: "",
            start: "",
            end: "",
            description: "",
            duties: "",
            techStack: [],
            achievements: "",
          })
          return { resume: next, updatedAt: Date.now() }
        }),

      removeProject: (id) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.projects = next.projects.filter((x) => x.id !== id)
          return { resume: next, updatedAt: Date.now() }
        }),

      moveProject: (id, dir) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.projects = moveById(next.projects, id, dir)
          return { resume: next, updatedAt: Date.now() }
        }),

      addSkill: () =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.skills.push({ id: createId("sk"), name: "", level: "" })
          return { resume: next, updatedAt: Date.now() }
        }),

      removeSkill: (id) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.skills = next.skillBlock.skills.filter((x) => x.id !== id)
          return { resume: next, updatedAt: Date.now() }
        }),

      moveSkill: (id, dir) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.skills = moveById(next.skillBlock.skills, id, dir)
          return { resume: next, updatedAt: Date.now() }
        }),

      addLanguage: () =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.languages.push({ id: createId("lang"), name: "", level: "" })
          return { resume: next, updatedAt: Date.now() }
        }),

      removeLanguage: (id) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.languages = next.skillBlock.languages.filter((x) => x.id !== id)
          return { resume: next, updatedAt: Date.now() }
        }),

      moveLanguage: (id, dir) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.languages = moveById(next.skillBlock.languages, id, dir)
          return { resume: next, updatedAt: Date.now() }
        }),

      addCertificate: (value) =>
        set((state) => {
          const next = structuredClone(state.resume)
          const v = value.trim()
          if (!v) return state
          if (next.skillBlock.certificates.includes(v)) return state
          next.skillBlock.certificates.push(v)
          return { resume: next, updatedAt: Date.now() }
        }),

      removeCertificate: (value) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.certificates = next.skillBlock.certificates.filter((x) => x !== value)
          return { resume: next, updatedAt: Date.now() }
        }),

      addHonor: (value) =>
        set((state) => {
          const next = structuredClone(state.resume)
          const v = value.trim()
          if (!v) return state
          if (next.skillBlock.honors.includes(v)) return state
          next.skillBlock.honors.push(v)
          return { resume: next, updatedAt: Date.now() }
        }),

      removeHonor: (value) =>
        set((state) => {
          const next = structuredClone(state.resume)
          next.skillBlock.honors = next.skillBlock.honors.filter((x) => x !== value)
          return { resume: next, updatedAt: Date.now() }
        }),

      resetBlank: () => set({ resume: createBlankResume(), settings: createDefaultSettings(), updatedAt: Date.now() }),
      resetSample: () => set({ resume: createSampleResume(), settings: createDefaultSettings(), updatedAt: Date.now() }),
      clearStorage: () => {
        localStorage.removeItem(STORAGE_KEY)
        set({ resume: createBlankResume(), settings: createDefaultSettings(), updatedAt: Date.now() })
      },
    }),
    {
      name: STORAGE_KEY,
      version: RESUME_VERSION,
      partialize: (state) => ({ resume: state.resume, settings: state.settings, updatedAt: state.updatedAt }),
      migrate: (persisted, version) => {
        const v = Number(version)
        if (!persisted || typeof persisted !== "object") {
          return { resume: createSampleResume(), settings: createDefaultSettings(), updatedAt: Date.now() }
        }
        if (v >= RESUME_VERSION) {
          const p = persisted as { resume?: unknown; settings?: unknown; updatedAt?: unknown }
          return {
            resume: normalizeResume(p.resume),
            settings: normalizeSettings(p.settings),
            updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now(),
          }
        }

        const next: { resume: Resume; settings: Settings; updatedAt: number } = {
          resume: createSampleResume(),
          settings: createDefaultSettings(),
          updatedAt: Date.now(),
        }
        const p = persisted as Partial<typeof next>
        if (p.resume) next.resume = normalizeResume(p.resume)
        if (p.settings) next.settings = normalizeSettings(p.settings)
        if (typeof p.updatedAt === "number") next.updatedAt = p.updatedAt
        return next
      },
    },
  ),
)
