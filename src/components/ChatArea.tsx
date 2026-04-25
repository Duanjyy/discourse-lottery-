import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { InputArea } from './InputArea';
import { MessageBubble } from './MessageBubble';
import { PanelLeft, PanelLeftClose, ChevronDown, GitCommit, BrainCircuit, Gamepad2, FileText, BarChart3, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export function ChatArea() {
  const { sessions, activeSessionId, isSidebarOpen, toggleSidebar } = useChatStore();
  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-warm-bg relative rounded-tl-xl border-t border-l border-warm-border shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Header Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-warm-bg">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-warm-muted transition-colors rounded-md hover:text-warm-text hover:bg-black/5"
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
          </button>
          <h1 className="text-sm font-semibold text-warm-text">
            {activeSession?.title || 'New thread'}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-medium text-warm-text">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-md hover:bg-black/10 transition-colors">
            <div className="w-4 h-4 bg-warm-text text-white rounded-sm flex items-center justify-center text-[10px]">A</div>
            <span>Open</span>
            <ChevronDown size={14} className="text-warm-muted" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-md hover:bg-black/10 transition-colors">
            <GitCommit size={14} />
            <span>Commit</span>
            <ChevronDown size={14} className="text-warm-muted" />
          </button>
          <div className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-black/5 rounded-md text-green-600">
            <Plus size={14} />
            <span>1,698 -0</span>
          </div>
        </div>
      </header>

      {/* Messages Flow */}
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
        <div className="max-w-4xl mx-auto px-4 py-8 pb-48">
          {activeSession?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-24">
              <div className="mb-6 flex flex-col items-center">
                <BrainCircuit size={48} className="text-warm-text mb-4" strokeWidth={1.5} />
                <h2 className="text-2xl font-semibold text-warm-text tracking-tight">Let's build</h2>
                <button className="flex items-center gap-1 mt-1 text-xl font-medium text-warm-muted hover:text-warm-text transition-colors">
                  <span>Dropkit v2</span>
                  <ChevronDown size={20} />
                </button>
              </div>

              {/* Suggestions */}
              <div className="w-full max-w-3xl mt-12">
                <div className="flex justify-end mb-3">
                  <button className="text-xs text-warm-muted hover:text-warm-text transition-colors">
                    Explore more
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-warm-border rounded-xl hover:shadow-soft transition-all cursor-pointer group bg-white">
                    <Gamepad2 size={18} className="text-blue-500 mb-3" />
                    <p className="text-sm font-medium text-warm-text">Build a classic Snake game in this repo.</p>
                  </div>
                  <div className="p-4 border border-warm-border rounded-xl hover:shadow-soft transition-all cursor-pointer group bg-white">
                    <FileText size={18} className="text-purple-500 mb-3" />
                    <p className="text-sm font-medium text-warm-text">Create a one-page $pdf that summarizes this app.</p>
                  </div>
                  <div className="p-4 border border-warm-border rounded-xl hover:shadow-soft transition-all cursor-pointer group bg-white">
                    <BarChart3 size={18} className="text-cyan-500 mb-3" />
                    <p className="text-sm font-medium text-warm-text">Summarize last week's PRs by teammate and theme.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {activeSession?.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MessageBubble message={message} />
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area Container */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-warm-bg via-warm-bg to-transparent pt-12 pb-0 px-4">
        <div className="max-w-4xl mx-auto">
          <InputArea />
        </div>
      </div>
    </div>
  );
}
