import { pinyin } from 'pinyin-pro';
import { AppState, ChineseProblem, TopicType } from '../types';
import { grade1Data } from '../data/grade1';
import { grade2Data } from '../data/grade2';
import { grade3Data } from '../data/grade3';
import { grade4Data } from '../data/grade4';
import { grade5Data } from '../data/grade5';
import { grade6Data } from '../data/grade6';

const getRandomItems = <T>(array: T[], count: number, usedItems: Set<T>): T[] => {
  const availableItems = array.filter(item => !usedItems.has(item));
  const actualCount = Math.min(count, availableItems.length);
  const shuffled = [...availableItems].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, actualCount);
  selected.forEach(item => usedItems.add(item));
  return selected;
};

const generateProblemByType = (type: TopicType, grade: number, count: number, isGrouped: boolean, usedItems: Set<any>): ChineseProblem[] => {
  const problems: ChineseProblem[] = [];
  
  let words = [...grade1Data.words, ...grade2Data.words, ...grade3Data.words, ...grade4Data.words, ...grade5Data.words, ...grade6Data.words];
  let chars = [...grade1Data.chars, ...grade2Data.dictionary_chars];

  if (grade === 1) {
    words = grade1Data.words;
    chars = grade1Data.chars;
  } else if (grade === 2) {
    words = grade2Data.words;
    chars = grade2Data.dictionary_chars;
  }

  let pool: any[] = [];
  switch (type) {
    case 'pinyin_to_char':
    case 'char_to_pinyin':
      pool = words;
      break;
    case 'stroke_order':
    case 'dictionary':
      pool = chars;
      break;
    case 'synonym_antonym': pool = grade1Data.synonyms_antonyms; break;
    case 'similar_char': pool = grade2Data.similar_chars; break;
    case 'quantifier': pool = grade1Data.quantifiers; break;
    case 'word_chain': pool = grade2Data.word_chain; break;
    case 'multi_pronunciation': pool = grade3Data.multi_pronunciation; break;
    case 'idiom': pool = grade3Data.idioms; break;
    case 'modify_sentence': pool = grade === 3 ? grade3Data.modify_sentence : grade5Data.modify_sentence; break;
    case 'conjunction': pool = grade3Data.conjunction; break;
    case 'ba_bei_sentence': pool = grade4Data.ba_bei_sentence; break;
    case 'expand_shrink_sentence': pool = grade4Data.expand_shrink_sentence; break;
    case 'rhetoric': pool = grade4Data.rhetoric; break;
    case 'poem': pool = grade4Data.poems; break;
    case 'direct_indirect': pool = grade5Data.direct_indirect; break;
    case 'emotion_color': pool = grade5Data.emotion_color; break;
    case 'proverb': pool = grade5Data.proverbs; break;
    case 'literature': pool = grade6Data.literature; break;
    case 'classical_chinese': pool = grade6Data.classical_chinese; break;
    case 'imitate_sentence': pool = grade6Data.imitate_sentence; break;
  }

  // To guarantee no duplicates, we filter out already used items.
  // getRandomItems shuffles the array and takes the first N elements, ensuring uniqueness.
  const selectedItems = getRandomItems(pool, count, usedItems);

  selectedItems.forEach((item, i) => {
    const id = `${type}-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`;
    
    switch (type) {
      case 'pinyin_to_char':
        problems.push({
          id, type,
          content: item as string,
          pinyin: pinyin(item as string, { toneType: 'symbol', type: 'array' }).join(' '),
          answer: item as string,
        });
        break;
      case 'char_to_pinyin':
        problems.push({
          id, type,
          content: item as string,
          answer: pinyin(item as string),
        });
        break;
      case 'stroke_order':
        problems.push({
          id, type,
          content: `“${item}”字的第(  )笔是(    )。`,
          answer: '（略）',
        });
        break;
      case 'synonym_antonym':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '写出反义词：'}${(item as any).word1} — (    )`,
          answer: (item as any).word2,
        });
        break;
      case 'similar_char':
        problems.push({
          id, type,
          content: `${(item as any).char1}(    )  ${(item as any).char2}(    )`,
          answer: '（略）',
        });
        break;
      case 'quantifier':
        problems.push({
          id, type,
          content: `一(    )${(item as any).noun}`,
          answer: (item as any).answers[0],
        });
        break;
      case 'dictionary':
        problems.push({
          id, type,
          content: `“${item}”字用部首查字法，应先查部首(    )，再查(    )画；用音序查字法，应先查音序(    )，再查音节(    )。`,
          answer: '（略）',
        });
        break;
      case 'word_chain':
        problems.push({
          id, type,
          content: `${item} -> (        ) -> (        ) -> (        )`,
          answer: '（略）',
        });
        break;
      case 'multi_pronunciation':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '多音字组词：'}${(item as any).char} (    ) (    )`,
          answer: (item as any).pinyins.join(' / '),
        });
        break;
      case 'idiom': {
        const content = (item as any).word.replace(/\(.*?\)/g, '(    )');
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '补充成语：'}${content}`,
          answer: (item as any).answer.join('、'),
        });
        break;
      }
      case 'modify_sentence':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '修改病句：'}${(item as any).wrong}`,
          answer: (item as any).correct,
        });
        break;
      case 'conjunction':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '关联词填空：'}${(item as any).text}`,
          answer: (item as any).answer.join('、'),
        });
        break;
      case 'ba_bei_sentence':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : `改成${(item as any).type === 'ba' ? '“把”' : '“被”'}字句：`}${(item as any).original}`,
          answer: (item as any).answer,
        });
        break;
      case 'expand_shrink_sentence':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : `${(item as any).type === 'expand' ? '扩句' : '缩句'}：`}${(item as any).original}`,
          answer: (item as any).answer,
        });
        break;
      case 'rhetoric':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '指出下面句子的修辞手法：'}${(item as any).sentence}`,
          answer: (item as any).answer,
        });
        break;
      case 'poem': {
        const hideUp = Math.random() > 0.5;
        problems.push({
          id, type,
          content: hideUp ? `(                  )，${(item as any).down}。` : `${(item as any).up}，(                  )。`,
          answer: hideUp ? (item as any).up : (item as any).down,
        });
        break;
      }
      case 'direct_indirect':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '直接引语与间接引语转换：'}${(item as any).original}`,
          answer: (item as any).answer,
        });
        break;
      case 'emotion_color':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '指出词语的感情色彩（褒义词/贬义词）：'}${(item as any).word}`,
          answer: (item as any).answer,
        });
        break;
      case 'proverb':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '补充歇后语：'}${(item as any).up} —— (                  )`,
          answer: (item as any).down,
        });
        break;
      case 'literature':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '文学常识：'}${(item as any).question}`,
          answer: (item as any).answer,
        });
        break;
      case 'classical_chinese':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '解释加点字：'}${(item as any).sentence}  “${(item as any).word}”的意思是(                  )`,
          answer: (item as any).answer,
        });
        break;
      case 'imitate_sentence':
        problems.push({
          id, type,
          content: `${isGrouped ? '' : '仿写句子：\n'}例：${(item as any).example}\n仿：`,
          answer: '（略）',
        });
        break;
      default:
        problems.push({
          id, type,
          content: `未知题型：${type}`,
          answer: '',
        });
    }
  });

  return problems;
};

export const generateProblems = (state: AppState): ChineseProblem[] => {
  const enabledTopics = state.topics.filter(t => t.enabled);
  if (enabledTopics.length === 0) return [];

  // Calculate counts
  let autoCountTopics = 0;
  let fixedCountSum = 0;

  enabledTopics.forEach(t => {
    if (t.count === 'auto') {
      autoCountTopics++;
    } else {
      fixedCountSum += t.count;
    }
  });

  const remainingCount = Math.max(0, state.totalCount - fixedCountSum);
  const autoCountPerTopic = autoCountTopics > 0 ? Math.floor(remainingCount / autoCountTopics) : 0;

  const problems: ChineseProblem[] = [];
  const usedItems = new Set<any>();

  enabledTopics.forEach(t => {
    const count = t.count === 'auto' ? autoCountPerTopic : t.count;
    if (count > 0) {
      problems.push(...generateProblemByType(t.id, state.grade, count, state.isGrouped, usedItems));
    }
  });

  return problems;
};
