import { Paper } from './Paper';
import { useAppStore } from '../store';
import { Download, Printer, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PreviewArea = () => {
  const store = useAppStore();

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    const paper = document.getElementById('paper');
    if (!paper) return;

    try {
      const canvas = await html2canvas(paper, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`语文练习卷_${store.grade}年级.pdf`);
    } catch (error) {
      console.error('Export PDF failed', error);
    }
  };

  const handleExportImage = async () => {
    const paper = document.getElementById('paper');
    if (!paper) return;

    try {
      const canvas = await html2canvas(paper, { scale: 2 });
      const link = document.createElement('a');
      link.download = `语文练习卷_${store.grade}年级.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();
    } catch (error) {
      console.error('Export Image failed', error);
    }
  };

  return (
    <div className="flex-1 bg-zinc-100 h-screen overflow-y-auto custom-scrollbar relative flex flex-col items-center py-10 print:py-0 print:bg-white">
      <div className="absolute top-6 right-8 flex gap-3 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm"
        >
          <Printer size={16} />
          <span>打印</span>
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm"
        >
          <Download size={16} />
          <span>存为PDF</span>
        </button>
        <button
          onClick={handleExportImage}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm"
        >
          <ImageIcon size={16} />
          <span>存为图片</span>
        </button>
      </div>

      <Paper />
      
      {store.answerMode === 'separate' && store.problems.length > 0 && (
        <div className="mt-12 no-print">
          <div className="w-[210mm] bg-white shadow-xl mx-auto p-12 paper relative overflow-hidden text-zinc-900 border-t-8 border-emerald-600">
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
  );
};
