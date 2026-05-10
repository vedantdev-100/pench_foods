import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from "@/types/domain/user.types";

type AppRoute =
    | "/(driver)/(tabs)/dashboard"
    | "/(customer)/(tabs)/dashboard"
    | "/(auth)/login";

const ROLE_ROUTES: Record<UserRole, AppRoute> = {
    driver: "/(driver)/(tabs)/dashboard",
    customer: "/(customer)/(tabs)/dashboard",
};

export default function AuthLayout() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);

    useEffect(() => {
        if (user?.role) {  // ← null check on role
            const route = ROLE_ROUTES[user.role] ?? "/(auth)/login";
            router.replace(route as any);
        }
    }, [user]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="otp" />
        </Stack>
    )
}