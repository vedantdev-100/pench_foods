import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendanceApi";
import { queryKeys } from "@/config/queryKeys";

export function useAttendanceReport(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.attendance.report(sessionId),
    queryFn: () => attendanceApi.getReport(sessionId),
    enabled: !!sessionId,
  });
}
