export const getScoreLabel = (score: number): string => {
  if (score >= 75) return "Highly Credible";
  if (score >= 50) return "Mostly Credible";
  if (score >= 25) return "Suspicious";
  return "Likely Fake";
};

export const getScoreColor = (score: number): string => {
  if (score >= 75) return "green";
  if (score >= 50) return "yellow";
  if (score >= 25) return "orange";
  return "red";
};