import React from "react";
import { useLocation } from "react-router-dom";
import TrustScoreMeter from "../components/TrustScoreMeter";
import AnalysisBreakdown from "../components/AnalysisBreakdown";
import ShareResult from "../components/ShareResult";
import { ApiResponse } from "../types/analysis";

const Report: React.FC = () => {
  const location = useLocation();
  const result = location.state as ApiResponse;

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">No report data found. Please analyze an article first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white text-center">
          📄 Full Analysis Report
        </h1>
        <TrustScoreMeter
          score={result.analysis.trust_score}
          verdict={result.analysis.verdict}
          verdictColor={result.analysis.verdict_color}
        />
        <AnalysisBreakdown analysis={result.analysis} />
        <ShareResult analysis={result.analysis} />
      </div>
    </div>
  );
};

export default Report;