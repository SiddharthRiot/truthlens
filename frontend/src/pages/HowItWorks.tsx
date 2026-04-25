import React from "react";

const steps = [
  { emoji: "📋", title: "Paste the News", desc: "Copy any news article, WhatsApp forward, or suspicious text and paste it in the input box. Works in both Hindi and English." },
  { emoji: "🤖", title: "AI Analyzes It", desc: "Our Gemini AI scans for bias, emotional language, clickbait, source credibility, and over 10 other signals." },
  { emoji: "📊", title: "Get Trust Score", desc: "Receive a trust score from 0-100 with detailed breakdown of why content is real or fake, with credibility metrics." },
  { emoji: "📤", title: "Share the Truth", desc: "Share results directly to WhatsApp to help stop the spread of misinformation in your network." },
];

const HowItWorks: React.FC = () => (
  <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 1 }}>
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 16 }}>Process</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>How TruthLens Works</h1>
      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>Simple, fast, and powered by Gemini AI</p>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {steps.map((step, i) => (
        <div key={i} style={{
          background: "var(--s1)", border: "1px solid var(--b1)",
          borderRadius: 16, padding: "22px 24px",
          display: "flex", alignItems: "flex-start", gap: 18
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg,rgba(79,142,255,0.15),rgba(124,58,237,0.15))",
            border: "1px solid rgba(79,142,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
          }}>{step.emoji}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
              <span style={{ color: "var(--muted2)", marginRight: 8 }}>0{i + 1}</span>{step.title}
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HowItWorks;
