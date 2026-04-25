import React from "react";

const About: React.FC = () => (
  <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 1, textAlign: "center" }}>
    <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 16 }}>About</div>
    <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>About TruthLens</h1>
    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, marginBottom: 40 }}>
      TruthLens is an AI-powered fake news detection tool built for the Navathon Hackathon.
      Our mission is to combat the rapid spread of misinformation across digital platforms —
      especially WhatsApp, where fake news spreads fastest in India.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 }}>
      {[
        { val: "AI", label: "Powered by Gemini", color: "var(--accent)" },
        { val: "Free", label: "Always Free to Use", color: "var(--green)" },
        { val: "2", label: "Languages Supported", color: "var(--yellow)" },
      ].map((s, i) => (
        <div key={i} style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: "24px 16px" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: "-1px", marginBottom: 6 }}>{s.val}</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{s.label}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 12, color: "var(--muted2)" }}>
      Built with React TSX, FastAPI & Google Gemini AI 🚀
    </div>
  </div>
);

export default About;
