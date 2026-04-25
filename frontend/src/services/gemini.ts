import axios from "axios";

export const analyzeWithGemini = async (text: string) => {
  const response = await axios.post("http://localhost:8000/api/analyze", { text });
  return response.data;
};