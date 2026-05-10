import React from "react";
import { View, Text } from "react-native";
import { useSessionTimer } from "../hooks/useSessionTimer";
import { cn } from "@/utils/cn";

interface Props {
  expiresAt: string;
}

export function SessionTimer({ expiresAt }: Props) {
  const { formattedTime, isExpired } = useSessionTimer(expiresAt);

  return (
    <View className="items-center">
      <Text className={cn("text-lg font-bold", isExpired ? "text-danger" : "text-gray-900")}>
        {isExpired ? "Session Expired" : `Time Remaining: ${formattedTime}`}
      </Text>
    </View>
  );
}
