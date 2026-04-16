import { create } from "zustand";
import type { QuizResult } from "@/types/poetry";
import { questions } from "@/data/questions";
import { quotes } from "@/data/quotes";
import { buildResult } from "@/utils/quiz";

type QuizState = {
  currentIndex: number;
  answers: Record<string, string>;
  result: QuizResult | null;
  start: () => void;
  restart: () => void;
  setAnswer: (questionId: string, optionId: string) => void;
  prev: () => void;
  next: () => void;
  finalize: () => QuizResult;
};

const RESULT_STORAGE_KEY = "poetry-persona:lastResult";

function loadLastResult(): QuizResult | null {
  try {
    const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuizResult;
  } catch {
    return null;
  }
}

function saveLastResult(result: QuizResult) {
  try {
    sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
  } catch {
    return;
  }
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentIndex: 0,
  answers: {},
  result: loadLastResult(),
  start: () => {
    set({ currentIndex: 0, answers: {}, result: null });
  },
  restart: () => {
    set({ currentIndex: 0, answers: {}, result: null });
  },
  setAnswer: (questionId, optionId) => {
    set((s) => ({ answers: { ...s.answers, [questionId]: optionId } }));
  },
  prev: () => {
    set((s) => ({ currentIndex: Math.max(0, s.currentIndex - 1) }));
  },
  next: () => {
    set((s) => ({ currentIndex: Math.min(questions.length - 1, s.currentIndex + 1) }));
  },
  finalize: () => {
    const state = get();
    const result = buildResult({ questions, answers: state.answers, quotes });
    saveLastResult(result);
    set({ result });
    return result;
  },
}));

