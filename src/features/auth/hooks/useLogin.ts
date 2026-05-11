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
      const { user, access, refresh, domain_name, active_route_id } = res;

      // console.log("access:", access, typeof access);
      // console.log("refresh:", refresh, typeof refresh);
      // console.log("domain_name:", domain_name, typeof domain_name);


      // ── 1. Persist tokens ────────────────────────────────────────
      await tokenUtils.saveTokens(access, refresh);
      setTokens(access, refresh);

      // ── 2. Derive app-level role (lowercase) from API flags ──────
      // Do NOT assign this to user.role — user.role is PascalCase from API
      const appRole: UserRole = user.is_driver
        ? "driver"
        : user.is_customer
          ? "customer"
          : "admin";

      // ── 3. Store user AS-IS from API — no role override ──────────
      setUser(user);

      // ── 4. Store domain + route ──────────────────────────────────
      setDomainAndRoute(domain_name ?? "", active_route_id ?? null);

      // ── 5. Role-based redirect using derived appRole ─────────────
      if (appRole === "driver") {
        router.replace(ROUTES.DRIVER.DASHBOARD);
      } else if (appRole === "customer") {
        router.replace(ROUTES.CUSTOMER.DASHBOARD);
      } else {
        router.replace(ROUTES.ADMIN.DASHBOARD);
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