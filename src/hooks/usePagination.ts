import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store';
import { ChineseProblem } from '../types';

export interface PageData {
  id: string;
  groups: {
    topicId: string;
    topicName: string;
    columns: number | 'auto';
    problems: ChineseProblem[];
    isContinued?: boolean;
  }[];
}

const A4_HEIGHT_PX = 1122;
const PAGE_PADDING_Y = 96; // 48px top + 48px bottom
const HEADER_HEIGHT = 160; // Estimated header height
const USABLE_HEIGHT = A4_HEIGHT_PX - PAGE_PADDING_Y - HEADER_HEIGHT;

export const usePagination = () => {
  const store = useAppStore();
  const [pages, setPages] = useState<PageData[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (store.problems.length === 0) {
      setPages([]);
      setIsMeasuring(false);
      return;
    }

    setIsMeasuring(true);

    const measureAndPaginate = () => {
      if (!measureRef.current) {
        // Retry if not mounted yet
        requestAnimationFrame(measureAndPaginate);
        return;
      }

      const problemHeights = new Map<string, number>();
      const groupTitleHeights = new Map<string, number>();

      const problemElements = measureRef.current.querySelectorAll('[data-problem-id]');
      problemElements.forEach((el) => {
        const id = el.getAttribute('data-problem-id');
        if (id) problemHeights.set(id, el.getBoundingClientRect().height);
      });

      const titleElements = measureRef.current.querySelectorAll('[data-topic-id]');
      titleElements.forEach((el) => {
        const id = el.getAttribute('data-topic-id');
        if (id) groupTitleHeights.set(id, el.getBoundingClientRect().height);
      });

      const newPages: PageData[] = [];
      let currentPage: PageData = { id: `page-${newPages.length}`, groups: [] };
      let currentHeight = 0;

      const numberToChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'];
      let currentTopicIndex = 0;

      const grouped = store.topics
        .filter(t => t.enabled)
        .map(t => {
          const problems = store.problems.filter(p => p.type === t.id);
          const hasProblems = problems.length > 0;
          return {
            topicId: t.id,
            topicName: store.isGrouped && hasProblems ? `${numberToChinese[currentTopicIndex++]}、${t.name}` : '',
            columns: t.columns,
            problems
          };
        })
        .filter(g => g.problems.length > 0);

      grouped.forEach((group) => {
        let currentGroupInPage = {
          topicId: group.topicId,
          topicName: group.topicName,
          columns: group.columns,
          problems: [] as ChineseProblem[],
          isContinued: false
        };

        const titleHeight = store.isGrouped ? (groupTitleHeights.get(group.topicId) || 40) + 24 : 0;
        
        if (currentHeight + titleHeight > USABLE_HEIGHT && currentPage.groups.length > 0) {
          newPages.push(currentPage);
          currentPage = { id: `page-${newPages.length}`, groups: [] };
          currentHeight = 0;
        }

        currentHeight += titleHeight;
        currentPage.groups.push(currentGroupInPage);

        const cols = group.columns === 'auto' ? 4 : group.columns;
        let columnHeights = new Array(cols).fill(0);

        group.problems.forEach((problem) => {
          const pHeight = (problemHeights.get(problem.id) || 50) + store.lineSpacing;

          let minColIndex = 0;
          for (let i = 1; i < cols; i++) {
            if (columnHeights[i] < columnHeights[minColIndex]) {
              minColIndex = i;
            }
          }

          if (currentHeight + columnHeights[minColIndex] + pHeight > USABLE_HEIGHT) {
            newPages.push(currentPage);
            currentPage = { id: `page-${newPages.length}`, groups: [] };
            currentHeight = 0;
            columnHeights = new Array(cols).fill(0);
            minColIndex = 0;
            
            currentGroupInPage = {
              topicId: group.topicId,
              topicName: store.isGrouped ? `${group.topicName} (续)` : '',
              columns: group.columns,
              problems: [] as ChineseProblem[],
              isContinued: true
            };
            currentPage.groups.push(currentGroupInPage);
            
            const contTitleHeight = store.isGrouped ? titleHeight : 0;
            currentHeight += contTitleHeight;
          }

          currentGroupInPage.problems.push(problem);
          columnHeights[minColIndex] += pHeight;
        });

        const maxColHeight = Math.max(...columnHeights);
        currentHeight += maxColHeight + 32;
      });

      if (currentPage.groups.length > 0) {
        newPages.push(currentPage);
      }

      setPages(newPages);
      setIsMeasuring(false);
    };

    // Use a small timeout to allow DOM to render before measuring
    const timer = setTimeout(() => {
      requestAnimationFrame(measureAndPaginate);
    }, 50);

    return () => clearTimeout(timer);
  }, [store.problems, store.isGrouped, store.topics, store.lineSpacing]);

  return { pages, isMeasuring, measureRef };
};
