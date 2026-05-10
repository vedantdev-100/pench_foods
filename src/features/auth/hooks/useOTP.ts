import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { authApi } from "../api/authApi";
import type { OTPPayload } from "../types/auth.types";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "../utils/tokenUtils";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/errors/errorHandler";

export function useOTP() {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const { show } = useToast();

  return useMutation({
    mutationFn: (payload: OTPPayload) => authApi.verifyOTP(payload),
    onSuccess: async (res) => {
      const { user, accessToken, refreshToken } = res.data.data;
      await tokenUtils.saveTokens(accessToken, refreshToken);
      setTokens(accessToken, refreshToken);
      setUser(user);
    },
    onError: (error) => {
      show({
        message: getErrorMessage(error),
        type: "error",
      });
    },
  });
}
