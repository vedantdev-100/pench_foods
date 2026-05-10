export const Permission = {
  // Attendance
  ATTENDANCE_MARK: "attendance.mark",
  ATTENDANCE_VIEW: "attendance.view",
  ATTENDANCE_EXPORT: "attendance.export",

  // Session
  SESSION_CREATE: "session.create",
  SESSION_VIEW: "session.view",

  // Reports
  REPORTS_VIEW: "reports.view",
  REPORTS_EXPORT: "reports.export",

  // Users
  USERS_VIEW: "users.view",
  USERS_MANAGE: "users.manage",

  // Geofence
  GEOFENCE_MANAGE: "geofence.manage",
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];
