import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Collection from "./pages/Collection";
import { AudioProvider } from "./hooks/useAudio";

export default function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}
