import React from "react";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { AttendanceList } from "../components/AttendanceList";
import { useAttendanceHistory } from "../hooks/useAttendanceHistory";

export function AttendanceHistoryScreen() {
  const { data, isLoading, refetch, isRefetching } = useAttendanceHistory();

  return (
    <ScreenWrapper>
      <AttendanceList
        data={data?.data?.data || []}
        isLoading={isLoading}
        onRefresh={refetch}
        isRefreshing={isRefetching}
      />
    </ScreenWrapper>
  );
}
