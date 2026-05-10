import React from "react";
import { View, Text } from "react-native";
import { useAppStore } from "@/store/appStore";

export function NetworkStatusBar() {
  const isConnected = useAppStore((s) => s.isNetworkConnected);

  if (isConnected) return null;

  return (
    <View className="bg-danger px-4 py-2 items-center">
      <Text className="text-white text-xs font-medium">
        No internet connection
      </Text>
    </View>
  );
}
