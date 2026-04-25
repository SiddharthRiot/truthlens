import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserStats, getUserHistory } from "../services/userService";
import { isLoggedIn } from "../services/authService";

interface Profile {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

interface Stats {
  total: number;
  fake: number;
  real: number;
  suspicious: number;
  mostly_true: number;
  avg_trust_score: number;
}

interface HistoryItem {
  id: number;
  trust_score: number;
  verdict: string;
  verdict_color: string;
  bias_level: string;
  emotional_language: string;
  clickbait: string;
  summary: string;
  input_text: string;
  created_at: string;
}

const getVerdictStyle = (verdict: string): React.CSSProperties => {
  const map: Record<string, React.CSSProperties> = {
    "Fake": { background: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" },
    "Suspicious": { background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" },
    "Mostly True": { background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" },
    "Real": { background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
  };
  return map[verdict] || map["Suspicious"];
};

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "history">("overview");

  useEffect(() => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, s, h] = await Promise.all([getUserProfile(), getUserStats(), getUserHistory()]);
      setProfile(p);
      setStats(s);
      setHistory(h);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--b2)", borderTopColor: "var(--accent)", animation: "spin 0.8s linear infinite" }} />
      <div style={{ color: "var(--muted)", fontSize: 13 }}>Loading your dashboard...</div>
    </div>
  );

  if (error) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <div style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: 16, padding: "24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
        <div style={{ color: "#f87171", fontSize: 14 }}>{error}</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>

      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 8 }}>My Dashboard</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>Welcome, {profile?.username} 👋</h1>
        </div>
        {/* Profile Card */}
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: "16px 20px", textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{profile?.username}</div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{profile?.email}</div>
          <div style={{ fontSize: 10, color: "var(--muted2)", marginTop: 4 }}>Member since {profile ? fmt(profile.created_at) : ""}</div>
          {profile?.is_admin && (
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "rgba(79,142,255,0.1)", color: "var(--accent)", border: "1px solid rgba(79,142,255,0.2)", marginTop: 6, display: "inline-block" }}>
              ADMIN
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 12, padding: 4, width: "fit-content" }}>
        {(["overview", "history"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "7px 20px", borderRadius: 8, border: "none",
            background: activeTab === tab ? "var(--b2)" : "transparent",
            color: activeTab === tab ? "var(--text)" : "var(--muted)",
            fontSize: 12, fontWeight: 500, cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textTransform: "capitalize"
          }}>{tab}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && stats && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "TOTAL ANALYSES", value: stats.total, color: "var(--accent)", emoji: "🔍" },
              { label: "AVG TRUST SCORE", value: stats.avg_trust_score, color: "var(--cyan)", emoji: "📊" },
              { label: "FAKE DETECTED", value: stats.fake, color: "var(--red)", emoji: "❌" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, fontSize: 22, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.emoji}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.5px", marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "REAL NEWS", value: stats.real, color: "var(--green)", emoji: "✅" },
              { label: "SUSPICIOUS", value: stats.suspicious, color: "var(--yellow)", emoji: "⚠️" },
              { label: "MOSTLY TRUE", value: stats.mostly_true, color: "var(--cyan)", emoji: "🤔" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, fontSize: 22, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.emoji}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.5px", marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Distribution Bar */}
          {stats.total > 0 && (
            <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 16 }}>Your Verdict Distribution</div>
              <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", gap: 2 }}>
                <div style={{ width: `${(stats.fake / stats.total) * 100}%`, background: "var(--red)", borderRadius: 999 }} />
                <div style={{ width: `${(stats.suspicious / stats.total) * 100}%`, background: "var(--yellow)", borderRadius: 999 }} />
                <div style={{ width: `${(stats.mostly_true / stats.total) * 100}%`, background: "var(--cyan)", borderRadius: 999 }} />
                <div style={{ width: `${(stats.real / stats.total) * 100}%`, background: "var(--green)", borderRadius: 999 }} />
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" as const }}>
                {[
                  { label: "Fake", color: "var(--red)" },
                  { label: "Suspicious", color: "var(--yellow)" },
                  { label: "Mostly True", color: "var(--cyan)" },
                  { label: "Real", color: "var(--green)" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--muted)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--b1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Analysis History</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Last {history.length}</div>
          </div>
          <div>
            {history.length === 0 ? (
              <div style={{ padding: 48, textAlign: "center", color: "var(--muted2)", fontSize: 13 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                No analyses yet! Go check some news.
              </div>
            ) : history.map((item, i) => (
              <div key={item.id} style={{
                padding: "16px 20px",
                borderBottom: i < history.length - 1 ? "1px solid var(--b1)" : "none",
                display: "flex", flexDirection: "column", gap: 8
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 999, ...getVerdictStyle(item.verdict) }}>
                    {item.verdict}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Score: {item.trust_score}/100</span>
                    <span style={{ fontSize: 11, color: "var(--muted2)" }}>{fmt(item.created_at)}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.5, fontWeight: 500 }}>{item.input_text}</div>
                <div style={{ fontSize: 11, color: "var(--muted2)" }}>{item.summary}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  {[
                    { label: "Bias", value: item.bias_level },
                    { label: "Emotional", value: item.emotional_language },
                    { label: "Clickbait", value: item.clickbait },
                  ].map(tag => (
                    <span key={tag.label} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "var(--b2)", color: "var(--muted)", border: "1px solid var(--b1)" }}>
                      {tag.label}: {tag.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;