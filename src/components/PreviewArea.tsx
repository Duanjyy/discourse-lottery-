import { Paper } from './Paper';
import { useAppStore } from '../store';
import { Download, Printer, Image as ImageIcon, Loader2, BookOpen } from 'lucide-react';
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
    <div className="w-full bg-slate-100/50 absolute inset-0 overflow-y-auto custom-scrollbar flex flex-col items-center py-10 print:py-0 print:bg-white print:overflow-visible">
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 no-print z-30">
        <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-200/60 flex flex-col gap-1">
          <button
            onClick={handlePrint}
            disabled={isMeasuring || store.problems.length === 0}
            className="flex items-center justify-center gap-2 p-3 bg-white text-slate-700 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            title="打印"
          >
            <Printer size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <div className="w-8 h-px bg-slate-200 mx-auto" />
          <button
            onClick={handleExportPDF}
            disabled={isMeasuring || store.problems.length === 0}
            className="flex items-center justify-center gap-2 p-3 bg-white text-slate-700 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            title="存为PDF"
          >
            <Download size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <div className="w-8 h-px bg-slate-200 mx-auto" />
          <button
            onClick={handleExportImage}
            disabled={isMeasuring || store.problems.length === 0}
            className="flex items-center justify-center gap-2 p-3 bg-white text-slate-700 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            title="存为图片"
          >
            <ImageIcon size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {isMeasuring && store.problems.length > 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100/80 z-40 backdrop-blur-sm no-print">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mb-4" />
          <p className="text-teal-800 font-bold tracking-widest">正在智能排版中...</p>
        </div>
      )}

      {/* Pages Container */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-12 pb-20 px-8 w-fit mx-auto print:block print:px-0 print:gap-0 print:w-full print:mx-0">
        {pages.map((page, index) => (
          <div key={page.id} id={`paper-${index}`} className="print:break-after-page print:w-full">
            <Paper page={page} />
          </div>
        ))}
        
        {/* Answers Section */}
        {store.answerMode === 'separate' && store.problems.length > 0 && !isMeasuring && (
          <div className="shrink-0 w-[210mm] print:w-full print:break-before-page no-print mb-20 2xl:col-span-1">
            <div className="bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] rounded-lg mx-auto p-12 relative overflow-hidden text-slate-800 border-t-[12px] border-teal-600 min-h-[297mm]">
              <h2 className="text-2xl font-bold tracking-[0.2em] text-center text-slate-800 mb-10 pb-6 border-b-2 border-slate-100">
                参考答案
              </h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {store.problems.map((p, idx) => (
                  <div key={p.id} className="flex gap-4 text-sm border-b border-slate-100 pb-3 break-inside-avoid hover:bg-slate-50 transition-colors px-2 rounded-t">
                    <span className="font-bold text-slate-400 shrink-0 w-6 pt-0.5">{idx + 1}.</span>
                    <span className="text-rose-600 break-words flex-1 font-medium leading-relaxed">{p.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {store.problems.length === 0 && !isMeasuring && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white shadow-[0_0_40px_rgba(0,0,0,0.05)] mx-auto my-12 p-12 w-[210mm] min-h-[297mm] rounded-xl border border-slate-100">
          <div className="w-24 h-24 mb-6 opacity-20 border-4 border-dashed border-slate-400 rounded-full flex items-center justify-center">
            <BookOpen size={32} />
          </div>
          <p className="text-lg tracking-widest font-medium text-slate-500">请在左侧点击“一键生成试卷”</p>
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
