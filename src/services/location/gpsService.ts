// Mock GPS service
export const gpsService = {
  getCurrentLocation: async () => {
    // Mock implementation
    return {
      latitude: 12.9716,
      longitude: 77.5946,
      accuracy: 10,
    };
  },
};
