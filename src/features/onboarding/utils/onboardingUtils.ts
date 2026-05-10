// src/features/onboarding/utils/onboardingUtils.ts
import * as SecureStore from "expo-secure-store";

const ONBOARDING_KEY = "onboarding_complete";

export const onboardingUtils = {
  isComplete: async (): Promise<boolean> => {
    const val = await SecureStore.getItemAsync(ONBOARDING_KEY);
    // console.log("📦 SecureStore onboarding value:", val);
    return val === "true";
  },

  markComplete: async (): Promise<void> => {
    await SecureStore.setItemAsync(ONBOARDING_KEY, "true");
    // console.log("💾 Onboarding saved to SecureStore");
  },

  reset: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(ONBOARDING_KEY);
    // console.log("🔄 Onboarding reset");
  },
};