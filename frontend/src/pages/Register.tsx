import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register: React.FC = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", username: "", password: "", confirm: "" });
  const [localError, setLocalError] = useState("");

  const handleSubmit = async () => {
    if (form.password !== form.confirm) {
      setLocalError("Passwords do not match!");
      return;
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters!");
      return;
    }
    setLocalError("");
    const success = await register({
      email: form.email,
      username: form.username,
      password: form.password,
    });
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
            Create account
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            Join TruthLens — fight misinformation
          </p>
        </div>

        {/* Error */}
        {(error || localError) && (
          <div style={{
            background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)",
            borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#f87171"
          }}>❌ {error || localError}</div>
        )}

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "EMAIL", key: "email", type: "email", placeholder: "you@example.com" },
            { label: "USERNAME", key: "username", type: "text", placeholder: "cooluser123" },
            { label: "PASSWORD", key: "password", type: "password", placeholder: "••••••••" },
            { label: "CONFIRM PASSWORD", key: "confirm", type: "password", placeholder: "••••••••" },
          ].map(field => (
            <div key={field.key}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, letterSpacing: "0.5px" }}>
                {field.label}
              </div>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                style={{
                  width: "100%", background: "var(--s2)",
                  border: "1px solid var(--b1)", borderRadius: 10,
                  padding: "11px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13, color: "var(--text)", outline: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !form.email || !form.username || !form.password}
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
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "var(--b1)" }} />
          <span style={{ fontSize: 12, color: "var(--muted2)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--b1)" }} />
        </div>

        {/* Login link */}
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
