import type { RoleConfig } from "../types/roleConfig.types";
import { Permission } from "@/shared/permissions/permissions";
import { ROUTES } from "@/constants/routes";

export const hodRoleConfig: RoleConfig = {
  role: "hod",
  permissions: [
    Permission.ATTENDANCE_VIEW,
    Permission.ATTENDANCE_EXPORT,
    Permission.REPORTS_VIEW,
    Permission.SESSION_VIEW,
  ],
  homeRoute: ROUTES.HOD.DASHBOARD,
};
