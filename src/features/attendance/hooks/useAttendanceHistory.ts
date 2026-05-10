import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendanceApi";
import { queryKeys } from "@/config/queryKeys";
import { useAuthStore } from "@/store/authStore";
import type { AttendanceHistoryParams } from "../types/attendance.types";

export function useAttendanceHistory(params?: AttendanceHistoryParams) {
  const user = useAuthStore((s) => s.user);
  const studentId = params?.studentId || user?.id;

  return useQuery({
    queryKey: queryKeys.attendance.history(studentId || ""),
    queryFn: () => attendanceApi.getHistory({ ...params, studentId }),
    enabled: !!studentId,
  });
}
