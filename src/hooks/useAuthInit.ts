import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "@/features/auth/utils/tokenUtils";
import { httpClient } from "@/services/api/httpClient";

export function useAuthInit() {
  const { setTokens, setUser, setDomainAndRoute } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function bootstrap() {
      try {
        const access = await tokenUtils.getAccessToken();
        const refresh = await tokenUtils.getRefreshToken();

        if (access && refresh) {
          setTokens(access, refresh);

          // ── Restore user from token so _layout doesn't flash login
          try {
            const user = await httpClient.get("/api/accounts/me/");  
            setUser(user as any);
          } catch {
            // Token expired or invalid — clear and go to login
            await tokenUtils.clearTokens();
          }
        }
      } catch (e) {
        console.error("Bootstrap error:", e);
      } finally {
        setIsReady(true);
      }
    }

    bootstrap();
  }, []);

  return { isReady };
}