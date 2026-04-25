import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { label: "Analyzer", path: "/" },
    { label: "How it works", path: "/how-it-works" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: "52px",
      background: "rgba(4,5,10,0.88)",
      backdropFilter: "blur(24px)",
      borderBottom: "1px solid var(--b1)"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "linear-gradient(135deg,#4f8eff,#7c3aed)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13
        }}>🔍</div>
        <span style={{ background: "linear-gradient(90deg,#f0f4ff,#8ba4d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          TruthLens
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {tabs.map(tab => (
          <Link key={tab.path} to={tab.path} style={{
            fontSize: 12, padding: "5px 14px", borderRadius: 6,
            color: location.pathname === tab.path ? "var(--text)" : "var(--muted)",
            background: location.pathname === tab.path ? "var(--b1)" : "transparent",
            textDecoration: "none", fontWeight: 500,
          }}>{tab.label}</Link>
        ))}
      </div>

      {/* Status */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 999, padding: "4px 12px",
        fontSize: 11, color: "var(--green)", fontWeight: 500
      }}>
        <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
        AI Online
      </div>
    </nav>
  );
};

export default Navbar;
