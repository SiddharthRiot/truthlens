import React, { useState } from "react";
import { AnalysisResult } from "../types/analysis";

interface Props { analysis: AnalysisResult; }

const ShareResult: React.FC<Props> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);

  const waMessage = `🔍 *TruthLens Analysis*\n\n📊 Trust Score: ${analysis.trust_score}/100\n✅ Verdict: ${analysis.verdict}\n\n📝 ${analysis.summary}\n\n_Verified by TruthLens AI_`;

  const handleWA = () => window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");

  const handleCopy = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btns = [
    { icon: "💬", label: "Share on WhatsApp", bg: "rgba(16,185,129,0.12)", onClick: handleWA },
    { icon: "🔗", label: "Copy link to result", bg: "rgba(79,142,255,0.12)", onClick: handleCopy },
    { icon: copied ? "✅" : "📋", label: copied ? "Copied!" : "Copy summary text", bg: "rgba(245,158,11,0.12)", onClick: handleCopy },
  ];

  return (
    <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20 }}>
      <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 14 }}>
        Share Result
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {btns.map((btn, i) => (
          <button key={i} onClick={btn.onClick} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "var(--s2)", border: "1px solid var(--b1)",
            borderRadius: 10, padding: "11px 14px",
            color: "var(--muted)", fontSize: 12, fontWeight: 500,
            cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
            textAlign: "left", transition: "all 0.15s"
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "var(--s3)"; (e.target as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "var(--s2)"; (e.target as HTMLElement).style.color = "var(--muted)"; }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 7, background: btn.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
              {btn.icon}
            </div>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareResult;
