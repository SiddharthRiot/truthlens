import { useState, useEffect } from "react";
import { loginUser, registerUser, saveToken, logout, getToken, getUsername, getRole } from "../services/authService";
import { LoginRequest, RegisterRequest } from "../types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    const username = getUsername();
    const role = getRole();
    if (token && username && role) {
      setUser({ username, role });
    }
  }, []);

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(data);
      saveToken(response.access_token, response.username, response.role);
      setUser({ username: response.username, role: response.role });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(data);
      saveToken(response.access_token, response.username, response.role);
      setUser({ username: response.username, role: response.role });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return { user, loading, error, login, register, logoutUser };
};