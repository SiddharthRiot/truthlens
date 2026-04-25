import React, { useEffect, useState } from "react";
import { useAnalyzer } from "../hooks/useAnalyzer";
import { useHistory, HistoryItem } from "../hooks/useHistory";
import TrustScoreMeter from "../components/TrustScoreMeter";
import AnalysisBreakdown from "../components/AnalysisBreakdown";
import RelatedArticles from "../components/RelatedArticles";
import ShareResult from "../components/ShareResult";
import HistoryPanel from "../components/HistoryPanel";
import LoadingSpinner from "../components/LoadingSpinner";

const Home: React.FC = () => {
  const { loading, error, result, analyze, reset } = useAnalyzer();
  const { history, addToHistory, clearHistory } = useHistory();
  const [text, setText] = useState("");
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (result !== null) {
      addToHistory(text, result);
      setSessionCount(p => p + 1);
    }
    // eslint-disable-next-line
  }, [result]);

  const handleAnalyze = () => analyze(text);

  const handleReset = () => {
    setText("");
    reset();
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setText(item.text);
  };

  const avgScore = history.length > 0
    ? Math.round(history.reduce((a, b) => a + b.result.analysis.trust_score, 0) / history.length)
    : -1;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: "calc(100vh - 52px)", position: "relative", zIndex: 1 }}>

      {/* LEFT PANEL */}
      <div style={{
        borderRight: "1px solid var(--b1)",
        padding: "28px 20px",
        display: "flex", flexDirection: "column", gap: 28,
        background: "rgba(8,12,20,0.4)",
        overflowY: "auto" as const,
      }}>

        {/* Input */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 12 }}>
            Input
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={loading}
              placeholder="Paste news article, WhatsApp forward, or any text in Hindi or English..."
              style={{
                width: "100%", background: "var(--s2)",
                border: "1px solid var(--b1)", borderRadius: 12,
                padding: "14px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12, color: "var(--text)", resize: "none" as const,
                height: 150, outline: "none", lineHeight: 1.6,
              }}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              style={{
                width: "100%",
                background: loading || !text.trim() ? "var(--s3)" : "linear-gradient(135deg,#4f8eff,#7c3aed)",
                border: "none", borderRadius: 10, padding: "12px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13, fontWeight: 600, color: "#fff",
                cursor: loading || !text.trim() ? "not-allowed" : "pointer",
                opacity: loading || !text.trim() ? 0.5 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              {loading ? "Analyzing..." : "Analyze Now →"}
            </button>
            <button
              onClick={handleReset}
              style={{
                width: "100%", background: "transparent",
                border: "1px solid var(--b1)", borderRadius: 10, padding: "9px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12, color: "var(--muted)", cursor: "pointer",
              }}
            >Reset</button>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: 2 }}>
              {["Hindi", "English", "Bengali", "Tamil", "Marathi", "Urdu", "WhatsApp", "URLs", "Free"].map(chip => (
                <span key={chip} style={{
                  fontSize: 10, padding: "3px 9px", borderRadius: 999,
                  background: "var(--b1)", color: "var(--muted)", border: "1px solid var(--b1)"
                }}>{chip}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 12 }}>
            Session Stats
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "var(--s2)", border: "1px solid var(--b1)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--green)" }}>{sessionCount}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px" }}>Analyzed</div>
            </div>
            <div style={{ background: "var(--s2)", border: "1px solid var(--b1)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--accent)" }}>
                {avgScore >= 0 ? `${avgScore}%` : "--"}
              </div>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px" }}>Avg Score</div>
            </div>
          </div>
        </div>

        {/* History */}
        <HistoryPanel history={history} onSelect={handleHistorySelect} onClear={clearHistory} />
      </div>

        {/* right panel */}
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" as const }}>

        {/* Empty state */}
        {result === null && !loading && !error && (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 16, textAlign: "center", opacity: 0.4
          }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Paste an article to analyze</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Results will appear here after analysis</div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)",
            borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "#f87171"
          }}>❌ {error}</div>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Results — result !== null handles score 0 correctly */}
        {result !== null && !loading && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 14 }}>
              <TrustScoreMeter
                score={result.analysis.trust_score}
                verdict={result.analysis.verdict}
                verdictColor={result.analysis.verdict_color}
              />
              <AnalysisBreakdown analysis={result.analysis} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <RelatedArticles articles={result.related_articles} />
              <ShareResult analysis={result.analysis} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
