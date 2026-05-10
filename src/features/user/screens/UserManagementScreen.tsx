import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { UserList } from "../components/UserList";
import { useUserManagement } from "../hooks/useUserManagement";

export function UserManagementScreen() {
  const { users, isLoading } = useUserManagement();

  return (
    <ScreenWrapper className="p-4 flex-1">
      <Text className="text-2xl font-bold text-gray-900 mb-4">User Management</Text>
      <UserList users={users} />
    </ScreenWrapper>
  );
}
