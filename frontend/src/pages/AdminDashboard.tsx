import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAdminUsers, getAdminAnalyses, makeAdmin, removeAdmin } from "../services/adminService";
import { isLoggedIn, isAdmin } from "../services/authService";

interface Stats {
  total_users: number;
  total_analyses: number;
  fake_count: number;
  real_count: number;
  suspicious_count: number;
  mostly_true_count: number;
}

interface User {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
}

interface Analysis {
  id: number;
  user_id: number;
  trust_score: number;
  verdict: string;
  summary: string;
  created_at: string;
  input_text: string;
}

const StatCard: React.FC<{ label: string; value: number; color: string; emoji: string }> = ({ label, value, color, emoji }) => (
  <div style={{
    background: "var(--s1)", border: "1px solid var(--b1)",
    borderRadius: 16, padding: "20px 24px",
    display: "flex", alignItems: "center", gap: 16
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: 12, fontSize: 22,
      background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center"
    }}>{emoji}</div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", color }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.5px", marginTop: 2 }}>{label}</div>
    </div>
  </div>
);

const getVerdictStyle = (verdict: string): React.CSSProperties => {
  const map: Record<string, React.CSSProperties> = {
    "Fake": { background: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" },
    "Suspicious": { background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" },
    "Mostly True": { background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" },
    "Real": { background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
  };
  return map[verdict] || map["Suspicious"];
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "analyses">("overview");
  const [makingAdmin, setMakingAdmin] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    if (!isAdmin()) { setError("Admin access required!"); setLoading(false); return; }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [s, u, a] = await Promise.all([getAdminStats(), getAdminUsers(), getAdminAnalyses()]);
      setStats(s);
      setUsers(u);
      setAnalyses(a);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Access denied! Admin only.");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (userId: number) => {
    setMakingAdmin(userId);
    try {
      await makeAdmin(userId);
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to make admin");
    } finally {
      setMakingAdmin(null);
    }
  };

  const handleRemoveAdmin = async (userId: number) => {
    setMakingAdmin(userId);
    try {
      await removeAdmin(userId);
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to remove admin");
    } finally {
      setMakingAdmin(null);
    }
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--b2)", borderTopColor: "var(--accent)", animation: "spin 0.8s linear infinite" }} />
      <div style={{ color: "var(--muted)", fontSize: 13 }}>Loading admin data...</div>
    </div>
  );

  if (error) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <div style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: 16, padding: "24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🚫</div>
        <div style={{ color: "#f87171", fontSize: 14 }}>{error}</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 8 }}>Admin Panel</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>Dashboard</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 12, padding: 4, width: "fit-content" }}>
        {(["overview", "users", "analyses"] as const).map(tab => (
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <StatCard label="TOTAL USERS" value={stats.total_users} color="var(--accent)" emoji="👥" />
            <StatCard label="TOTAL ANALYSES" value={stats.total_analyses} color="var(--cyan)" emoji="🔍" />
            <StatCard label="FAKE NEWS DETECTED" value={stats.fake_count} color="var(--red)" emoji="❌" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <StatCard label="REAL NEWS" value={stats.real_count} color="var(--green)" emoji="✅" />
            <StatCard label="SUSPICIOUS" value={stats.suspicious_count} color="var(--yellow)" emoji="⚠️" />
            <StatCard label="MOSTLY TRUE" value={stats.mostly_true_count} color="var(--cyan)" emoji="🤔" />
          </div>

          {stats.total_analyses > 0 && (
            <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 16 }}>Verdict Distribution</div>
              <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", gap: 2 }}>
                <div style={{ width: `${(stats.fake_count / stats.total_analyses) * 100}%`, background: "var(--red)", borderRadius: 999 }} />
                <div style={{ width: `${(stats.suspicious_count / stats.total_analyses) * 100}%`, background: "var(--yellow)", borderRadius: 999 }} />
                <div style={{ width: `${(stats.mostly_true_count / stats.total_analyses) * 100}%`, background: "var(--cyan)", borderRadius: 999 }} />
                <div style={{ width: `${(stats.real_count / stats.total_analyses) * 100}%`, background: "var(--green)", borderRadius: 999 }} />
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

      {/* Users Tab */}
      {activeTab === "users" && (
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--b1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>All Users</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{users.length} total</div>
          </div>
          <div>
            {users.map((user, i) => (
              <div key={user.id} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr auto auto",
                padding: "14px 20px", gap: 16, alignItems: "center",
                borderBottom: i < users.length - 1 ? "1px solid var(--b1)" : "none"
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>👤 {user.username}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{user.email}</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{fmt(user.created_at)}</div>

                {/* Admin badge + buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {user.is_admin && (
                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "rgba(79,142,255,0.1)", color: "var(--accent)", border: "1px solid rgba(79,142,255,0.2)" }}>
                      ADMIN
                    </span>
                  )}
                  {user.is_admin ? (
                    <button
                      onClick={() => handleRemoveAdmin(user.id)}
                      disabled={makingAdmin === user.id}
                      style={{
                        fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                        background: "rgba(244,63,94,0.1)", color: "var(--red)",
                        border: "1px solid rgba(244,63,94,0.2)", cursor: "pointer",
                        opacity: makingAdmin === user.id ? 0.5 : 1, fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }}
                    >
                      {makingAdmin === user.id ? "..." : "REMOVE"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user.id)}
                      disabled={makingAdmin === user.id}
                      style={{
                        fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                        background: "rgba(79,142,255,0.1)", color: "var(--accent)",
                        border: "1px solid rgba(79,142,255,0.2)", cursor: "pointer",
                        opacity: makingAdmin === user.id ? 0.5 : 1, fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }}
                    >
                      {makingAdmin === user.id ? "..." : "MAKE ADMIN"}
                    </button>
                  )}
                </div>

                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: user.is_active ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)", color: user.is_active ? "var(--green)" : "var(--red)", border: `1px solid ${user.is_active ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)"}` }}>
                  {user.is_active ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyses Tab */}
      {activeTab === "analyses" && (
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--b1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Recent Analyses</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Last {analyses.length}</div>
          </div>
          <div>
            {analyses.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "var(--muted2)", fontSize: 13 }}>No analyses yet</div>
            ) : analyses.map((a, i) => (
              <div key={a.id} style={{
                padding: "14px 20px",
                borderBottom: i < analyses.length - 1 ? "1px solid var(--b1)" : "none",
                display: "flex", flexDirection: "column", gap: 6
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 999, ...getVerdictStyle(a.verdict) }}>
                    {a.verdict}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Score: {a.trust_score}/100</span>
                    <span style={{ fontSize: 11, color: "var(--muted2)" }}>{fmt(a.created_at)}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#6b7a99", lineHeight: 1.5 }}>{a.input_text}</div>
                <div style={{ fontSize: 11, color: "var(--muted2)" }}>{a.summary}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;