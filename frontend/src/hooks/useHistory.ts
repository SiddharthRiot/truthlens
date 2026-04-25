import { useState, useEffect } from "react";
import { ApiResponse } from "../types/analysis";

export interface HistoryItem {
  id: string;
  text: string;
  preview: string;
  result: ApiResponse;
  timestamp: Date;
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("truthlens_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("truthlens_history", JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  const addToHistory = (text: string, result: ApiResponse) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      text: text,
      preview: text.substring(0, 60) + "...",
      result,
      timestamp: new Date(),
    };
    setHistory((prev) => [item, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("truthlens_history");
  };

  return { history, addToHistory, clearHistory };
};