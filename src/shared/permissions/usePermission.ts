import { useAuthStore } from "@/store/authStore";
import { rolePermissions } from "./rolePermissions";
import type { PermissionKey } from "./permissions";

export function usePermission(permission: PermissionKey): boolean {
  const role = useAuthStore((s) => s.user?.role);
  if (!role) return false;
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function usePermissions(permissions: PermissionKey[]): boolean {
  const role = useAuthStore((s) => s.user?.role);
  if (!role) return false;
  const granted = rolePermissions[role] ?? [];
  return permissions.every((p) => granted.includes(p));
}
