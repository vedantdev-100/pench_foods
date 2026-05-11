import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "@/features/auth/utils/tokenUtils";

export function useAuthInit() {
  const setTokens = useAuthStore((s) => s.setTokens);
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    tokenUtils.getAccessToken().then(async (access) => {
      const refresh = await tokenUtils.getRefreshToken();
      if (access && refresh) {
        setTokens(access, refresh);
      }
      setIsReady(true);
    }).catch(() => {
      setIsReady(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isReady };
}