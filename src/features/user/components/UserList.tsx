import React from "react";
import { FlatList } from "react-native";
import { UserCard } from "./UserCard";
import { EmptyState } from "@/shared/components/EmptyState";
import type { User } from "@/types/domain/user.types";

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
  return (
    <FlatList
      data={users}
      keyExtractor={(u) => u.id}
      renderItem={({ item }) => <UserCard user={item} />}
      contentContainerClassName="pb-4"
      ListEmptyComponent={<EmptyState title="No users found" />}
    />
  );
}
