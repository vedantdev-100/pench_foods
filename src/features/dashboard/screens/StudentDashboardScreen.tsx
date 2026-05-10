import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { StatsCard } from "../components/StatsCard";

export function StudentDashboardScreen() {
  return (
    <ScreenWrapper scrollable className="p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Student Dashboard</Text>
      <View className="flex-row gap-4">
        <StatsCard title="My Attendance" value="92%" />
        <StatsCard title="Classes Today" value="4" />
      </View>
    </ScreenWrapper>
  );
}
