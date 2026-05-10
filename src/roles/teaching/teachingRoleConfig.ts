import type { RoleConfig } from "../types/roleConfig.types";
import { Permission } from "@/shared/permissions/permissions";
import { ROUTES } from "@/constants/routes";

export const teachingRoleConfig: RoleConfig = {
  role: "teaching",
  permissions: [
    Permission.ATTENDANCE_VIEW,
    Permission.SESSION_CREATE,
    Permission.SESSION_VIEW,
    Permission.REPORTS_VIEW,
  ],
  homeRoute: ROUTES.TEACHING.DASHBOARD,
};
