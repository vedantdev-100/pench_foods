import type { RoleConfig } from "../types/roleConfig.types";
import { Permission } from "@/shared/permissions/permissions";
import { ROUTES } from "@/constants/routes";

export const supportRoleConfig: RoleConfig = {
  role: "support",
  permissions: [
    Permission.ATTENDANCE_VIEW,
    Permission.USERS_VIEW,
  ],
  homeRoute: ROUTES.SUPPORT.DASHBOARD,
};
