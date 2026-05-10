import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { useAuthInit } from "@features/auth/hooks/useAuthInit";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { ToastProvider } from "@/shared/components/Toast/Toast";

// ← Keep native splash visible until we manually hide it
SplashScreen.preventAutoHideAsync();

// ← Optional: fade animation when hiding =>  only works in development builds
// SplashScreen.setOptions({
//   duration: 500,
//   fade: true,
// });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const ROLE_ROUTES: Record<string, string> = {
  // admin: "/(admin)/(tabs)/dashboard",
  // teaching: "/(teaching)/(tabs)/dashboard",
  driver: "/(driver)/(tabs)/dashboard",
  customer: "/(customer)/(tabs)/dashboard",
};

function RootNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const user = useAuthStore((s) => s.user);
  const [isMounted, setIsMounted] = useState(false);
  // const { isReady, showOnboarding } = useAuthInit(); // ← bootstrap tokens + user on cold start
  const { isReady } = useAuthInit(); // ← bootstrap tokens + user on cold start

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ← Hide splash screen once auth bootstrap is complete
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => {
    if (!isMounted || !isReady) return; // ← wait for both

    // console.log("🔵 isMounted:", isMounted);
    // console.log("🔵 isReady:", isReady);
    // console.log("🔵 showOnboarding:", showOnboarding);
    // console.log("🔵 user:", user);

    // if (showOnboarding) {
    //   router.replace("/onboarding" as any);
    //   return;
    // }

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login" as any);
    } else if (user && inAuthGroup) {
      const route = ROLE_ROUTES[user.role as string] ?? "/(auth)/login";
      router.replace(route as any);
    }
  // }, [user, segments, isMounted, isReady, showOnboarding]);
  }, [user, segments, isMounted, isReady]);

  // Show splash/loader while bootstrapping
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <RootNavigator />
            <ToastProvider />
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}