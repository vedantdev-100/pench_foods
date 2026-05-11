import { httpClient } from "@services/api/httpClient";
import type {
  LoginPayload,
  OTPRequestPayload,
  OTPVerifyPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth.types";
// import type { ApiResponse } from "@/types/api/responses.types";

export const authApi = {
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    httpClient.post("/api/accounts/login/", payload),

  requestOTP: (payload: OTPRequestPayload): Promise<{ message: string }> =>
    httpClient.post("/api/accounts/request-otp/", payload),

  verifyOTP: (payload: OTPVerifyPayload): Promise<AuthResponse> =>
    httpClient.post("/api/accounts/login-otp/", payload),

  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    httpClient.post("/api/accounts/register/", payload),
};


// export const authApi = {
//   login: (payload: LoginPayload) =>
//     httpClient.post<LoginResponse>("accounts/login/", payload), // ← Remove ApiResponse wrapper

//   verifyOTP: (payload: OTPPayload) =>
//     httpClient.post<ApiResponse<LoginResponse>>("/auth/verify-otp", payload),

//   forgotPassword: (payload: ForgotPasswordPayload) =>
//     httpClient.post<ApiResponse<{ message: string }>>("/auth/forgot-password", payload),

//   logout: () =>
//     httpClient.post<ApiResponse<null>>("/auth/logout"),

//   refreshToken: (refreshToken: string) =>
//     httpClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
//       "/auth/refresh",
//       { refreshToken },
//     ),
// };
