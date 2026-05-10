import { httpClient } from "@/services/api/httpClient";
import type { ApiResponse, PaginatedResponse } from "@/types/api/responses.types";
import type { AttendanceRecord } from "@/types/domain/attendance.types";
import type { MarkAttendancePayload, AttendanceHistoryParams } from "../types/attendance.types";

export const attendanceApi = {
  mark: (payload: MarkAttendancePayload) =>
    httpClient.post<ApiResponse<AttendanceRecord>>("/attendance/mark", payload),

  getHistory: (params: AttendanceHistoryParams) =>
    httpClient.get<ApiResponse<PaginatedResponse<AttendanceRecord>>>("/attendance/history", { params }),

  getReport: (sessionId: string) =>
    httpClient.get<ApiResponse<AttendanceRecord[]>>(`/attendance/report/${sessionId}`),
};
