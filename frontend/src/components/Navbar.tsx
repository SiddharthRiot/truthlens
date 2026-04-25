import React from "react";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, getUsername, logout, isAdmin } from "../services/authService";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const username = getUsername();
  const admin = isAdmin();

  const tabs = [
    { label: "Analyzer", path: "/" },
    { label: "How it works", path: "/how-it-works" },
    { label: "About", path: "/about" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

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
        <Logo size={28} />
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

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* AI Status */}
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

        {/* Auth buttons */}
        {loggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontSize: 12, color: "var(--muted)",
              background: "var(--b1)", padding: "5px 12px",
              borderRadius: 999, border: "1px solid var(--b1)"
            }}>👤 {username}</span>

            {/* Dashboard link - sabko dikhega */}
            <Link to="/dashboard" style={{
              fontSize: 12, padding: "5px 14px", borderRadius: 6,
              color: location.pathname === "/dashboard" ? "var(--text)" : "var(--muted)",
              background: location.pathname === "/dashboard" ? "var(--b1)" : "transparent",
              textDecoration: "none", fontWeight: 500,
              border: "1px solid var(--b1)"
            }}>Dashboard</Link>

            {/* Admin link - sirf admin ko dikhega */}
            {admin && (
              <Link to="/admin" style={{
                fontSize: 12, padding: "5px 14px", borderRadius: 6,
                color: "var(--accent)", textDecoration: "none",
                border: "1px solid rgba(79,142,255,0.2)",
                background: "rgba(79,142,255,0.08)", fontWeight: 500
              }}>Admin</Link>
            )}

            <button onClick={handleLogout} style={{
              fontSize: 12, padding: "5px 14px", borderRadius: 6,
              color: "var(--red)", background: "rgba(244,63,94,0.08)",
              border: "1px solid rgba(244,63,94,0.15)",
              cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/login" style={{
              fontSize: 12, padding: "5px 14px", borderRadius: 6,
              color: "var(--muted)", textDecoration: "none",
              border: "1px solid var(--b1)",
            }}>Sign in</Link>
            <Link to="/register" style={{
              fontSize: 12, padding: "5px 14px", borderRadius: 6,
              color: "#fff", textDecoration: "none",
              background: "linear-gradient(135deg,#4f8eff,#7c3aed)",
              fontWeight: 600,
            }}>Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;