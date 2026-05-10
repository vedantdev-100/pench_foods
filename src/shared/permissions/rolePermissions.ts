import { Permission, PermissionKey } from "./permissions";
import type { UserRole } from "@/types/domain/user.types";

export const rolePermissions: Record<UserRole, PermissionKey[]> = {
  principal: [
    Permission.ATTENDANCE_VIEW,
    Permission.ATTENDANCE_EXPORT,
    Permission.REPORTS_VIEW,
    Permission.REPORTS_EXPORT,
    Permission.USERS_VIEW,
    Permission.GEOFENCE_MANAGE,
  ],
  hod: [
    Permission.ATTENDANCE_VIEW,
    Permission.ATTENDANCE_EXPORT,
    Permission.REPORTS_VIEW,
    Permission.SESSION_VIEW,
  ],
  admin: [
    Permission.USERS_VIEW,
    Permission.USERS_MANAGE,
    Permission.ATTENDANCE_VIEW,
    Permission.GEOFENCE_MANAGE,
  ],
  support: [Permission.ATTENDANCE_VIEW, Permission.USERS_VIEW],
  teaching: [
    Permission.ATTENDANCE_VIEW,
    Permission.SESSION_CREATE,
    Permission.SESSION_VIEW,
    Permission.REPORTS_VIEW,
  ],
  student: [Permission.ATTENDANCE_MARK, Permission.ATTENDANCE_VIEW],
};
