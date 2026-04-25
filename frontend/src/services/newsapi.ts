import axios from "axios";

export const fetchRelatedNews = async (query: string) => {
  const response = await axios.get(`http://localhost:8000/api/news?query=${query}`);
  return response.data;
};