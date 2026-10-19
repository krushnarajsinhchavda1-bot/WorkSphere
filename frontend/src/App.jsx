import { Routes, Route, Link } from "react-router-dom";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Projects</Link>
        <Link to="/tasks">Tasks</Link>
      </nav>

      <div className="container">
        <h1>WorkSphere</h1>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
