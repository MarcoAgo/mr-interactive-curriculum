import { create } from "zustand";
import type { TAuthStoreModel } from "./auth.types";
import {
  clearTokensStorage,
  getAccessToken,
  getRefreshToken,
  setAccessTokenStorage,
  setRefreshTokenStorage,
} from "@/lib/storage/token-storage";

export const authStore = create<TAuthStoreModel>()((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setTokens: (accessToken, refreshToken) => {
    setAccessTokenStorage(accessToken);
    setRefreshTokenStorage(refreshToken);
    set({ accessToken, refreshToken });
  },
  setUser: (user) => set({ user }),
  clearAuth: () => {
    clearTokensStorage();
    set({ accessToken: null, refreshToken: null, user: null });
  },
  initializeFromStorage: () => {
    set({ accessToken: getAccessToken(), refreshToken: getRefreshToken() });
  },
}));
