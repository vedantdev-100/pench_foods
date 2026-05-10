import type { RoleConfig } from "../types/roleConfig.types";
import { ROUTES } from "@/constants/routes";

export const fallbackRoleConfig: RoleConfig = {
  role: "unknown",
  permissions: [],
  homeRoute: ROUTES.AUTH.LOGIN,
};
