import type { Resume, Settings } from "@/state/types"

export const RESUME_VERSION = 1

export function createBlankResume(): Resume {
  return {
    version: RESUME_VERSION,
    basic: {
      name: { value: "", visible: true },
      phone: { value: "", visible: true },
      email: { value: "", visible: true },
      target: { value: "", visible: true },
      birthday: { value: "", visible: false },
      location: { value: "", visible: true },
      avatarVisible: true,
      avatarDataUrl: undefined,
    },
    education: [],
    experience: [],
    projects: [],
    skillBlock: {
      skills: [],
      languages: [],
      certificates: [],
      honors: [],
    },
    summary: { text: "" },
  }
}

export function createSampleResume(): Resume {
  return {
    version: RESUME_VERSION,
    basic: {
      name: { value: "林知行", visible: true },
      phone: { value: "138-0000-0000", visible: true },
      email: { value: "zhixing.lin@example.com", visible: true },
      target: { value: "前端开发 / Web 工程师", visible: true },
      birthday: { value: "1999-06", visible: false },
      location: { value: "上海", visible: true },
      avatarVisible: true,
      avatarDataUrl: undefined,
    },
    education: [
      {
        id: "edu-1",
        school: "某某大学",
        degree: "本科",
        major: "计算机科学与技术",
        start: "2018-09",
        end: "2022-06",
        description: "主修：数据结构、操作系统、计算机网络、软件工程。",
        honors: "校级一等奖学金（2020）",
      },
    ],
    experience: [
      {
        id: "exp-1",
        company: "某某科技有限公司",
        title: "前端开发工程师（实习）",
        start: "2021-06",
        end: "2021-10",
        content: "负责后台管理系统的组件化改造与性能优化；将多个表单模块抽象为可复用组件，页面首屏渲染耗时降低约 30%。",
      },
    ],
    projects: [
      {
        id: "prj-1",
        name: "在线简历生成器（个人项目）",
        role: "独立开发",
        start: "2024-12",
        end: "2025-01",
        description: "纯前端离线简历生成工具，支持模板切换与 PDF 导出。",
        duties: "设计数据模型与状态管理；实现 A4 预览与分页导出；完善交互细节与可用性。",
        techStack: ["React", "TypeScript", "Tailwind", "html2canvas", "jsPDF"],
        achievements: "导出 PDF 无水印、支持多页；全程本地保存，保护隐私。",
      },
    ],
    skillBlock: {
      skills: [
        { id: "sk-1", name: "React", level: "熟练" },
        { id: "sk-2", name: "TypeScript", level: "熟练" },
        { id: "sk-3", name: "性能优化", level: "良好" },
      ],
      languages: [
        { id: "lang-1", name: "英语", level: "CET-6" },
      ],
      certificates: ["软考（中级）"],
      honors: ["优秀毕业生"],
    },
    summary: {
      text: "注重工程质量与用户体验，擅长将复杂页面拆解为可维护的组件体系；对性能、可访问性与导出打印一致性有实践经验。",
    },
  }
}

export function createDefaultSettings(): Settings {
  return {
    templateId: "minimal",
    themeColor: "#2563eb",
    fontScale: 1,
    paragraphSpacing: 1,
    layout: "single",
  }
}
