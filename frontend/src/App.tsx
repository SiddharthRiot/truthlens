import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

const App: React.FC = () => {
  return (
    <Router>
      <div className="mesh-blob blob1" />
      <div className="mesh-blob blob2" />
      <div className="mesh-blob blob3" />

      <Navbar />

      <div style={{ paddingTop: 52 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
