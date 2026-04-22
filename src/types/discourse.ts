export interface Poster {
  extras: string;
  description: string;
  user_id: number;
  primary_group_id: number | null;
}

export interface Topic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: string | null;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: boolean | null;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: boolean | null;
  liked: boolean | null;
  views: number;
  like_count: number;
  has_summary: boolean;
  archetype: string;
  last_poster_username: string;
  category_id: number;
  pinned_globally: boolean;
  featured_link: string | null;
  has_accepted_answer: boolean;
  vote_count?: number;
  posters: Poster[];
}

export interface User {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  trust_level?: number;
}

export interface TopicList {
  can_create_topic: boolean;
  per_page: number;
  top_tags: string[];
  topics: Topic[];
  more_topics_url?: string;
}

export interface DiscourseCategoryResponse {
  users: User[];
  primary_groups: any[];
  topic_list: TopicList;
}

export interface ProcessedTopic extends Topic {
  author?: User;
  interaction_score: number;
  vote_score: number;
}
