import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "@/features/auth/utils/tokenUtils";
import { httpClient } from "@/services/api/httpClient"; // ← keep as is
import type { User } from "@/types/domain/user.types";

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

          try {
            // ── cast to unknown first, then User — safe because
            //    response interceptor already unwraps .data
            const me = await httpClient.get("/api/accounts/me/") as unknown as User;

            setUser(me);
            setDomainAndRoute(me.tenant_schema, me.tenant_schema);

          } catch {
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