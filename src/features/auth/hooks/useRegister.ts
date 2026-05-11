import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { authApi } from "../api/authApi";
import { useAuthStore } from "@store/authStore";
import type { RegisterPayload } from "../types/auth.types";

export function useRegister() {
    const router = useRouter();
    const { setUser, setTokens, setDomainAndRoute } = useAuthStore();

    return useMutation({
        mutationFn: (payload: RegisterPayload) => authApi.register(payload),
        onSuccess: (data) => {
            setTokens(data.access, data.refresh);
            setUser(data.user);
            setDomainAndRoute(data.domain_name, null);
            router.replace("/(customer)/(tabs)/dashboard");
        },
    });
}