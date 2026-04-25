import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { useChatStore } from './store/chatStore';

export default function App() {
  const { isSidebarOpen } = useChatStore();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-warm-bg text-warm-text selection:bg-warm-user selection:text-warm-text">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-0' : 'ml-0'
        }`}
      >
        <ChatArea />
      </main>
    </div>
  );
}
