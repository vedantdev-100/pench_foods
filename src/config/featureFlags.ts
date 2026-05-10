/** Static ON/OFF feature switches for Phase 1 */
export const featureFlags = {
  /** Enable geofence-based attendance verification */
  GEOFENCE_VERIFICATION: false,
  /** Enable WiFi-based attendance verification */
  WIFI_VERIFICATION: false,
  /** Enable push notifications via Firebase */
  PUSH_NOTIFICATIONS: false,
  /** Enable export reports to PDF */
  EXPORT_REPORTS: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;
