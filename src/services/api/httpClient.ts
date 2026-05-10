import axios from "axios";
import { env } from "@/config/env";
import { useAuthStore } from "@/store/authStore";

export const httpClient = axios.create({
  baseURL: env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(err);
  },
);
