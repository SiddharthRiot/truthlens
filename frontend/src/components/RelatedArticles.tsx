import React from "react";
import { Article } from "../types/analysis";

interface Props { articles: Article[]; }

const RelatedArticles: React.FC<Props> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, padding: 20 }}>
      <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 14 }}>
        Related Verified Articles
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {articles.map((a, i) => (
          <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "9px 0",
            borderBottom: i < articles.length - 1 ? "1px solid var(--b1)" : "none",
            textDecoration: "none"
          }}>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.5px",
              background: "var(--b1)", color: "var(--muted)",
              padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap" as const, marginTop: 1
            }}>{a.source}</span>
            <div>
              <div style={{ fontSize: 11, color: "#6b7a99", lineHeight: 1.4 }}>{a.title}</div>
              <div style={{ fontSize: 10, color: "var(--muted2)", marginTop: 3 }}>{fmt(a.publishedAt)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
