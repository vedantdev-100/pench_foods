import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendanceApi";
import type { MarkAttendancePayload } from "../types/attendance.types";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/errors/errorHandler";
import { queryKeys } from "@/config/queryKeys";

export function useMarkAttendance() {
  const { show } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MarkAttendancePayload) => attendanceApi.mark(payload),
    onSuccess: () => {
      show({ message: "Attendance marked successfully!", type: "success" });
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all });
    },
    onError: (error) => {
      show({
        message: getErrorMessage(error),
        type: "error",
      });
    },
  });
}
