import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const success = await login(form);
    if (success) navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative", zIndex: 1, padding: 24
    }}>
      <div style={{
        width: "100%", maxWidth: 420,
        background: "var(--s1)", border: "1px solid var(--b1)",
        borderRadius: 20, padding: 36,
        display: "flex", flexDirection: "column", gap: 24
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, margin: "0 auto 16px",
            background: "linear-gradient(135deg,#4f8eff,#7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
          }}>🔍</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            Sign in to your TruthLens account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)",
            borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#f87171"
          }}>❌ {error}</div>
        )}

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, letterSpacing: "0.5px" }}>EMAIL</div>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              style={{
                width: "100%", background: "var(--s2)",
                border: "1px solid var(--b1)", borderRadius: 10,
                padding: "11px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13, color: "var(--text)", outline: "none",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, letterSpacing: "0.5px" }}>PASSWORD</div>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={{
                width: "100%", background: "var(--s2)",
                border: "1px solid var(--b1)", borderRadius: 10,
                padding: "11px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13, color: "var(--text)", outline: "none",
              }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !form.email || !form.password}
          style={{
            width: "100%",
            background: loading ? "var(--s3)" : "linear-gradient(135deg,#4f8eff,#7c3aed)",
            border: "none", borderRadius: 10, padding: "13px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14, fontWeight: 600, color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "var(--b1)" }} />
          <span style={{ fontSize: 12, color: "var(--muted2)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--b1)" }} />
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
