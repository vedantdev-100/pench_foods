import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { authApi } from "../api/authApi";
import { useAuthStore } from "@store/authStore";
import type { OTPRequestPayload, OTPVerifyPayload } from "../types/auth.types";

export function useRequestOTP() {
  return useMutation({
    mutationFn: (payload: OTPRequestPayload) => authApi.requestOTP(payload),
  });
}

export function useVerifyOTP() {
  const router = useRouter();
  const { setUser, setTokens, setDomainAndRoute } = useAuthStore();

  return useMutation({
    mutationFn: (payload: OTPVerifyPayload) => authApi.verifyOTP(payload),
    onSuccess: (data) => {
      setTokens(data.access, data.refresh);
      setUser(data.user);
      setDomainAndRoute(data.domain_name, data.active_route_id ?? null);

      if (data.user.is_driver) {
        router.replace("/(driver)/(tabs)/dashboard");
      } else {
        router.replace("/(customer)/(tabs)/dashboard");
      }
    },
  });
}