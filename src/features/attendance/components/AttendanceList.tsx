import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { AttendanceCard } from "./AttendanceCard";
import { EmptyState } from "@/shared/components/EmptyState";
import type { AttendanceRecord } from "@/types/domain/attendance.types";

interface Props {
  data: AttendanceRecord[];
  isLoading: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function AttendanceList({ data, isLoading, onRefresh, isRefreshing = false }: Props) {
  if (isLoading && data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AttendanceCard record={item} />}
      contentContainerClassName="p-4"
      ListEmptyComponent={<EmptyState title="No attendance records found" />}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
}
