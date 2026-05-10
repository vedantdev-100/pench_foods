import { useToast } from "@/hooks/useToast";

export const notificationHandler = {
  handleForegroundMessage: (message: any, showToast: ReturnType<typeof useToast>["show"]) => {
    if (message.notification) {
      showToast({
        message: message.notification.title || "New Notification",
        type: "info",
      });
    }
  },
  handleBackgroundMessage: async (message: any) => {
    console.log("Background message received", message);
  },
};
