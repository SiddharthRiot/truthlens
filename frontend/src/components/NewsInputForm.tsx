import React, { useState } from "react";

interface Props {
  onAnalyze: (text: string) => void;
  loading: boolean;
  onReset: () => void;
}

const NewsInputForm: React.FC<Props> = ({ onAnalyze, loading, onReset }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAnalyze(text);
  };

  const handleReset = () => {
    setText("");
    onReset();
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-white text-lg font-semibold mb-4">
        📋 Paste News Article or WhatsApp Forward
      </h2>
      <textarea
        className="w-full bg-gray-700 text-white rounded-xl p-4 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        placeholder="Paste your news article, WhatsApp message, or any text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
        >
          {loading ? "Analyzing..." : "🔍 Analyze Now"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition"
        >
          Reset
        </button>
      </div>
      <p className="text-gray-500 text-xs mt-3 text-center">
        Works with English and Hindi text • WhatsApp forwards • News articles
      </p>
    </div>
  );
};

export default NewsInputForm;