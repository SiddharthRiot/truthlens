export const highlightPhrases = (text: string, phrases: string[]): string => {
  let result = text;
  phrases.forEach((phrase) => {
    result = result.replace(
      new RegExp(`(${phrase})`, "gi"),
      `<mark>$1</mark>`
    );
  });
  return result;
};