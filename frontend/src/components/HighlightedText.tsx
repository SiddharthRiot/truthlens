import React from "react";

interface Props {
  text: string;
  phrases: string[];
}

const HighlightedText: React.FC<Props> = ({ text, phrases }) => {
  if (!phrases.length) return <p className="text-gray-300 text-sm">{text}</p>;

  let highlighted = text;
  phrases.forEach((phrase) => {
    highlighted = highlighted.replace(
      new RegExp(`(${phrase})`, "gi"),
      `<mark class="bg-yellow-400 text-black rounded px-1">$1</mark>`
    );
  });

  return (
    <div
      className="text-gray-300 text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
};

export default HighlightedText;