import type { PersonaTag, Question, QuizResult, QuizScore, Quote } from "@/types/poetry";

export function createEmptyScore(): QuizScore {
  return {
    "豁达洒脱": 0,
    "温柔治愈": 0,
    "清冷孤傲": 0,
    "浪漫深情": 0,
    "励志昂扬": 0,
    "佛系淡然": 0,
  };
}

export function computeScore(params: {
  questions: Question[];
  answers: Record<string, string>;
}): { score: QuizScore; lastTouchedIndex: Record<PersonaTag, number> } {
  const score = createEmptyScore();
  const lastTouchedIndex: Record<PersonaTag, number> = {
    "豁达洒脱": -1,
    "温柔治愈": -1,
    "清冷孤傲": -1,
    "浪漫深情": -1,
    "励志昂扬": -1,
    "佛系淡然": -1,
  };

  params.questions.forEach((q, qi) => {
    const picked = params.answers[q.id];
    if (!picked) return;
    const opt = q.options.find((o) => o.id === picked);
    if (!opt) return;

    for (const [tag, value] of Object.entries(opt.weights) as Array<[PersonaTag, number]>) {
      score[tag] += value ?? 0;
      lastTouchedIndex[tag] = qi;
    }
  });

  return { score, lastTouchedIndex };
}

export function resolvePrimarySecondary(params: {
  score: QuizScore;
  lastTouchedIndex: Record<PersonaTag, number>;
}): { primaryTag: PersonaTag; secondaryTag?: PersonaTag } {
  const entries = Object.entries(params.score) as Array<[PersonaTag, number]>;
  const max = Math.max(...entries.map(([, v]) => v));
  const primaryCandidates = entries.filter(([, v]) => v === max).map(([k]) => k);

  const primaryTag =
    primaryCandidates.length === 1
      ? primaryCandidates[0]
      : primaryCandidates
          .slice()
          .sort((a, b) => params.lastTouchedIndex[b] - params.lastTouchedIndex[a])[0] ??
        primaryCandidates[Math.floor(Math.random() * primaryCandidates.length)];

  const secondaryCandidates = entries
    .filter(([k]) => k !== primaryTag)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v], idx, arr) => idx === 0 || v === arr[0][1])
    .map(([k]) => k);

  const secondaryTag =
    secondaryCandidates.length === 0
      ? undefined
      : secondaryCandidates.length === 1
        ? secondaryCandidates[0]
        : secondaryCandidates[Math.floor(Math.random() * secondaryCandidates.length)];

  return { primaryTag, secondaryTag };
}

export function pickQuote(params: { quotes: Quote[]; primaryTag: PersonaTag; secondaryTag?: PersonaTag }): Quote {
  const primaryPool = params.quotes.filter((q) => q.tags.includes(params.primaryTag));
  if (primaryPool.length === 0) return params.quotes[0];

  const weightedPool =
    params.secondaryTag == null
      ? primaryPool
      : primaryPool
          .slice()
          .sort((a, b) => Number(b.tags.includes(params.secondaryTag!)) - Number(a.tags.includes(params.secondaryTag!)));

  const topGroupSize = Math.max(1, Math.min(8, weightedPool.length));
  const pickFrom = weightedPool.slice(0, topGroupSize);
  return pickFrom[Math.floor(Math.random() * pickFrom.length)];
}

export function buildResult(params: {
  questions: Question[];
  answers: Record<string, string>;
  quotes: Quote[];
}): QuizResult {
  const { score, lastTouchedIndex } = computeScore({ questions: params.questions, answers: params.answers });
  const { primaryTag, secondaryTag } = resolvePrimarySecondary({ score, lastTouchedIndex });
  const quote = pickQuote({ quotes: params.quotes, primaryTag, secondaryTag });
  return { primaryTag, secondaryTag, quote, score };
}
