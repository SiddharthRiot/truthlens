export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};