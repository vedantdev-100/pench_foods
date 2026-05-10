import * as SecureStore from "expo-secure-store";
import { TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "@/constants/appConstants";

export const tokenUtils = {
  async saveTokens(access: string, refresh: string) {
    await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, access);
    await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refresh);
  },

  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY);
  },

  async clearTokens() {
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
  },
};
