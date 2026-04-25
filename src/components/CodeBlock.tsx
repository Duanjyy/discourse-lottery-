import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-codex-code font-mono text-sm shadow-xl my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 text-zinc-400 text-xs font-semibold select-none border-b border-zinc-800/50">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code */}
      <div className="custom-scrollbar overflow-x-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '13px',
            lineHeight: '1.5',
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#6e7681',
            textAlign: 'right',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
