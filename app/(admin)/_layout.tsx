import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function AdminLayout() {
  const router = useRouter();
  const role = useAuthStore((s) => s.user?.role);

  useEffect(() => {
    if (role && role !== "admin") {
      router.replace("/(auth)/login");
    }
  }, [role]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
