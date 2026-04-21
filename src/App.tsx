import { SettingsPanel } from './components/SettingsPanel';
import { PreviewArea } from './components/PreviewArea';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-800 bg-[#f8fafc] font-sans selection:bg-teal-200 selection:text-teal-900">
      <div className="no-print w-full z-20 shadow-sm border-b border-slate-200 bg-white">
        <SettingsPanel />
      </div>
      <div className="flex-1 w-full relative z-10">
        <PreviewArea />
      </div>
    </div>
  );
}

export default App;
