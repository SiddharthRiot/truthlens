import React from "react";

const LoadingSpinner: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", gap: 14 }}>
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      border: "3px solid var(--b2)",
      borderTopColor: "var(--accent)",
      animation: "spin 0.8s linear infinite"
    }} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Analyzing with AI...</div>
      <div style={{ fontSize: 11, color: "var(--muted2)", marginTop: 4 }}>This may take a few seconds</div>
    </div>
  </div>
);

export default LoadingSpinner;
