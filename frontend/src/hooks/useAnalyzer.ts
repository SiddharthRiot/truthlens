import { useState } from "react";
import { ApiResponse } from "../types/analysis";
import { analyzeNews } from "../services/api";

interface AnalyzerState {
  loading: boolean;
  error: string | null;
  result: ApiResponse | null;
}

export const useAnalyzer = () => {
  const [state, setState] = useState<AnalyzerState>({
    loading: false,
    error: null,
    result: null,
  });

  const analyze = async (text: string) => {
    if (!text.trim()) {
      setState((prev) => ({ ...prev, error: "Please enter some text!" }));
      return;
    }
    setState({ loading: true, error: null, result: null });
    try {
      const result = await analyzeNews(text);
      setState({ loading: false, error: null, result });
    } catch (err: any) {
      setState({
        loading: false,
        error: err.response?.data?.detail || "Something went wrong! Check if backend is running.",
        result: null,
      });
    }
  };

  const reset = () => setState({ loading: false, error: null, result: null });

  return { ...state, analyze, reset };
};
