export interface Basics {
  name: string;
  phone: string;
  email: string;
  intention: string;
  birthDate: string;
  location: string;
  avatar: string;
  showAvatar: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
  honors: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string;
  techStack: string;
  achievements: string;
}

export interface Skill {
  id: string;
  category: string;
  description: string;
}

export interface Settings {
  template: 'minimal' | 'business' | 'campus' | 'tech';
  themeColor: string;
  fontSize: string;
  lineHeight: string;
  layout: 'single' | 'double';
}

export interface ResumeData {
  basics: Basics;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  summary: string;
  settings: Settings;
}

export const defaultResumeData: ResumeData = {
  basics: {
    name: '张三',
    phone: '138-0013-8000',
    email: 'zhangsan@example.com',
    intention: '前端开发工程师',
    birthDate: '1998-01-01',
    location: '上海市',
    avatar: '',
    showAvatar: true,
  },
  education: [
    {
      id: '1',
      school: '某某大学',
      degree: '本科',
      major: '计算机科学与技术',
      startDate: '2016-09',
      endDate: '2020-06',
      description: '主修课程：数据结构、算法、计算机网络、操作系统。',
      honors: '多次获得国家励志奖学金',
    }
  ],
  experience: [
    {
      id: '1',
      company: '某某科技有限公司',
      position: '前端开发工程师',
      startDate: '2020-07',
      endDate: '至今',
      description: '负责公司核心业务系统前端研发，优化前端构建流程，提升页面加载速度30%。',
    }
  ],
  projects: [
    {
      id: '1',
      name: '大型企业级SaaS管理平台',
      role: '核心开发者',
      startDate: '2021-03',
      endDate: '2022-05',
      description: '一个面向中大型企业的资源管理系统，提供复杂数据表格和可视化图表功能。',
      responsibilities: '主导前端架构设计，实现复杂表格拖拽排序功能，封装通用业务组件。',
      techStack: 'React, TypeScript, Tailwind CSS, Zustand',
      achievements: '重构了核心模块，代码量减少40%，显著提升了系统的可维护性。',
    }
  ],
  skills: [
    {
      id: '1',
      category: '前端技能',
      description: '熟练掌握 HTML/CSS/JavaScript，精通 React/Vue 等主流框架，了解前端工程化及性能优化方案。',
    }
  ],
  summary: '热爱技术，具备良好的代码编写习惯，乐于分享和拥抱开源。有强烈的责任心和团队协作精神，能承受一定的工作压力。',
  settings: {
    template: 'minimal',
    themeColor: '#2563eb', // 默认蓝色
    fontSize: '14px',
    lineHeight: '1.5',
    layout: 'single',
  }
};
