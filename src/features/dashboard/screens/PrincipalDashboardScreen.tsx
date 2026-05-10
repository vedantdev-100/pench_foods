import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { StatsCard } from "../components/StatsCard";
import { AttendanceChart } from "../components/AttendanceChart";
import { useAuthStore } from "@/store/authStore";

export function PrincipalDashboardScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <ScreenWrapper scrollable className="p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}</Text>
      <View className="flex-row gap-4">
        <StatsCard title="Total Students" value="1,250" trend={{ value: 2, isUp: true }} />
        <StatsCard title="Avg Attendance" value="85.5%" trend={{ value: 1.5, isUp: false }} />
      </View>
      <AttendanceChart />
    </ScreenWrapper>
  );
}
