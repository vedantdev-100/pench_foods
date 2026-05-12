import axios from "axios";
import { env } from "@/config/env";
import { useAuthStore } from "@/store/authStore"; // ← line 1: new import

export const httpClient = axios.create({
  baseURL: env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ── Request Interceptor ──────────────────────────────────────
// Attach access token to every request automatically
httpClient.interceptors.request.use(
  (config) => {
    // ── Read token directly from Zustand store (outside React) ─
    const token = useAuthStore.getState().accessToken; // ← add this
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ← add this
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────
// Unwrap res.data globally — every api call returns data directly
httpClient.interceptors.response.use(
  (response) => response.data,  // ← single place, applies everywhere
  (error) => {
    // Normalize error so getErrorMessage() can read it cleanly
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);