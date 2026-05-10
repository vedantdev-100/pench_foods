import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/shared/ui";
import { cn } from "@/utils/cn";

interface Props {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; isUp: boolean };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: Props) {
  return (
    <Card className={cn("p-4 flex-1", className)}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm font-medium text-secondary">{title}</Text>
        {icon && <View className="p-1.5 bg-blue-50 rounded-lg">{icon}</View>}
      </View>
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      {trend && (
        <View className="flex-row items-center mt-2">
          <Text className={cn("text-xs font-medium", trend.isUp ? "text-success" : "text-danger")}>
            {trend.isUp ? "↑" : "↓"} {Math.abs(trend.value)}%
          </Text>
          <Text className="text-xs text-secondary ml-1">vs last month</Text>
        </View>
      )}
    </Card>
  );
}
