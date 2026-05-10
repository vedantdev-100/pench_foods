import type { RoleConfig } from "../types/roleConfig.types";
import { Permission } from "@/shared/permissions/permissions";
import { ROUTES } from "@/constants/routes";

export const studentRoleConfig: RoleConfig = {
  role: "student",
  permissions: [
    Permission.ATTENDANCE_MARK,
    Permission.ATTENDANCE_VIEW,
  ],
  homeRoute: ROUTES.STUDENT.DASHBOARD,
};
