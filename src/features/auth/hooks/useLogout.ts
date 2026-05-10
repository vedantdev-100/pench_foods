import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "../utils/tokenUtils";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/errors/errorHandler";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { show } = useToast();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async () => {
      await tokenUtils.clearTokens();
      clearAuth();
    },
    onError: async (error) => {
      // Clear auth anyway if network fails on logout
      await tokenUtils.clearTokens();
      clearAuth();
      show({
        message: getErrorMessage(error),
        type: "error",
      });
    },
  });
}
