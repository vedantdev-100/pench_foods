import type { PermissionKey } from "@/shared/permissions/permissions";

export interface RoleConfig {
  role: string;
  permissions: PermissionKey[];
  homeRoute: string;
}
