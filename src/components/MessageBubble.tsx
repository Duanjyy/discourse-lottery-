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
        <p key={index} className="whitespace-pre-wrap leading-relaxed text-warm-text font-sans">
          {part}
        </p>
      );
    });
  };

  return (
    <div
      className={clsx(
        "flex w-full group py-5 px-4 md:px-6 rounded-[2rem] transition-all",
        isUser ? "bg-warm-user shadow-sm border border-warm-border/30" : "bg-warm-bubble shadow-float border border-warm-border/40"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mr-4 mt-1">
        <div
          className={clsx(
            "w-9 h-9 rounded-full flex items-center justify-center shadow-sm",
            isUser ? "bg-warm-bg text-warm-text border border-warm-border" : "bg-warm-accent text-white"
          )}
        >
          {isUser ? <User size={18} /> : <Bot size={20} />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden mt-1.5">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-sm text-warm-text">
            {isUser ? 'You' : 'AI Agent'}
          </span>
          <span className="text-xs font-medium text-warm-muted">
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
          <button className="p-2 text-warm-muted hover:text-warm-text rounded-xl hover:bg-black/5 transition-colors" title="Copy response">
            <FileCode2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
