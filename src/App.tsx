import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Projects from "./pages/projects/Projects";
import Resume from "./pages/resume/Resume";
import Error from "./pages/error/Error";
import MainLayout from "./layout/layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
