import React from "react";
import { View, Text } from "react-native";
import { Card, Badge } from "@/shared/ui";
import type { AttendanceRecord } from "@/types/domain/attendance.types";
import { formatDateTime } from "@/utils/dateFormatter";

interface Props {
  record: AttendanceRecord;
}

export function AttendanceCard({ record }: Props) {
  const variant = record.status === "present" ? "success" : record.status === "absent" ? "danger" : "warning";

  return (
    <Card className="mb-3 flex-row items-center justify-between">
      <View>
        <Text className="text-base font-bold text-gray-900">Session: {record.sessionId}</Text>
        <Text className="text-sm text-secondary">{formatDateTime(record.markedAt)}</Text>
      </View>
      <Badge label={record.status.toUpperCase()} variant={variant} />
    </Card>
  );
}
