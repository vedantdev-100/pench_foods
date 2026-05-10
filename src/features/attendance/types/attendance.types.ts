import type { AttendanceStatus, AttendanceRecord } from "@/types/domain/attendance.types";

export interface MarkAttendancePayload {
  sessionId: string;
  code: string;
  latitude?: number;
  longitude?: number;
  wifiBssid?: string;
}

export interface AttendanceHistoryParams {
  studentId?: string;
  page?: number;
  pageSize?: number;
}
