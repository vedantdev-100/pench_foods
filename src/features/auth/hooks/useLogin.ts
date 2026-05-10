import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import type { LoginPayload } from "../types/auth.types";
import type { UserRole } from "@/types/domain/user.types";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "../utils/tokenUtils";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/errors/errorHandler";

export function useLogin() {
  const { setUser, setTokens, setDomainAndRoute } = useAuthStore();
  const { show } = useToast();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: async (res) => {
      const { user, access, refresh } = res.data;

      console.log("🔐 Full login response:", JSON.stringify(res.data, null, 2));

      // Simple two-role derivation — is_driver true=driver, false=customer
      const role: UserRole = user.is_driver ? "driver" : "customer";

      await tokenUtils.saveTokens(access, refresh); // save tokein to secureStore
      setTokens(access, refresh);  // setting tokens in zustand store [GLOBAL]
      setUser({ ...user, role });

      // ← ADD: check what field names your API uses
      console.log("🗺️ domain_name:", res.data.domain_name);
      console.log("🗺️ route_id:", res.data.route_id);

      /////////////////////// changes /////////////////
      setDomainAndRoute(
        res.data.domain_name ?? "",
        res.data.route_id ?? ""   // ← will be "" since API doesn't return it
      );
    },
    onError: (error) => {
      show({
        message: getErrorMessage(error),
        type: "error",
      });
    },
  });
}