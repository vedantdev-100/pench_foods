// Mock Geofence service
export const geofenceService = {
  isWithinGeofence: async (lat: number, lng: number, config: any) => {
    return true; // Mock true for now
  },
};
