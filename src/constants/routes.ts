/** Type-safe router.push() route constants */
export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login" as const,
    OTP: "/(auth)/otp" as const,
    FORGOT_PASSWORD: "/(auth)/forgot-password" as const,
  },

  DRIVER: {
    DASHBOARD: "/(driver)/(tabs)/dashboard" as const,
    MAP: "/(driver)/(tabs)/map" as const,
    ORDERS: "/(driver)/orders" as const,
    ORDER: (id: string) => `/(driver)/orders/${id}` as const,
    DELIVERIES: "/(driver)/deliveries" as const,
    DELIVERY: (id: string) => `/(driver)/deliveries/${id}` as const,
    PROFILE: "/(driver)/profile" as const,
    ATTENDANCE: "/(driver)/attendance" as const,
  },

  CUSTOMER: {
    DASHBOARD: "/(customer)/(tabs)/dashboard" as const,
    SUBSCRIPTION: "/(customer)/(tabs)/subscription" as const,
    WALLET: "/(customer)/(tabs)/wallet" as const,
    PROFILE: "/(customer)/(tabs)/profile" as const,
    ORDER_EXTRA: "/(customer)/order-extra" as const,
    COMPLAINTS: "/(customer)/complaints" as const,
    COMPLAINT: (id: string) => `/(customer)/complaints/${id}` as const,
    DELIVERY_TRACKING: "/(customer)/tracking" as const,
    INVOICE: (id: string) => `/(customer)/invoices/${id}` as const,
  },

  ADMIN: {
    DASHBOARD: "/(admin)/(tabs)/dashboard" as const,
    USERS: "/(admin)/(tabs)/users" as const,
    USER: (id: string) => `/(admin)/user/${id}` as const,
    ROUTES: "/(admin)/(tabs)/routes" as const,
    ROUTE: (id: string) => `/(admin)/routes/${id}` as const,
  },
} as const;