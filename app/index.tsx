import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { tokenUtils } from "@/features/auth/utils/tokenUtils";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        async function redirect() {
            try {
                const access = await tokenUtils.getAccessToken();

                if (access) {
                    // ── Token exists → skip onboarding → go to login ────
                    // _layout.tsx will handle role-based redirect from login
                    router.replace("/(auth)/login" as any);
                } else {
                    // ── No token → first time or logged out → onboarding ─
                    router.replace("/(auth)/onboarding" as any);
                }
            } catch {
                // ── Error reading store → safe fallback to onboarding ──
                router.replace("/(auth)/onboarding" as any);
            }
        }

        redirect();
    }, []);

    // ── Show spinner while checking SecureStore ──────────────────
    return (
        <View className="flex-1 items-center justify-center bg-bg-screen">
            <ActivityIndicator size="large" color="#1B5E37" />
        </View>
    );
}