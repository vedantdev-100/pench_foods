import type { RoleConfig } from "../types/roleConfig.types";
import { Permission } from "@/shared/permissions/permissions";
import { ROUTES } from "@/constants/routes";

export const principalRoleConfig: RoleConfig = {
  role: "principal",
  permissions: [
    Permission.ATTENDANCE_VIEW,
    Permission.ATTENDANCE_EXPORT,
    Permission.REPORTS_VIEW,
    Permission.REPORTS_EXPORT,
    Permission.USERS_VIEW,
    Permission.GEOFENCE_MANAGE,
  ],
  homeRoute: ROUTES.PRINCIPAL.DASHBOARD,
};
