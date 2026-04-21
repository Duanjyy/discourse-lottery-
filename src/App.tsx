import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';

function App() {
  return (
    <div className="flex h-screen overflow-hidden text-slate-800 bg-[#f8fafc] font-sans selection:bg-teal-200 selection:text-teal-900">
      <div className="no-print h-full w-[380px] shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <Sidebar />
      </div>
      <div className="flex-1 h-full relative z-10">
        <PreviewArea />
      </div>
    </div>
  );
}

export default App;
