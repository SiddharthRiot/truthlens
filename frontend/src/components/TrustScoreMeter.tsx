import React, { useEffect, useState } from "react";

interface Props {
  score: number;
  verdict: string;
  verdictColor: string;
}

const TrustScoreMeter: React.FC<Props> = ({ score, verdict, verdictColor }) => {
  const [animated, setAnimated] = useState(-1);

  useEffect(() => {
    // Use score directly — 0 is valid!
    const timeout = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const circumference = 2 * Math.PI * 40;
  const displayScore = animated < 0 ? 0 : animated;
  const offset = circumference - (displayScore / 100) * circumference;

  const getStrokeColor = () => {
    if (verdictColor === "red") return "#f43f5e";
    if (verdictColor === "orange") return "#f97316";
    if (verdictColor === "yellow") return "#f59e0b";
    return "#10b981";
  };

  const getVerdictStyle = (): React.CSSProperties => {
    const map: Record<string, { bg: string; color: string; border: string }> = {
      red: { bg: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "rgba(244,63,94,0.2)" },
      orange: { bg: "rgba(249,115,22,0.1)", color: "#f97316", border: "rgba(249,115,22,0.2)" },
      yellow: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "rgba(245,158,11,0.2)" },
      green: { bg: "rgba(16,185,129,0.1)", color: "#10b981", border: "rgba(16,185,129,0.2)" },
    };
    const s = map[verdictColor] || map["green"];
    return { background: s.bg, color: s.color, border: `1px solid ${s.border}` };
  };

  return (
    <div style={{
      background: "var(--s1)", border: "1px solid var(--b1)",
      borderRadius: 16, padding: 20,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center", gap: 10
    }}>
      <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)" }}>
        Trust Score
      </div>

      <div style={{ position: "relative", width: 90, height: 90 }}>
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={getStrokeColor()} />
              <stop offset="100%" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
          <circle cx="45" cy="45" r="40" fill="none" stroke="var(--b2)" strokeWidth="5" />
          <circle
            cx="45" cy="45" r="40" fill="none"
            stroke="url(#sg)" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            fontSize: 26, fontWeight: 800, letterSpacing: -1,
            background: `linear-gradient(135deg, ${getStrokeColor()}, var(--cyan))`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>{displayScore}</div>
          <div style={{ fontSize: 10, color: "var(--muted)" }}>/100</div>
        </div>
      </div>

      <div style={{
        fontSize: 12, fontWeight: 600, padding: "4px 14px",
        borderRadius: 999, ...getVerdictStyle()
      }}>{verdict}</div>
    </div>
  );
};

export default TrustScoreMeter;
