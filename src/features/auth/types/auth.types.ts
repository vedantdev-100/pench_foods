import type { User, UserRole } from "@/types/domain/user.types";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
  sid: string;
  city_name: string;
  domain_name: string;
  route_id: string;
}

export interface OTPPayload {
  phone: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export type { User, UserRole };