import type { User } from "@/types/domain/user.types";

export type { User };

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
  sid: string;
  city_name: string;
  domain_name: string;
  active_route_id: string | null; // ← present if driver has route assigned today
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface OTPRequestPayload {
  phone_number: string;
}

export interface OTPVerifyPayload {
  phone_number: string;
  otp: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  phone_number: string;
  role: "Customer";
  tenant_schema: string;
}

export type LoginMethod = "password" | "otp";

// export interface ForgotPasswordPayload {
//   email: string;
// }
