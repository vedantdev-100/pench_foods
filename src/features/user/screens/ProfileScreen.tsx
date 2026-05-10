import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { Card, Button } from "@/shared/ui";
import { useProfile } from "../hooks/useProfile";
import { useLogout } from "@/features/auth";

export function ProfileScreen() {
  const { profile, isLoading } = useProfile();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading || !profile) return null;

  return (
    <ScreenWrapper scrollable className="p-4 gap-6">
      <View className="items-center">
        <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
          <Text className="text-white text-4xl font-bold">{profile.name[0]}</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900">{profile.name}</Text>
        <Text className="text-secondary">{profile.email}</Text>
      </View>

      <Card className="p-4 gap-4">
        <View>
          <Text className="text-sm font-medium text-secondary">Role</Text>
          <Text className="text-base text-gray-900 capitalize">{profile.role}</Text>
        </View>
        <View>
          <Text className="text-sm font-medium text-secondary">Phone</Text>
          <Text className="text-base text-gray-900">{profile.phone}</Text>
        </View>
      </Card>

      <Button label="Logout" variant="danger" onPress={() => logout()} loading={isPending} />
    </ScreenWrapper>
  );
}
