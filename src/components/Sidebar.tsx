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
          "fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-codex-sidebar transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-zinc-800",
          !isSidebarOpen && "-translate-x-full md:hidden"
        )}
      >
        {/* Header - New Chat Button */}
        <div className="p-3">
          <button 
            onClick={createNewSession}
            className="flex items-center gap-3 w-full px-3 py-3 text-sm font-medium transition-colors border border-zinc-700/50 rounded-md hover:bg-zinc-800/50 text-zinc-100"
          >
            <Plus size={16} />
            <span>New chat</span>
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
          <div className="text-xs font-semibold text-zinc-500 mb-3 px-3">Today</div>
          <div className="space-y-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={clsx(
                  "flex items-center gap-3 w-full px-3 py-3 text-sm rounded-md transition-all group",
                  activeSessionId === session.id 
                    ? "bg-zinc-800 text-white" 
                    : "text-zinc-300 hover:bg-zinc-800/50"
                )}
              >
                <MessageSquare size={16} className={activeSessionId === session.id ? "text-codex-accent" : "text-zinc-500"} />
                <span className="truncate flex-1 text-left">{session.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer - User & Settings */}
        <div className="p-3 border-t border-zinc-800 space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-3 text-sm rounded-md transition-colors text-zinc-300 hover:bg-zinc-800/50">
            <User size={16} />
            <span>Account</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-3 text-sm rounded-md transition-colors text-zinc-300 hover:bg-zinc-800/50">
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>

        {/* Mobile close button */}
        <button 
          className="absolute top-4 -right-12 p-2 text-zinc-400 hover:text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </aside>
    </>
  );
}
