import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';

function App() {
  return (
    <div className="flex h-screen overflow-hidden text-zinc-900 bg-zinc-50">
      <div className="no-print h-full">
        <Sidebar />
      </div>
      <div className="flex-1 h-full relative">
        <PreviewArea />
      </div>
    </div>
  );
}

export default App;
