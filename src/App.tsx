import React, { useState } from 'react';
import { useDiscourseData } from './hooks/useDiscourseData';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MessageSquare, ThumbsUp, Eye, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { ProcessedTopic } from './types/discourse';

// Category 35 is the target category.
const CATEGORY_ID = 35;

function App() {
  const { voteRank, interactionRank, loading, error, refetch } = useDiscourseData(CATEGORY_ID);
  const [activeTab, setActiveTab] = useState<'vote' | 'interaction'>('vote');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderTopicCard = (topic: ProcessedTopic, index: number, type: 'vote' | 'interaction') => {
    const avatarUrl = topic.author?.avatar_template.replace('{size}', '48') || '/default-avatar.png';
    const isTop3 = index < 3;
    const rankColors = [
      'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', // 1st
      'text-slate-300 bg-slate-300/10 border-slate-300/20',     // 2nd
      'text-amber-600 bg-amber-600/10 border-amber-600/20',     // 3rd
    ];
    
    const defaultRankColor = 'text-zinc-400 bg-zinc-800/50 border-zinc-700/50';
    const rankStyle = isTop3 ? rankColors[index] : defaultRankColor;

    return (
      <motion.a
        variants={itemVariants}
        href={`https://forum.trae.cn/t/${topic.slug}/${topic.id}`}
        target="_blank"
        rel="noopener noreferrer"
        key={topic.id}
        className="group relative flex items-center p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/60 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-colors duration-500" />
        
        {/* Rank Badge */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl border ${rankStyle} font-bold text-lg mr-4 shrink-0 shadow-sm`}>
          {index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="text-zinc-100 font-medium text-base mb-1 truncate group-hover:text-indigo-400 transition-colors">
            {topic.title}
          </h3>
          <div className="flex items-center text-xs text-zinc-500 space-x-3">
            <span className="flex items-center">
              <img 
                src={`https://forum.trae.cn${avatarUrl}`} 
                alt={topic.author?.username || 'User'} 
                className="w-4 h-4 rounded-full mr-1.5 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + (topic.author?.username || 'User') + '&background=random';
                }}
              />
              {topic.author?.username || 'Unknown'}
            </span>
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {topic.views}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 shrink-0">
          {type === 'vote' ? (
            <div className="flex flex-col items-end">
              <span className="flex items-center text-indigo-400 font-semibold text-lg">
                <ThumbsUp className="w-4 h-4 mr-1.5" />
                {topic.vote_score}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Votes</span>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <span className="flex items-center text-purple-400 font-semibold text-lg">
                <MessageSquare className="w-4 h-4 mr-1.5" />
                {topic.interaction_score}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Interactions</span>
            </div>
          )}
          <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
        </div>
      </motion.a>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans selection:bg-indigo-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16 pt-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Trae Forum Leaderboard
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-zinc-400"
          >
            热门话题风云榜
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            探索 Trae 社区中最受瞩目、最具讨论价值的优质内容。数据实时同步自 Discourse 论坛。
          </motion.p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
            <p className="text-zinc-500">正在同步论坛数据...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-400">
            <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">数据加载失败</p>
            <p className="text-sm opacity-70 mb-6">{error}</p>
            <button 
              onClick={refetch}
              className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              重试
            </button>
          </div>
        ) : (
          <>
            {/* Mobile Tab Navigation */}
            <div className="lg:hidden flex p-1 bg-zinc-900/50 rounded-xl border border-zinc-800 mb-8 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('vote')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'vote' 
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/30' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <span className="flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  投票飙升榜
                </span>
              </button>
              <button
                onClick={() => setActiveTab('interaction')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'interaction' 
                    ? 'bg-purple-500/20 text-purple-300 shadow-sm border border-purple-500/30' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <span className="flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  互动热议榜
                </span>
              </button>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Vote Rank List */}
              <div className={`${activeTab === 'vote' ? 'block' : 'hidden'} lg:block`}>
                <div className="flex items-center justify-between mb-6 px-2">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center">
                    <ThumbsUp className="w-5 h-5 text-indigo-400 mr-2" />
                    投票飙升榜
                  </h2>
                  <span className="text-xs font-medium px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full">
                    Top {voteRank.length}
                  </span>
                </div>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {voteRank.map((topic, index) => renderTopicCard(topic, index, 'vote'))}
                </motion.div>
              </div>

              {/* Interaction Rank List */}
              <div className={`${activeTab === 'interaction' ? 'block' : 'hidden'} lg:block`}>
                <div className="flex items-center justify-between mb-6 px-2">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center">
                    <MessageSquare className="w-5 h-5 text-purple-400 mr-2" />
                    互动热议榜
                  </h2>
                  <span className="text-xs font-medium px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full">
                    Top {interactionRank.length}
                  </span>
                </div>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {interactionRank.map((topic, index) => renderTopicCard(topic, index, 'interaction'))}
                </motion.div>
              </div>
            </div>
          </>
        )}

        <footer className="mt-20 py-8 border-t border-zinc-800/50 text-center text-zinc-500 text-sm">
          <p>Powered by Trae Forum Discourse API &bull; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
