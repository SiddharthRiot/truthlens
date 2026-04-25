import React from "react";
import { AnalysisResult } from "../types/analysis";

interface Props { analysis: AnalysisResult; }

const Tag: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const getStyle = (): React.CSSProperties => {
    if (["High", "Yes"].includes(value))
      return { background: "rgba(244,63,94,0.08)", color: "#f87171", border: "1px solid rgba(244,63,94,0.15)" };
    if (["Medium", "Maybe"].includes(value))
      return { background: "rgba(245,158,11,0.08)", color: "#facc15", border: "1px solid rgba(245,158,11,0.15)" };
    return { background: "rgba(16,185,129,0.08)", color: "#4ade80", border: "1px solid rgba(16,185,129,0.15)" };
  };
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6, letterSpacing: "0.3px", ...getStyle() }}>
      {label}: {value}
    </span>
  );
};

const MetricBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <span style={{ fontSize: 11, color: "var(--muted)", width: 60, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, height: 3, background: "var(--b1)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 999, transition: "width 1.2s ease" }} />
    </div>
    <span style={{ fontSize: 11, fontWeight: 600, color, width: 32, textAlign: "right" as const }}>{value}%</span>
  </div>
);

const AnalysisBreakdown: React.FC<Props> = ({ analysis }) => {
  // Use nullish coalescing to safely handle 0
  const score = analysis.trust_score ?? 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
      {/* Summary Card */}
      <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)" }}>AI Summary</div>
        <div style={{ fontSize: 13, color: "#8b9ab5", lineHeight: 1.7, fontWeight: 300 }}>{analysis.summary}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
          <Tag label="Bias" value={analysis.bias_level} />
          <Tag label="Emotion" value={analysis.emotional_language} />
          <Tag label="Clickbait" value={analysis.clickbait} />
        </div>
      </div>

      {/* Metrics — using ?? 0 so score 0 works correctly */}
      <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 4 }}>Credibility Metrics</div>
        <MetricBar label="Factual" value={Math.min((score ?? 0) + 5, 100)} color="var(--green)" />
        <MetricBar label="Neutral" value={Math.max((score ?? 0) - 15, 0)} color="var(--accent)" />
        <MetricBar label="Source" value={Math.min((score ?? 0) + 10, 100)} color="var(--cyan)" />
        <MetricBar label="Verified" value={Math.max((score ?? 0) - 8, 0)} color="var(--yellow)" />
      </div>

      {/* Signals */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 12 }}>Positive Signals</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {analysis.positive_signals.length > 0 ? analysis.positive_signals.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#6b7a99", lineHeight: 1.5 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(16,185,129,0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, marginTop: 1 }}>✓</div>
                {s}
              </div>
            )) : (
              <div style={{ fontSize: 12, color: "var(--muted2)" }}>No positive signals detected</div>
            )}
          </div>
        </div>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 12 }}>Negative Signals</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {analysis.negative_signals.length > 0 ? analysis.negative_signals.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#6b7a99", lineHeight: 1.5 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(244,63,94,0.15)", color: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, marginTop: 1 }}>✕</div>
                {s}
              </div>
            )) : (
              <div style={{ fontSize: 12, color: "var(--muted2)" }}>No negative signals detected</div>
            )}
          </div>
        </div>
      </div>

      {/* Suspicious Phrases */}
      {analysis.suspicious_phrases.length > 0 && (
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 12 }}>Suspicious Phrases</div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
            {analysis.suspicious_phrases.map((phrase, i) => (
              <span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: "rgba(245,158,11,0.08)", color: "#facc15", border: "1px solid rgba(245,158,11,0.15)" }}>
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisBreakdown;
