import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "@/shared/ui";

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

interface Props {
  actions: Action[];
}

export function QuickActions({ actions }: Props) {
  return (
    <Card className="p-4">
      <Text className="text-sm font-bold text-gray-900 mb-4">Quick Actions</Text>
      <View className="flex-row flex-wrap gap-4">
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={action.onPress}
            className="items-center w-1/4"
          >
            <View className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-200 mb-2">
              {action.icon}
            </View>
            <Text className="text-xs text-secondary text-center" numberOfLines={2}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
}
