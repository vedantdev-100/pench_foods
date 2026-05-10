import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

interface Props {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message = "Loading..." }: Props) {
  if (!visible) return null;
  return (
    <View className="absolute inset-0 z-50 bg-black/40 items-center justify-center">
      <View className="bg-white rounded-2xl px-8 py-6 items-center gap-3 shadow-lg">
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text className="text-sm text-secondary font-medium">{message}</Text>
      </View>
    </View>
  );
}
