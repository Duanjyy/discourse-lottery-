import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { Send, FileUp, Sparkles, Plus, Smile, Mic, ChevronDown, GitBranch } from 'lucide-react';
import { clsx } from 'clsx';

export function InputArea() {
  const { addMessage } = useChatStore();
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addMessage(content.trim(), 'user');
    setContent('');
    
    // Simulate Agent response
    setTimeout(() => {
      const agentResponse = `Here is a simulated response based on your request:\n\n\`\`\`javascript\nfunction simulateResponse() {\n  console.log("Simulating response for: ${content.slice(0, 20)}...");\n  return true;\n}\n\`\`\`\n\nHope this helps!`;
      addMessage(agentResponse, 'agent');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [content]);

  return (
    <div className="flex flex-col w-full pb-2">
      <form
        onSubmit={handleSubmit}
        className={clsx(
          "relative flex flex-col w-full bg-white border border-warm-border rounded-[1.5rem] shadow-input transition-all duration-300 mb-2",
          isFocused ? "border-warm-muted shadow-float" : "hover:border-warm-muted/50"
        )}
      >
        <div className="flex flex-col p-4 pb-2">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            className="w-full max-h-[200px] min-h-[48px] bg-transparent border-none outline-none resize-none text-warm-text placeholder:text-warm-muted custom-scrollbar font-medium"
            rows={2}
          />
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-warm-muted hover:text-warm-text transition-colors rounded-full hover:bg-black/5"
            >
              <Plus size={18} />
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-warm-muted hover:text-warm-text transition-colors rounded-full hover:bg-black/5"
            >
              <span>GPT-5.2-Codex Medium</span>
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-warm-muted hover:text-warm-text transition-colors rounded-full hover:bg-black/5"
            >
              <Smile size={18} />
            </button>
            <button
              type="button"
              className="p-2 text-warm-muted hover:text-warm-text transition-colors rounded-full hover:bg-black/5 mr-1"
            >
              <Mic size={18} />
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className={clsx(
                "p-2 rounded-full transition-all flex items-center justify-center w-8 h-8",
                content.trim()
                  ? "bg-warm-text text-white shadow-sm"
                  : "bg-black/10 text-white cursor-not-allowed"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
        </div>
      </form>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-2 text-[11px] font-medium text-warm-muted">
        <div className="flex items-center gap-4">
          <button className="text-warm-text hover:underline">Local</button>
          <button className="hover:text-warm-text transition-colors">Worktree</button>
          <button className="hover:text-warm-text transition-colors">Cloud</button>
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-warm-text transition-colors">
          <GitBranch size={12} />
          <span>main</span>
        </div>
      </div>
    </div>
  );
}
