import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";

export function SupportDashboardScreen() {
  return (
    <ScreenWrapper scrollable className="p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Support Dashboard</Text>
      <Text className="text-secondary">View active support tickets here.</Text>
    </ScreenWrapper>
  );
}
