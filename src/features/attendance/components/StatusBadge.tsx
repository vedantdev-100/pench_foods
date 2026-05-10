import React from "react";
import { Badge } from "@/shared/ui";
import type { AttendanceStatus } from "@/types/domain/attendance.types";

interface Props {
  status: AttendanceStatus;
}

export function StatusBadge({ status }: Props) {
  const variant = status === "present" ? "success" : status === "absent" ? "danger" : "warning";
  return <Badge label={status.toUpperCase()} variant={variant} />;
}
