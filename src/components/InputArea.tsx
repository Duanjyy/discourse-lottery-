import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { Send, FileUp, Sparkles } from 'lucide-react';
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
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "relative flex flex-col w-full bg-warm-input border rounded-3xl shadow-float transition-all duration-300",
        isFocused ? "border-warm-accent shadow-warm-accent/10" : "border-warm-border hover:border-warm-accent/50"
      )}
    >
      <div className="flex items-end gap-3 p-4">
        <button
          type="button"
          className="p-2.5 text-warm-muted hover:text-warm-text transition-colors rounded-2xl hover:bg-black/5"
          title="Upload file"
        >
          <FileUp size={22} />
        </button>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask AI to write code..."
          className="flex-1 max-h-[200px] min-h-[24px] py-2.5 bg-transparent border-none outline-none resize-none text-warm-text placeholder:text-warm-muted custom-scrollbar font-medium"
          rows={1}
        />

        <button
          type="submit"
          disabled={!content.trim()}
          className={clsx(
            "p-3 rounded-full transition-all",
            content.trim()
              ? "bg-warm-accent text-white hover:bg-[#C29363] shadow-sm scale-100"
              : "bg-black/5 text-warm-muted cursor-not-allowed scale-95"
          )}
        >
          <Send size={20} className={clsx(content.trim() && "translate-x-0.5 -translate-y-0.5")} />
        </button>
      </div>

      <div className="flex items-center justify-between px-6 py-3 border-t border-warm-border/50 text-xs font-bold text-warm-muted bg-black/[0.02] rounded-b-3xl">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-warm-accent" />
          <span>AI Model</span>
        </div>
        <div className="hidden sm:block tracking-wide">Press <kbd className="px-1.5 py-0.5 bg-black/5 border border-black/10 rounded text-warm-text font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-black/5 border border-black/10 rounded text-warm-text font-mono">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-black/5 border border-black/10 rounded text-warm-text font-mono">Enter</kbd> for new line</div>
      </div>
    </form>
  );
}
