import React from 'react';
import { useChatStore } from '../store/chatStore';
import { MessageSquare, Plus, Settings, User, X, PanelLeftClose } from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const { 
    sessions, 
    activeSessionId, 
    isSidebarOpen, 
    setSidebarOpen,
    setActiveSession,
    createNewSession 
  } = useChatStore();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-warm-sidebar transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-warm-border",
          !isSidebarOpen && "-translate-x-full md:hidden"
        )}
      >
        {/* Header - New Chat Button */}
        <div className="p-4">
          <button 
            onClick={createNewSession}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold transition-all border border-warm-border rounded-2xl bg-warm-bg hover:shadow-soft text-warm-text hover:bg-white"
          >
            <Plus size={18} className="text-warm-accent" />
            <span>New chat</span>
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
          <div className="text-xs font-bold text-warm-muted mb-3 px-3 uppercase tracking-wider">Today</div>
          <div className="space-y-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={clsx(
                  "flex items-center gap-3 w-full px-4 py-3 text-sm rounded-2xl transition-all group",
                  activeSessionId === session.id 
                    ? "bg-white text-warm-text shadow-soft border border-warm-border/50" 
                    : "text-warm-muted hover:bg-black/5 hover:text-warm-text border border-transparent"
                )}
              >
                <MessageSquare size={16} className={activeSessionId === session.id ? "text-warm-accent" : "text-warm-muted/70 group-hover:text-warm-muted"} />
                <span className="truncate flex-1 text-left font-medium">{session.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer - User & Settings */}
        <div className="p-4 border-t border-warm-border space-y-1">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm rounded-2xl font-medium transition-colors text-warm-text hover:bg-black/5">
            <User size={18} className="text-warm-muted" />
            <span>Account</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm rounded-2xl font-medium transition-colors text-warm-text hover:bg-black/5">
            <Settings size={18} className="text-warm-muted" />
            <span>Settings</span>
          </button>
        </div>

        {/* Mobile close button */}
        <button 
          className="absolute top-4 -right-12 p-2 text-warm-bg md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </aside>
    </>
  );
}
