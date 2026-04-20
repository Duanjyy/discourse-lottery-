export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export type TopicType = 
  | 'pinyin_to_char' 
  | 'char_to_pinyin' 
  | 'stroke_order'
  | 'synonym_antonym'
  | 'similar_char'
  | 'quantifier'
  | 'dictionary'
  | 'word_chain'
  | 'multi_pronunciation'
  | 'idiom'
  | 'modify_sentence'
  | 'conjunction'
  | 'ba_bei_sentence'
  | 'expand_shrink_sentence'
  | 'rhetoric'
  | 'poem'
  | 'direct_indirect'
  | 'emotion_color'
  | 'proverb'
  | 'literature'
  | 'classical_chinese'
  | 'imitate_sentence'
  | 'reading';

export interface ChineseProblem {
  id: string;
  type: TopicType;
  content: string; // 题干
  options?: string[]; // 选项（如果是选择题）
  answer: string; // 答案
  pinyin?: string; // 拼音（如果是拼音题）
  questions?: { q: string; a: string }[]; // 阅读理解的小题
  isContinued?: boolean; // 是否是跨页的续题标记
}

export type ColumnCount = 1 | 2 | 3 | 4 | 'auto';
export type TopicCount = number | 'auto';

export interface TopicConfig {
  id: TopicType;
  name: string;
  enabled: boolean;
  columns: ColumnCount;
  count: TopicCount;
}

export interface AppState {
  grade: 1 | 2 | 3 | 4 | 5 | 6;
  difficulty: Difficulty;
  topics: TopicConfig[];
  totalCount: number;
  lineSpacing: number;
  guideline: 'none' | 'underline' | 'tianzige' | 'pinyin';
  showNumber: boolean;
  answerMode: 'none' | 'inline' | 'separate';
  isGrouped: boolean;
  problems: ChineseProblem[];
}

export interface AppActions {
  setGrade: (grade: 1 | 2 | 3 | 4 | 5 | 6) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  updateTopic: (id: TopicType, config: Partial<TopicConfig>) => void;
  reorderTopics: (activeId: string, overId: string) => void;
  setTotalCount: (count: number) => void;
  setLineSpacing: (spacing: number) => void;
  setGuideline: (guideline: AppState['guideline']) => void;
  setShowNumber: (show: boolean) => void;
  setAnswerMode: (mode: AppState['answerMode']) => void;
  setIsGrouped: (grouped: boolean) => void;
  setProblems: (problems: ChineseProblem[]) => void;
  resetToDefaults: () => void;
}

export type AppStore = AppState & AppActions;
