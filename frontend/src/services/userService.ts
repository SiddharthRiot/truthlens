import axios from "axios";
import { getToken } from "./authService";

const BASE_URL = "http://localhost:8000/api/user";

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const getUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, getHeaders());
  return response.data;
};

export const getUserStats = async () => {
  const response = await axios.get(`${BASE_URL}/stats`, getHeaders());
  return response.data;
};

export const getUserHistory = async () => {
  const response = await axios.get(`${BASE_URL}/history`, getHeaders());
  return response.data;
};