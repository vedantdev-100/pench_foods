// Mock Notification service
export const notificationService = {
  requestPermission: async () => true,
  getToken: async () => "mock-fcm-token",
  onMessage: (handler: (msg: any) => void) => {
    // mock subscription
    return () => {};
  },
};
