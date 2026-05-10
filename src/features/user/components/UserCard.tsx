import React from "react";
import { View, Text } from "react-native";
import { Card, Badge } from "@/shared/ui";
import type { User } from "@/types/domain/user.types";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <Card className="p-4 mb-3 flex-row items-center justify-between">
      <View>
        <Text className="text-base font-bold text-gray-900">{user.name}</Text>
        <Text className="text-sm text-secondary">{user.email}</Text>
      </View>
      <Badge label={user.role.toUpperCase()} variant="secondary" />
    </Card>
  );
}
