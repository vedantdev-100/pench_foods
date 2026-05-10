import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function DriverLayout() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "driver") {
      router.replace("/(auth)/login" as any);
    }
  }, [user]);

  return <Slot />;
}