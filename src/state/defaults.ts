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

const sampleResumes: Omit<Resume, "version">[] = [
  {
    basic: {
      name: { value: "林知行", visible: true },
      phone: { value: "138-0000-0000", visible: true },
      email: { value: "zhixing.lin@example.com", visible: true },
      target: { value: "前端开发工程师", visible: true },
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
        title: "前端开发工程师",
        start: "2022-07",
        end: "至今",
        content: "负责后台管理系统的组件化改造与性能优化；将多个表单模块抽象为可复用组件，页面首屏渲染耗时降低约 30%。参与微前端架构拆分，提升团队协作效率。",
      },
    ],
    projects: [
      {
        id: "prj-1",
        name: "在线简历生成器",
        role: "核心开发者",
        start: "2024-12",
        end: "2025-01",
        description: "纯前端离线简历生成工具，支持模板切换与 PDF 高清导出。",
        duties: "设计数据模型与状态管理；实现 A4 预览与分页导出；解决 html-to-image 截图偏移的难题，完善交互细节与可用性。",
        techStack: ["React", "TypeScript", "Tailwind", "Zustand", "html-to-image"],
        achievements: "实现了无后端的彻底隐私保护，以及导出 PDF 无偏移、无水印的高清体验。",
      },
    ],
    skillBlock: {
      skills: [
        { id: "sk-1", name: "React / Vue", level: "熟练" },
        { id: "sk-2", name: "TypeScript", level: "熟练" },
        { id: "sk-3", name: "Node.js", level: "良好" },
      ],
      languages: [
        { id: "lang-1", name: "英语", level: "CET-6" },
      ],
      certificates: ["软考（中级开发工程师）"],
      honors: ["优秀毕业生", "极客马拉松二等奖"],
    },
    summary: {
      text: "注重工程质量与用户体验，擅长将复杂页面拆解为可维护的组件体系；对性能、可访问性与复杂交互逻辑有深度实践经验。",
    },
  },
  {
    basic: {
      name: { value: "陈设计", visible: true },
      phone: { value: "139-1111-2222", visible: true },
      email: { value: "design.chen@example.com", visible: true },
      target: { value: "UI/UX 设计师", visible: true },
      birthday: { value: "1998-03", visible: false },
      location: { value: "北京", visible: true },
      avatarVisible: true,
      avatarDataUrl: undefined,
    },
    education: [
      {
        id: "edu-2",
        school: "某美术学院",
        degree: "本科",
        major: "视觉传达设计",
        start: "2017-09",
        end: "2021-06",
        description: "主修：人机交互设计、界面设计、色彩心理学、排版原理。",
        honors: "国家奖学金（2019）",
      },
    ],
    experience: [
      {
        id: "exp-2",
        company: "创意矩阵设计事务所",
        title: "资深 UI 设计师",
        start: "2021-07",
        end: "至今",
        content: "主导公司两款核心 SaaS 产品的视觉规范升级；建立并维护 Figma Design System，使得研发团队组件复用率提升 40%。",
      },
    ],
    projects: [
      {
        id: "prj-2",
        name: "云端协作画板重构",
        role: "UX 主导",
        start: "2023-05",
        end: "2023-11",
        description: "面向设计师的在线白板工具的体验升级。",
        duties: "完成用户调研与痛点分析；重构工具栏与图层面板交互逻辑；制作高保真原型与微动效规范。",
        techStack: ["Figma", "Propie", "After Effects"],
        achievements: "改版上线后用户留存率提升 15%，NPS 净推荐值显著上升。",
      },
    ],
    skillBlock: {
      skills: [
        { id: "sk-4", name: "Figma", level: "精通" },
        { id: "sk-5", name: "交互设计", level: "熟练" },
        { id: "sk-6", name: "动效制作", level: "熟练" },
      ],
      languages: [
        { id: "lang-2", name: "英语", level: "CET-4" },
      ],
      certificates: [],
      honors: ["红点设计概念奖（团队）"],
    },
    summary: {
      text: "拥有敏锐的视觉感知力与同理心，擅长在商业需求与用户体验之间寻找平衡点。推崇「少即是多」的极简设计哲学。",
    },
  },
  {
    basic: {
      name: { value: "王运营", visible: true },
      phone: { value: "135-9999-8888", visible: true },
      email: { value: "wang.op@example.com", visible: true },
      target: { value: "产品运营专家", visible: true },
      birthday: { value: "1995-11", visible: false },
      location: { value: "广州", visible: true },
      avatarVisible: false,
      avatarDataUrl: undefined,
    },
    education: [
      {
        id: "edu-3",
        school: "某某大学",
        degree: "硕士",
        major: "市场营销",
        start: "2018-09",
        end: "2020-06",
        description: "研究方向：消费者行为学、数字营销与数据分析。",
      },
    ],
    experience: [
      {
        id: "exp-3",
        company: "某知名互联网企业",
        title: "高级用户运营",
        start: "2020-07",
        end: "至今",
        content: "负责核心业务线的拉新与促活工作。策划并落地了超过 10 场千万级曝光的大型线上营销活动；搭建用户分层成长体系，将核心用户活跃度提升 25%。",
      },
    ],
    projects: [
      {
        id: "prj-3",
        name: "双十一「狂欢季」增长战役",
        role: "项目 PM",
        start: "2023-09",
        end: "2023-11",
        description: "年度最大量级的 S 级营销活动。",
        duties: "统筹跨部门资源（产研、设计、市场）；设计社交裂变与红包激励玩法；实时监控转化漏斗并进行策略调整。",
        techStack: ["SQL", "Axure", "Excel 数据建模"],
        achievements: "活动期间 DAU 突破历史新高，整体 GMV 同比增长 35%，单用户获客成本降低 12%。",
      },
    ],
    skillBlock: {
      skills: [
        { id: "sk-7", name: "活动策划", level: "精通" },
        { id: "sk-8", name: "数据分析", level: "熟练" },
        { id: "sk-9", name: "用户增长", level: "熟练" },
      ],
      languages: [],
      certificates: ["PMP 项目管理专业人士"],
      honors: ["年度最佳增长团队奖"],
    },
    summary: {
      text: "极强的数据驱动意识与目标导向思维，能独立操盘复杂营销项目。具备优秀的跨团队沟通与资源整合能力，抗压能力强。",
    },
  },
]

export function createSampleResume(): Resume {
  const randomSample = sampleResumes[Math.floor(Math.random() * sampleResumes.length)]
  return {
    version: RESUME_VERSION,
    ...randomSample,
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

