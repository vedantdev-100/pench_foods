import React from "react";
import { View, Text } from "react-native";

interface Props {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "There is no data to display.",
  icon,
}: Props) {
  return (
    <View className="flex-1 items-center justify-center p-8 gap-3">
      {icon && <View className="mb-2">{icon}</View>}
      <Text className="text-lg font-bold text-gray-800 text-center">{title}</Text>
      <Text className="text-sm text-secondary text-center">{description}</Text>
    </View>
  );
}
