import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

interface ChatStore {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setActiveSession: (id: string) => void;
  addMessage: (content: string, role: 'user' | 'agent') => void;
  createNewSession: () => void;
}

const mockInitialSession: ChatSession = {
  id: 'session-1',
  title: 'New Chat',
  messages: [
    {
      id: 'msg-1',
      role: 'agent',
      content: 'Hello! I am your AI coding assistant. How can I help you build today?',
      timestamp: Date.now(),
    },
  ],
  updatedAt: Date.now(),
};

export const useChatStore = create<ChatStore>((set, get) => ({
  sessions: [mockInitialSession],
  activeSessionId: 'session-1',
  isSidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveSession: (id) => set({ activeSessionId: id }),
  createNewSession: () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      updatedAt: Date.now(),
    };
    set((state) => ({
      sessions: [newSession, ...state.sessions],
      activeSessionId: newSession.id,
    }));
  },
  addMessage: (content, role) => {
    set((state) => {
      const activeSessionId = state.activeSessionId;
      if (!activeSessionId) return state;

      const sessions = state.sessions.map((session) => {
        if (session.id === activeSessionId) {
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            role,
            content,
            timestamp: Date.now(),
          };
          
          let title = session.title;
          if (title === 'New Chat' && role === 'user') {
            title = content.slice(0, 30) + (content.length > 30 ? '...' : '');
          }

          return {
            ...session,
            title,
            messages: [...session.messages, newMessage],
            updatedAt: Date.now(),
          };
        }
        return session;
      });

      return { sessions };
    });
  },
}));
