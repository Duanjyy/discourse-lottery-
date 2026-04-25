import React from 'react';
import { Message } from '../store/chatStore';
import { User, Bot, FileCode2 } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { clsx } from 'clsx';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\w]*\n[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```([\w]*)\n([\s\S]*?)```/);
        if (match) {
          const language = match[1] || 'text';
          const code = match[2].trim();
          return <CodeBlock key={index} code={code} language={language} />;
        }
      }
      return (
        <p key={index} className="whitespace-pre-wrap leading-relaxed text-zinc-300 font-sans">
          {part}
        </p>
      );
    });
  };

  return (
    <div
      className={clsx(
        "flex w-full group py-4 px-2 md:px-4 rounded-xl transition-colors",
        isUser ? "bg-transparent" : "bg-zinc-900/40"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mr-4">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center shadow-md",
            isUser ? "bg-zinc-800 text-zinc-200" : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
          )}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-zinc-200">
            {isUser ? 'You' : 'Codex Agent'}
          </span>
          <span className="text-xs text-zinc-500">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="text-[15px] space-y-4">
          {renderContent(message.content)}
        </div>
      </div>

      {/* Action Buttons (visible on hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex flex-col gap-1">
        {!isUser && (
          <button className="p-1.5 text-zinc-500 hover:text-white rounded hover:bg-zinc-800 transition-colors" title="Copy response">
            <FileCode2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
