import { httpClient } from "@/services/api/httpClient";
import type { LoginPayload, OTPPayload, ForgotPasswordPayload, LoginResponse } from "../types/auth.types";
import type { ApiResponse } from "@/types/api/responses.types";

export const authApi = {
  login: (payload: LoginPayload) =>
    httpClient.post<LoginResponse>("accounts/login/", payload), // ← Remove ApiResponse wrapper

  verifyOTP: (payload: OTPPayload) =>
    httpClient.post<ApiResponse<LoginResponse>>("/auth/verify-otp", payload),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    httpClient.post<ApiResponse<{ message: string }>>("/auth/forgot-password", payload),

  logout: () =>
    httpClient.post<ApiResponse<null>>("/auth/logout"),

  refreshToken: (refreshToken: string) =>
    httpClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      "/auth/refresh",
      { refreshToken },
    ),
};
