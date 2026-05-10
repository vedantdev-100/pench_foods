import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { StatsCard } from "../components/StatsCard";

export function HODDashboardScreen() {
  return (
    <ScreenWrapper scrollable className="p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 mb-2">HOD Dashboard</Text>
      <View className="flex-row gap-4">
        <StatsCard title="Dept Students" value="450" />
        <StatsCard title="Dept Attendance" value="88%" />
      </View>
    </ScreenWrapper>
  );
}
