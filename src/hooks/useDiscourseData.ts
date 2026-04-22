import { useState, useEffect, useCallback } from 'react';
import { DiscourseCategoryResponse, ProcessedTopic, User, Topic } from '../types/discourse';

export function useDiscourseData(categoryId: number = 35) {
  const [data, setData] = useState<{
    voteRank: ProcessedTopic[];
    interactionRank: ProcessedTopic[];
  }>({ voteRank: [], interactionRank: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    try {
      let allTopics: Topic[] = [];
      const usersMap = new Map<number, User>();
      
      let page = 0;
      let hasMore = true;

      while (hasMore) {
        const response = await fetch(`/api/c/${categoryId}.json?page=${page}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from Discourse API (Page ${page})`);
        }
        
        const json: DiscourseCategoryResponse = await response.json();
        
        json.users.forEach(user => {
          usersMap.set(user.id, user);
        });

        const topics = json.topic_list.topics || [];
        
        if (topics.length > 0) {
          // Filter out topics we've already seen (e.g., globally pinned topics)
          const existingIds = new Set(allTopics.map(t => t.id));
          const newTopics = topics.filter(t => !existingIds.has(t.id));
          
          if (newTopics.length === 0) {
            // If the page only contained duplicates, we are likely at the end
            hasMore = false;
          } else {
            allTopics = [...allTopics, ...newTopics];
            setProgress(allTopics.length);
            
            // Check Discourse's more_topics_url indicator
            if (!json.topic_list.more_topics_url) {
              hasMore = false;
            } else {
              page++;
            }
          }
        } else {
          hasMore = false;
        }

        // Safety break to prevent infinite loops (max 100 pages ~ 3000 topics)
        if (page > 100) hasMore = false;
      }

      const processedTopics: ProcessedTopic[] = allTopics.map(topic => {
        // Find the original author (usually description === 'Original Poster')
        const originalPoster = topic.posters?.find(p => p.description.includes('Original Poster')) 
                            || (topic.posters && topic.posters[0]);
                            
        const author = originalPoster ? usersMap.get(originalPoster.user_id) : undefined;
        
        // Calculate scores
        // Vote score: use vote_count if available (from vote plugin), otherwise fallback to like_count
        const vote_score = topic.vote_count !== undefined ? topic.vote_count : topic.like_count;
        
        // Interaction score: replies + likes
        const interaction_score = topic.reply_count + topic.like_count;

        return {
          ...topic,
          author,
          vote_score,
          interaction_score,
        };
      });

      // Filter out 'About the XXX category' topics
      const filteredTopics = processedTopics.filter(t => !t.title.toLowerCase().startsWith('about the'));

      // Sort by vote
      const voteRank = [...filteredTopics].sort((a, b) => b.vote_score - a.vote_score);
      
      // Sort by interaction
      const interactionRank = [...filteredTopics].sort((a, b) => b.interaction_score - a.interaction_score);

      setData({ voteRank, interactionRank });
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, progress, refetch: fetchData };
}
