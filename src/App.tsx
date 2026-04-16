import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Editor from "@/pages/Editor"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}
