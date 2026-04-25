import axios from "axios";
import { getToken } from "./authService";

const BASE_URL = "http://localhost:8000/api/admin";

const getHeaders = () => {
  const token = getToken();
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const getAdminStats = async () => {
  const response = await axios.get(`${BASE_URL}/stats`, getHeaders());
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`, getHeaders());
  return response.data;
};

export const getAdminAnalyses = async () => {
  const response = await axios.get(`${BASE_URL}/analyses`, getHeaders());
  return response.data;
};

export const makeAdmin = async (userId: number) => {
  const response = await axios.post(`${BASE_URL}/users/${userId}/make-admin`, {}, getHeaders());
  return response.data;
};

export const removeAdmin = async (userId: number) => {
  const response = await axios.post(`${BASE_URL}/users/${userId}/remove-admin`, {}, getHeaders());
  return response.data;
};