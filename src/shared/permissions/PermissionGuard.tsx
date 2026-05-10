import React from "react";
import { usePermission } from "./usePermission";
import type { PermissionKey } from "./permissions";

interface Props {
  require: PermissionKey;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ require, fallback = null, children }: Props) {
  const allowed = usePermission(require);
  return allowed ? <>{children}</> : <>{fallback}</>;
}
