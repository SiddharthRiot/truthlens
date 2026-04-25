import axios from "axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

const BASE_URL = "http://localhost:8000/api/auth";

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data;
};

export const saveToken = (token: string, username: string, role: string) => {
  localStorage.setItem("truthlens_token", token);
  localStorage.setItem("truthlens_username", username);
  localStorage.setItem("truthlens_role", role);
};

export const getToken = (): string | null => {
  return localStorage.getItem("truthlens_token");
};

export const getUsername = (): string | null => {
  return localStorage.getItem("truthlens_username");
};

export const getRole = (): string | null => {
  return localStorage.getItem("truthlens_role");
};

export const isAdmin = (): boolean => {
  return localStorage.getItem("truthlens_role") === "admin";
};

export const logout = () => {
  localStorage.removeItem("truthlens_token");
  localStorage.removeItem("truthlens_username");
  localStorage.removeItem("truthlens_role");
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("truthlens_token");
};