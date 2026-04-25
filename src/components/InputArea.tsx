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
        "relative flex flex-col w-full bg-codex-input border rounded-xl shadow-lg transition-all duration-200",
        isFocused ? "border-codex-accent shadow-codex-accent/20" : "border-zinc-700/50 hover:border-zinc-600/80"
      )}
    >
      <div className="flex items-end gap-2 p-3">
        <button
          type="button"
          className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-700/50"
          title="Upload file"
        >
          <FileUp size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask Codex to write code..."
          className="flex-1 max-h-[200px] min-h-[24px] py-1.5 bg-transparent border-none outline-none resize-none text-zinc-100 placeholder:text-zinc-500 custom-scrollbar"
          rows={1}
        />

        <button
          type="submit"
          disabled={!content.trim()}
          className={clsx(
            "p-2 rounded-lg transition-all",
            content.trim()
              ? "bg-codex-accent text-white hover:bg-blue-400"
              : "bg-zinc-700/30 text-zinc-500 cursor-not-allowed"
          )}
        >
          <Send size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/50 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-codex-accent" />
          <span>Codex AI Model</span>
        </div>
        <div className="hidden sm:block">Press <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300">Shift</kbd> + <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300">Enter</kbd> for new line</div>
      </div>
    </form>
  );
}
