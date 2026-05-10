import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";

export function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenWrapper className="p-6 justify-center items-center">
      <Text className="text-2xl font-bold text-gray-900">Session Detail</Text>
      <Text className="text-secondary mt-2">ID: {id}</Text>
    </ScreenWrapper>
  );
}
