export type PersonaTag =
  | "豁达洒脱"
  | "温柔治愈"
  | "清冷孤傲"
  | "浪漫深情"
  | "励志昂扬"
  | "佛系淡然";

export type QuestionOption = {
  id: string;
  text: string;
  weights: Partial<Record<PersonaTag, number>>;
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
};

export type Quote = {
  id: string;
  line: string;
  author: string;
  dynasty: string;
  tags: PersonaTag[];
  personaTitle: string;
  modernInterpretation: string;
  easterEgg?: string;
};

export type QuizScore = Record<PersonaTag, number>;

export type QuizResult = {
  primaryTag: PersonaTag;
  secondaryTag?: PersonaTag;
  quote: Quote;
  score: QuizScore;
};
