import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    <div className="relative rounded-2xl overflow-hidden border border-warm-border bg-warm-code font-mono text-sm shadow-sm my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/5 text-warm-muted text-xs font-bold select-none border-b border-warm-border">
        <span className="uppercase tracking-wider">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-warm-text transition-colors"
        >
          {isCopied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code */}
      <div className="custom-scrollbar overflow-x-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '13.5px',
            lineHeight: '1.6',
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1.2em',
            color: '#A0988F',
            textAlign: 'right',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
