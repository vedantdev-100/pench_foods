import type { AttendanceRecord } from "@/types/domain/attendance.types";

export interface AttendanceState {
  recentHistory: AttendanceRecord[];
}

export const attendanceSlice = (set: (fn: (s: AttendanceState) => void) => void) => ({
  recentHistory: [] as AttendanceRecord[],
});
