export interface Session {
  id: string;
  code: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  expiresAt: string;
}
