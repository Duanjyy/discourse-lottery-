import { pinyin } from 'pinyin-pro';
import { AppState, ChineseProblem, TopicType } from '../types';
import { grade1Data } from '../data/grade1';
import { grade2Data } from '../data/grade2';
import { grade3Data } from '../data/grade3';
import { grade4Data } from '../data/grade4';
import { grade5Data } from '../data/grade5';
import { grade6Data } from '../data/grade6';

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateProblemByType = (type: TopicType, grade: number, count: number, isGrouped: boolean): ChineseProblem[] => {
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

  for (let i = 0; i < count; i++) {
    const id = `${type}-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`;
    
    switch (type) {
      case 'pinyin_to_char': {
        const word = getRandomItems(words, 1)[0];
        problems.push({
          id,
          type,
          content: word, // Content is actually the answer in this case, we need to show pinyin
          pinyin: pinyin(word, { toneType: 'symbol', type: 'array' }).join(' '),
          answer: word,
        });
        break;
      }
      case 'char_to_pinyin': {
        const word = getRandomItems(words, 1)[0];
        problems.push({
          id,
          type,
          content: word,
          answer: pinyin(word),
        });
        break;
      }
      case 'stroke_order': {
        const char = getRandomItems(chars, 1)[0];
        problems.push({
          id,
          type,
          content: `“${char}”字的第(  )笔是(    )。`,
          answer: '（略）',
        });
        break;
      }
      case 'synonym_antonym': {
        const item = getRandomItems(grade1Data.synonyms_antonyms, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '写出反义词：'}${item.word1} — (    )`,
          answer: item.word2,
        });
        break;
      }
      case 'similar_char': {
        const item = getRandomItems(grade2Data.similar_chars, 1)[0];
        problems.push({
          id,
          type,
          content: `${item.char1}(    )  ${item.char2}(    )`,
          answer: '（略）',
        });
        break;
      }
      case 'quantifier': {
        const item = getRandomItems(grade1Data.quantifiers, 1)[0];
        problems.push({
          id,
          type,
          content: `一(    )${item.noun}`,
          answer: item.answers[0],
        });
        break;
      }
      case 'dictionary': {
        const char = getRandomItems(chars, 1)[0];
        problems.push({
          id,
          type,
          content: `“${char}”字用部首查字法，应先查部首(    )，再查(    )画；用音序查字法，应先查音序(    )，再查音节(    )。`,
          answer: '（略）',
        });
        break;
      }
      case 'word_chain': {
        const word = getRandomItems(grade2Data.word_chain, 1)[0];
        problems.push({
          id,
          type,
          content: `${word} -> (        ) -> (        ) -> (        )`,
          answer: '（略）',
        });
        break;
      }
      case 'multi_pronunciation': {
        const item = getRandomItems(grade3Data.multi_pronunciation, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '多音字组词：'}${item.char} (    ) (    )`,
          answer: item.pinyins.join(' / '),
        });
        break;
      }
      case 'idiom': {
        const item = getRandomItems(grade3Data.idioms, 1)[0];
        const content = item.word.replace(/\(.*?\)/g, '(    )');
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '补充成语：'}${content}`,
          answer: item.answer.join('、'),
        });
        break;
      }
      case 'modify_sentence': {
        const data = grade === 3 ? grade3Data.modify_sentence : grade5Data.modify_sentence;
        const item = getRandomItems(data, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '修改病句：'}${item.wrong}`,
          answer: item.correct,
        });
        break;
      }
      case 'conjunction': {
        const item = getRandomItems(grade3Data.conjunction, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '关联词填空：'}${item.text}`,
          answer: item.answer.join('、'),
        });
        break;
      }
      case 'ba_bei_sentence': {
        const item = getRandomItems(grade4Data.ba_bei_sentence, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : `改成${item.type === 'ba' ? '“把”' : '“被”'}字句：`}${item.original}`,
          answer: item.answer,
        });
        break;
      }
      case 'expand_shrink_sentence': {
        const item = getRandomItems(grade4Data.expand_shrink_sentence, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : `${item.type === 'expand' ? '扩句' : '缩句'}：`}${item.original}`,
          answer: item.answer,
        });
        break;
      }
      case 'rhetoric': {
        const item = getRandomItems(grade4Data.rhetoric, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '指出下面句子的修辞手法：'}${item.sentence}`,
          answer: item.answer,
        });
        break;
      }
      case 'poem': {
        const item = getRandomItems(grade4Data.poems, 1)[0];
        const hideUp = Math.random() > 0.5;
        problems.push({
          id,
          type,
          content: hideUp ? `(                  )，${item.down}。` : `${item.up}，(                  )。`,
          answer: hideUp ? item.up : item.down,
        });
        break;
      }
      case 'direct_indirect': {
        const item = getRandomItems(grade5Data.direct_indirect, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '直接引语与间接引语转换：'}${item.original}`,
          answer: item.answer,
        });
        break;
      }
      case 'emotion_color': {
        const item = getRandomItems(grade5Data.emotion_color, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '指出词语的感情色彩（褒义词/贬义词）：'}${item.word}`,
          answer: item.answer,
        });
        break;
      }
      case 'proverb': {
        const item = getRandomItems(grade5Data.proverbs, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '补充歇后语：'}${item.up} —— (                  )`,
          answer: item.down,
        });
        break;
      }
      case 'literature': {
        const item = getRandomItems(grade6Data.literature, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '文学常识：'}${item.question}`,
          answer: item.answer,
        });
        break;
      }
      case 'classical_chinese': {
        const item = getRandomItems(grade6Data.classical_chinese, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '解释加点字：'}${item.sentence}  “${item.word}”的意思是(                  )`,
          answer: item.answer,
        });
        break;
      }
      case 'imitate_sentence': {
        const item = getRandomItems(grade6Data.imitate_sentence, 1)[0];
        problems.push({
          id,
          type,
          content: `${isGrouped ? '' : '仿写句子：\n'}例：${item.example}\n仿：(                                                                      )`,
          answer: '（略）',
        });
        break;
      }
      default: {
        problems.push({
          id,
          type,
          content: `未知题型：${type}`,
          answer: '',
        });
      }
    }
  }
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

  enabledTopics.forEach(t => {
    const count = t.count === 'auto' ? autoCountPerTopic : t.count;
    if (count > 0) {
      problems.push(...generateProblemByType(t.id, state.grade, count, state.isGrouped));
    }
  });

  return problems;
};
