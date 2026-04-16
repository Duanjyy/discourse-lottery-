import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, defaultResumeData, Education, Experience, Project, Skill, Settings, Basics } from '../types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  // Basic info updates
  updateBasics: (basics: Partial<Basics>) => void;
  updateSummary: (summary: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;

  // Array operations
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;

  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;

  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProject: (startIndex: number, endIndex: number) => void;

  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkill: (startIndex: number, endIndex: number) => void;

  // Global operations
  resetData: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const reorderArray = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,

      updateBasics: (basics) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            basics: { ...state.resumeData.basics, ...basics },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      updateSettings: (settings) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            settings: { ...state.resumeData.settings, ...settings },
          },
        })),

      // Education
      addEducation: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              {
                id: generateId(),
                school: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: '',
                honors: '',
              },
            ],
          },
        })),
      updateEducation: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((item) => item.id !== id),
          },
        })),
      reorderEducation: (startIndex, endIndex) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: reorderArray(state.resumeData.education, startIndex, endIndex),
          },
        })),

      // Experience
      addExperience: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              ...state.resumeData.experience,
              {
                id: generateId(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
              },
            ],
          },
        })),
      updateExperience: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((item) => item.id !== id),
          },
        })),
      reorderExperience: (startIndex, endIndex) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: reorderArray(state.resumeData.experience, startIndex, endIndex),
          },
        })),

      // Project
      addProject: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              ...state.resumeData.projects,
              {
                id: generateId(),
                name: '',
                role: '',
                startDate: '',
                endDate: '',
                description: '',
                responsibilities: '',
                techStack: '',
                achievements: '',
              },
            ],
          },
        })),
      updateProject: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((item) => item.id !== id),
          },
        })),
      reorderProject: (startIndex, endIndex) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: reorderArray(state.resumeData.projects, startIndex, endIndex),
          },
        })),

      // Skill
      addSkill: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [
              ...state.resumeData.skills,
              {
                id: generateId(),
                category: '',
                description: '',
              },
            ],
          },
        })),
      updateSkill: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((item) => item.id !== id),
          },
        })),
      reorderSkill: (startIndex, endIndex) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: reorderArray(state.resumeData.skills, startIndex, endIndex),
          },
        })),

      // Global
      resetData: () => set({ resumeData: defaultResumeData }),
    }),
    {
      name: 'resume-storage', // localStorage key
    }
  )
);
