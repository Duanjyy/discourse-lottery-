import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { InputArea } from './InputArea';
import { MessageBubble } from './MessageBubble';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
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
    <div className="flex-1 flex flex-col h-full bg-warm-bg relative">
      {/* Header Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-warm-border/50 bg-warm-bg/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 text-warm-muted transition-colors rounded-xl hover:text-warm-text hover:bg-black/5"
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
          </button>
          <h1 className="text-sm font-bold text-warm-text">
            {activeSession?.title || 'New Chat'}
          </h1>
        </div>
      </header>

      {/* Messages Flow */}
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
        <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
          {activeSession?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-warm-muted mt-32">
              <h2 className="text-2xl font-black mb-3 text-warm-text tracking-tight">AI Assistant</h2>
              <p className="text-sm max-w-md text-center leading-relaxed">
                I can help you write, debug, and explain code. What would you like to build today?
              </p>
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
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-warm-bg via-warm-bg/95 to-transparent pt-12 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <InputArea />
        </div>
        <div className="text-center mt-3 text-xs text-warm-muted font-sans font-medium">
          AI can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}
