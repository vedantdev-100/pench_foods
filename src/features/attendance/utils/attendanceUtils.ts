import type { AttendanceStatus } from "@/types/domain/attendance.types";

export const attendanceUtils = {
  getStatusColor: (status: AttendanceStatus): string => {
    switch (status) {
      case "present":
        return "#16A34A";
      case "absent":
        return "#DC2626";
      case "late":
        return "#D97706";
      default:
        return "#6B7280";
    }
  },
};
