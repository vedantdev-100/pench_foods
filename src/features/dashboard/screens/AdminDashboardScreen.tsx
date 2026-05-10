import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { StatsCard } from "../components/StatsCard";

export function AdminDashboardScreen() {
  return (
    <ScreenWrapper scrollable className="p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</Text>
      <View className="flex-row gap-4">
        <StatsCard title="Active Users" value="150" />
        <StatsCard title="System Alerts" value="2" />
      </View>
    </ScreenWrapper>
  );
}
