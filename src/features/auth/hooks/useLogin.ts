import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { authApi } from "../api/authApi";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "../utils/tokenUtils";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/errors/errorHandler";
import { ROUTES } from "@/constants/routes";
import type { LoginPayload } from "../types/auth.types";
import type { UserRole } from "@/types/domain/user.types";

export function useLogin() {
  const router = useRouter();
  const { setUser, setTokens, setDomainAndRoute } = useAuthStore();
  const { show } = useToast();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: async (res) => {
      const { user, access, refresh, active_route_id } = res;

      await tokenUtils.saveTokens(access, refresh);
      setTokens(access, refresh);
      setUser(user);

      // ── Resolve domain from either response shape ──────────────
      const domain = res.domain_name ?? res.tenant_domain ?? "";
      setDomainAndRoute(domain, active_route_id ?? null);

      const appRole = user.is_driver
        ? "driver"
        : user.is_customer
          ? "customer"
          : "admin";

      if (appRole === "driver") {
        router.replace(ROUTES.DRIVER.DASHBOARD as any);
      } else if (appRole === "customer") {
        router.replace(ROUTES.CUSTOMER.DASHBOARD as any);
      } else {
        router.replace(ROUTES.ADMIN.DASHBOARD as any);
      }
    },
    onError: (error) => {
      show({
        message: getErrorMessage(error),
        type: "error",
      });
    },
  });
}