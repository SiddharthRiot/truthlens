import React from "react";

interface Props {
  language: string;
  onToggle: (lang: string) => void;
}

const LanguageToggle: React.FC<Props> = ({ language, onToggle }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-xl p-1 w-fit">
      <button
        onClick={() => onToggle("en")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          language === "en"
            ? "bg-blue-500 text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        🇬🇧 English
      </button>
      <button
        onClick={() => onToggle("hi")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          language === "hi"
            ? "bg-blue-500 text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        🇮🇳 Hindi
      </button>
    </div>
  );
};

export default LanguageToggle;