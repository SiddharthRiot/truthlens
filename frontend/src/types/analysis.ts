export interface AnalysisResult {
  trust_score: number;
  verdict: string;
  verdict_color: string;
  bias_level: string;
  emotional_language: string;
  clickbait: string;
  suspicious_phrases: string[];
  summary: string;
  positive_signals: string[];
  negative_signals: string[];
}

export interface Article {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
}

export interface ApiResponse {
  success: boolean;
  analysis: AnalysisResult;
  related_articles: Article[];
}
