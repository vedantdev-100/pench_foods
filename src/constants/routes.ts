/** Type-safe router.push() route constants */
export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login" as const,
    OTP: "/(auth)/otp" as const,
    FORGOT_PASSWORD: "/(auth)/forgot-password" as const,
  },
  PRINCIPAL: {
    DASHBOARD: "/(principal)/(tabs)/dashboard" as const,
    REPORTS: "/(principal)/(tabs)/reports" as const,
    USER: (id: string) => `/(principal)/user/${id}` as const,
  },
  HOD: {
    DASHBOARD: "/(hod)/(tabs)/dashboard" as const,
    REPORTS: "/(hod)/(tabs)/reports" as const,
    SESSION: (id: string) => `/(hod)/session/${id}` as const,
  },
  ADMIN: {
    DASHBOARD: "/(admin)/(tabs)/dashboard" as const,
    USERS: "/(admin)/(tabs)/users" as const,
    USER: (id: string) => `/(admin)/user/${id}` as const,
  },
  SUPPORT: {
    DASHBOARD: "/(support)/(tabs)/dashboard" as const,
  },
  TEACHING: {
    DASHBOARD: "/(teaching)/(tabs)/dashboard" as const,
    GENERATE_CODE: "/(teaching)/(tabs)/generate-code" as const,
    SESSION: (id: string) => `/(teaching)/session/${id}` as const,
  },
  STUDENT: {
    DASHBOARD: "/(student)/(tabs)/dashboard" as const,
    HISTORY: "/(student)/(tabs)/history" as const,
    MARK_ATTENDANCE: "/(student)/mark-attendance" as const,
  },
} as const;
