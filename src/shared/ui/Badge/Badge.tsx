import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/utils/cn";

export type BadgeVariant = "primary" | "success" | "warning" | "danger" | "secondary";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-blue-100 text-primary",
  success: "bg-green-100 text-success",
  warning: "bg-yellow-100 text-warning",
  danger: "bg-red-100 text-danger",
  secondary: "bg-gray-100 text-secondary",
};

export function Badge({ label, variant = "primary", className }: BadgeProps) {
  return (
    <View className={cn("px-2 py-0.5 rounded-full self-start", className)}>
      <Text className={cn("text-xs font-medium", variantClasses[variant])}>
        {label}
      </Text>
    </View>
  );
}
