import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="text-center py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        Don't Get <span className="text-red-400">Fooled</span> by Fake News
      </h1>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        Paste any news article or WhatsApp forward and our AI will instantly
        verify its credibility — in seconds.
      </p>
      <div className="flex justify-center gap-4 mt-6 text-sm text-gray-400">
        <span>✅ AI Powered</span>
        <span>⚡ Real Time</span>
        <span>🌐 Hindi & English</span>
        <span>📱 WhatsApp Ready</span>
      </div>
    </div>
  );
};

export default Hero;