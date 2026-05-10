/** React Query key factory — single source of truth for all cache keys */
export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },
  attendance: {
    all: ["attendance"] as const,
    history: (studentId: string) =>
      [...queryKeys.attendance.all, "history", studentId] as const,
    report: (sessionId: string) =>
      [...queryKeys.attendance.all, "report", sessionId] as const,
  },
  session: {
    all: ["session"] as const,
    detail: (id: string) => [...queryKeys.session.all, "detail", id] as const,
    active: () => [...queryKeys.session.all, "active"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    stats: (role: string) =>
      [...queryKeys.dashboard.all, "stats", role] as const,
  },
  users: {
    all: ["users"] as const,
    list: () => [...queryKeys.users.all, "list"] as const,
    detail: (id: string) => [...queryKeys.users.all, "detail", id] as const,
  },
  reports: {
    all: ["reports"] as const,
    attendance: (params: Record<string, unknown>) =>
      [...queryKeys.reports.all, "attendance", params] as const,
  },
} as const;
