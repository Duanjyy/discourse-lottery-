import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Header } from '../components/Header';
import { Editor } from '../components/Editor/Editor';
import { Preview } from '../components/Preview/Preview';

export const Home: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleExport = useReactToPrint({
    contentRef: componentRef,
    documentTitle: '我的简历',
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-100">
      <Header onExport={() => handleExport()} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-1/3 min-w-[400px] border-r border-zinc-200 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <Editor />
        </div>
        
        {/* Right Side: Preview */}
        <div className="flex-1 bg-zinc-200/50">
          <Preview ref={componentRef} />
        </div>
      </div>
    </div>
  );
};
