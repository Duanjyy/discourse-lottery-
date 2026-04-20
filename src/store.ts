import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppStore, TopicConfig, TopicType } from './types';
import { arrayMove } from '@dnd-kit/sortable';

export const allTopics: TopicConfig[] = [
  { id: 'pinyin_to_char', name: '看拼音写汉字', enabled: true, columns: 4, count: 'auto' },
  { id: 'char_to_pinyin', name: '生字加拼音', enabled: true, columns: 4, count: 'auto' },
  { id: 'stroke_order', name: '笔画笔顺判断', enabled: false, columns: 2, count: 'auto' },
  { id: 'synonym_antonym', name: '近反义词连线/填空', enabled: false, columns: 2, count: 'auto' },
  { id: 'similar_char', name: '形近字/同音字组词', enabled: false, columns: 2, count: 'auto' },
  { id: 'quantifier', name: '量词填空', enabled: false, columns: 4, count: 'auto' },
  { id: 'dictionary', name: '查字典专项', enabled: false, columns: 1, count: 'auto' },
  { id: 'word_chain', name: '词语接龙', enabled: false, columns: 1, count: 'auto' },
  { id: 'multi_pronunciation', name: '多音字组词', enabled: false, columns: 2, count: 'auto' },
  { id: 'idiom', name: '成语补充完整', enabled: false, columns: 4, count: 'auto' },
  { id: 'modify_sentence', name: '修改病句', enabled: false, columns: 1, count: 'auto' },
  { id: 'conjunction', name: '关联词填空', enabled: false, columns: 1, count: 'auto' },
  { id: 'ba_bei_sentence', name: '把/被字句转换', enabled: false, columns: 1, count: 'auto' },
  { id: 'expand_shrink_sentence', name: '扩句与缩句', enabled: false, columns: 1, count: 'auto' },
  { id: 'rhetoric', name: '修辞手法判断', enabled: false, columns: 1, count: 'auto' },
  { id: 'poem', name: '古诗词默写', enabled: false, columns: 1, count: 'auto' },
  { id: 'direct_indirect', name: '直接引语与间接引语', enabled: false, columns: 1, count: 'auto' },
  { id: 'emotion_color', name: '词语感情色彩辨析', enabled: false, columns: 2, count: 'auto' },
  { id: 'proverb', name: '歇后语/谚语', enabled: false, columns: 2, count: 'auto' },
  { id: 'literature', name: '文学常识填空', enabled: false, columns: 1, count: 'auto' },
  { id: 'classical_chinese', name: '文言文加点字解释', enabled: false, columns: 1, count: 'auto' },
  { id: 'imitate_sentence', name: '仿写句子', enabled: false, columns: 1, count: 'auto' },
];

const initialState = {
  grade: 1 as const,
  difficulty: 'basic' as const,
  topics: allTopics,
  totalCount: 50,
  lineSpacing: 10,
  guideline: 'tianzige' as const,
  showNumber: true,
  answerMode: 'separate' as const,
  isGrouped: true,
  problems: [],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      setGrade: (grade) => set({ grade }),
      setDifficulty: (difficulty) => set({ difficulty }),
      updateTopic: (id, config) => set((state) => ({
        topics: state.topics.map(t => t.id === id ? { ...t, ...config } : t)
      })),
      reorderTopics: (activeId, overId) => set((state) => {
        const oldIndex = state.topics.findIndex(t => t.id === activeId);
        const newIndex = state.topics.findIndex(t => t.id === overId);
        return {
          topics: arrayMove(state.topics, oldIndex, newIndex)
        };
      }),
      setTotalCount: (totalCount) => set({ totalCount }),
      setLineSpacing: (lineSpacing) => set({ lineSpacing }),
      setGuideline: (guideline) => set({ guideline }),
      setShowNumber: (showNumber) => set({ showNumber }),
      setAnswerMode: (answerMode) => set({ answerMode }),
      setIsGrouped: (isGrouped) => set({ isGrouped }),
      setProblems: (problems) => set({ problems }),
      resetToDefaults: () => set(initialState),
    }),
    {
      name: 'chinese-practice-generator-storage',
      partialize: (state) => ({
        grade: state.grade,
        difficulty: state.difficulty,
        topics: state.topics,
        totalCount: state.totalCount,
        lineSpacing: state.lineSpacing,
        guideline: state.guideline,
        showNumber: state.showNumber,
        answerMode: state.answerMode,
        isGrouped: state.isGrouped,
      }),
    }
  )
);
