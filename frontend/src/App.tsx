import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard"; // 👈 add kiya

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} /> // 👈 add kiya
        </Routes>
      </div>
    </Router>
  );
};

export default App;