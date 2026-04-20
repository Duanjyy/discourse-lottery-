import { Paper } from './Paper';
import { useAppStore } from '../store';
import { Download, Printer, Image as ImageIcon, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { usePagination } from '../hooks/usePagination';
import { ProblemRenderer } from './ProblemRenderer';

export const PreviewArea = () => {
  const store = useAppStore();
  const { pages, isMeasuring, measureRef } = usePagination();

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (pages.length === 0) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      for (let i = 0; i < pages.length; i++) {
        const paper = document.getElementById(`paper-${i}`);
        if (!paper) continue;

        const canvas = await html2canvas(paper, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save(`语文练习卷_${store.grade}年级.pdf`);
    } catch (error) {
      console.error('Export PDF failed', error);
    }
  };

  const handleExportImage = async () => {
    if (pages.length === 0) return;

    try {
      for (let i = 0; i < pages.length; i++) {
        const paper = document.getElementById(`paper-${i}`);
        if (!paper) continue;

        const canvas = await html2canvas(paper, { scale: 2 });
        const link = document.createElement('a');
        link.download = `语文练习卷_${store.grade}年级_第${i+1}页.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
        
        // Add a small delay between downloads to prevent browser blocking
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Export Image failed', error);
    }
  };

  const getColumnsClass = (cols: number | 'auto') => {
    if (cols === 'auto') return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4';
    switch (cols) {
      case 1: return 'columns-1';
      case 2: return 'columns-2';
      case 3: return 'columns-3';
      case 4: return 'columns-4';
      default: return 'columns-1';
    }
  };

  return (
    <div className="flex-1 bg-zinc-100 h-screen overflow-y-auto custom-scrollbar relative flex flex-col items-center py-10 print:py-0 print:bg-white overflow-x-auto">
      <div className="absolute top-6 right-8 flex gap-3 no-print z-50">
        <button
          onClick={handlePrint}
          disabled={isMeasuring || store.problems.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Printer size={16} />
          <span>打印</span>
        </button>
        <button
          onClick={handleExportPDF}
          disabled={isMeasuring || store.problems.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          <span>存为PDF</span>
        </button>
        <button
          onClick={handleExportImage}
          disabled={isMeasuring || store.problems.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ImageIcon size={16} />
          <span>存为图片</span>
        </button>
      </div>

      {isMeasuring && store.problems.length > 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100/80 z-40 backdrop-blur-sm no-print">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mb-4" />
          <p className="text-emerald-800 font-medium tracking-widest">正在智能排版中...</p>
        </div>
      )}

      <div className="flex flex-row gap-8 px-8 items-start min-w-max pb-20 print:flex-col print:px-0 print:gap-0 print:w-full print:min-w-0">
        {pages.map((page, index) => (
          <div key={page.id} id={`paper-${index}`} className="print:break-after-page print:w-full">
            <Paper page={page} />
          </div>
        ))}
        
        {/* Answers Section */}
        {store.answerMode === 'separate' && store.problems.length > 0 && !isMeasuring && (
          <div className="shrink-0 w-[210mm] print:w-full print:break-before-page no-print">
            <div className="bg-white shadow-xl mx-auto p-12 paper relative overflow-hidden text-zinc-900 border-t-8 border-emerald-600 min-h-[297mm]">
              <h2 className="text-2xl font-bold tracking-widest text-center text-zinc-900 mb-8 border-b border-zinc-200 pb-4">参考答案</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {store.problems.map((p, idx) => (
                  <div key={p.id} className="flex gap-4 text-sm border-b border-zinc-100 pb-2 break-inside-avoid">
                    <span className="font-bold text-zinc-500 shrink-0 w-6">{idx + 1}.</span>
                    <span className="text-red-600 break-words flex-1">{p.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {store.problems.length === 0 && !isMeasuring && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 bg-white shadow-xl mx-auto my-8 p-12 w-[210mm] min-h-[297mm]">
          <div className="w-24 h-24 mb-4 opacity-20 border-4 border-dashed border-zinc-400 rounded-full" />
          <p className="text-lg tracking-widest">请在左侧点击“一键生成试卷”</p>
        </div>
      )}

      {/* Hidden container for measuring heights with EXACT column widths */}
      <div 
        ref={measureRef} 
        className="absolute top-0 left-0 w-[210mm] opacity-0 pointer-events-none p-12 -z-50"
      >
        {store.topics.filter(t => t.enabled).map(t => {
          const problems = store.problems.filter(p => p.type === t.id);
          if (problems.length === 0) return null;
          
          return (
            <div key={t.id} className="mb-8">
              {store.isGrouped && (
                <h2 data-topic-id={t.id} className="text-lg font-bold text-emerald-800 mb-4 bg-emerald-50 py-1 px-3 border-l-4 border-emerald-600 inline-block rounded-r-md">
                  {t.name}
                </h2>
              )}
              <div className={`gap-8 ${getColumnsClass(t.columns)}`}>
                {problems.map(p => (
                  <div key={p.id} className="break-inside-avoid w-full inline-block">
                    <div data-problem-id={p.id}>
                      <ProblemRenderer problem={p} index={0} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
