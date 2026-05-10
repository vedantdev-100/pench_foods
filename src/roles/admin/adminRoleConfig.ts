import type { RoleConfig } from "../types/roleConfig.types";
import { Permission } from "@/shared/permissions/permissions";
import { ROUTES } from "@/constants/routes";

export const adminRoleConfig: RoleConfig = {
  role: "admin",
  permissions: [
    Permission.USERS_VIEW,
    Permission.USERS_MANAGE,
    Permission.ATTENDANCE_VIEW,
    Permission.GEOFENCE_MANAGE,
  ],
  homeRoute: ROUTES.ADMIN.DASHBOARD,
};
