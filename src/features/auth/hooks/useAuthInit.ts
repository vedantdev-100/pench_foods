// src/features/auth/hooks/useAuthInit.ts =>
// Bootstraps auth on cold start
// Loads token from SecureStore → calls accounts/login/ → sets user in store 
import { useEffect, useState } from "react";
import { tokenUtils } from "../utils/tokenUtils";
import { useAuthStore } from "@/store/authStore";
import { httpClient } from "@/services/api/httpClient";
import { UserRole } from "@/types";
import { onboardingUtils } from "@features/onboarding/utils/onboardingUtils";
import { secureStorage } from "@/services/storage";

export function useAuthInit() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    async function bootstrap() {
      try {
        // Onboarding Screen
        const onboardingDone = await onboardingUtils.isComplete();
        console.log("🟡 onboardingDone:", onboardingDone);
        console.log("🟡 showOnboarding will be:", !onboardingDone);
        if (!onboardingDone) {
          setShowOnboarding(true);
          setIsReady(true);
          return;
        }
        const accessToken = await tokenUtils.getAccessToken();
        const refreshToken = await tokenUtils.getRefreshToken();

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
          const res = await httpClient.get("accounts/login/");
          const user = res.data.user ?? res.data;
          const role: UserRole = user.is_driver ? "driver" : "customer";
          setUser({ ...user, role });
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
        await tokenUtils.clearTokens();
      } finally {
        setIsReady(true);
      }
    }

    bootstrap();
  }, []);

  return { isReady, showOnboarding };
}