import { useState, useEffect } from 'react';
import { DiscourseCategoryResponse, ProcessedTopic, User } from '../types/discourse';

export function useDiscourseData(categoryId: number = 35) {
  const [data, setData] = useState<{
    voteRank: ProcessedTopic[];
    interactionRank: ProcessedTopic[];
  }>({ voteRank: [], interactionRank: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/c/${categoryId}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from Discourse API');
      }
      const json: DiscourseCategoryResponse = await response.json();
      
      const usersMap = new Map<number, User>();
      json.users.forEach(user => {
        usersMap.set(user.id, user);
      });

      const topics = json.topic_list.topics;
      
      const processedTopics: ProcessedTopic[] = topics.map(topic => {
        // Find the original author (usually description === 'Original Poster')
        const originalPoster = topic.posters.find(p => p.description.includes('Original Poster')) 
                            || topic.posters[0];
                            
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

      // Filter out pinned topics if needed, but let's keep all for now, maybe just sort them.
      // We can remove 'About the XXX category' topics
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
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return { ...data, loading, error, refetch: fetchData };
}
