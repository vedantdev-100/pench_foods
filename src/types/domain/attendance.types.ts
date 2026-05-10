export type AttendanceStatus = "present" | "absent" | "late";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  sessionId: string;
  status: AttendanceStatus;
  markedAt: string;
  latitude?: number;
  longitude?: number;
}
