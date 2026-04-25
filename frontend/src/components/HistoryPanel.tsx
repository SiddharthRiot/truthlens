import React from "react";
import { HistoryItem } from "../hooks/useHistory";

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<Props> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return (
    <div style={{ textAlign: "center", padding: "20px 0", fontSize: 12, color: "var(--muted2)" }}>
      No recent searches yet
    </div>
  );

  const getBadgeStyle = (color: string): React.CSSProperties => {
    const map: Record<string, React.CSSProperties> = {
      red: { background: "rgba(244,63,94,0.12)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" },
      orange: { background: "rgba(249,115,22,0.12)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" },
      yellow: { background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" },
      green: { background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" },
    };
    return map[color] || map["green"];
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)" }}>Recent</div>
        <button onClick={onClear} style={{ fontSize: 10, color: "var(--muted2)", background: "none", border: "none", cursor: "pointer" }}>Clear</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {history.map(item => (
          <div key={item.id} onClick={() => onSelect(item)} style={{
            background: "var(--s2)", border: "1px solid var(--b1)",
            borderRadius: 8, padding: "10px 12px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8
          }}>
            <span style={{ fontSize: 11, color: "var(--muted)", overflow: "hidden", whiteSpace: "nowrap" as const, textOverflow: "ellipsis", maxWidth: 160 }}>
              {item.preview}
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap" as const, ...getBadgeStyle(item.result.analysis.verdict_color) }}>
              {item.result.analysis.verdict}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;