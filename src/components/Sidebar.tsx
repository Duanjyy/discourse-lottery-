import React from 'react';
import { useChatStore } from '../store/chatStore';
import { Plus, Settings, User, X, Folder, LayoutGrid, Cpu, SquarePen } from 'lucide-react';
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
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
        </div>

        {/* Top Navigation */}
        <div className="px-3 space-y-1">
          <button 
            onClick={createNewSession}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg text-warm-text hover:bg-black/5"
          >
            <SquarePen size={16} className="text-warm-muted" />
            <span>New thread</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg text-warm-text hover:bg-black/5">
            <Cpu size={16} className="text-warm-muted" />
            <span>Automations</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg text-warm-text hover:bg-black/5">
            <LayoutGrid size={16} className="text-warm-muted" />
            <span>Skills</span>
          </button>
        </div>

        {/* Threads Section */}
        <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar px-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold text-warm-muted">Threads</span>
            <button className="text-warm-muted hover:text-warm-text">
              <Folder size={14} />
            </button>
          </div>
          
          <div className="space-y-1">
            <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg text-warm-text hover:bg-black/5">
              <Folder size={16} className="text-warm-muted" />
              <span>Dropkit v2</span>
            </button>
            <div className="pl-9 py-2 text-xs text-warm-muted font-medium">
              No threads
            </div>
          </div>
        </div>

        {/* Footer - Personal */}
        <div className="p-3 border-t border-warm-border">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg font-medium transition-colors text-warm-text hover:bg-black/5">
            <div className="w-5 h-5 rounded-full bg-warm-border flex items-center justify-center border border-black/10">
              <User size={12} className="text-warm-muted" />
            </div>
            <span>Personal</span>
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
