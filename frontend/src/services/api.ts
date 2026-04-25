import axios from "axios";
import { ApiResponse } from "../types/analysis";
import { getToken } from "./authService";

const BASE_URL = "http://localhost:8000/api";

export const analyzeNews = async (text: string): Promise<ApiResponse> => {
  const token = getToken();
  const response = await axios.post(
    `${BASE_URL}/analyze`,
    { text },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export const getRelatedNews = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/news?query=${query}`);
  return response.data;
};