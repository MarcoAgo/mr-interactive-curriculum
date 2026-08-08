import type { TAuthStoreModel } from "./auth.types";

export const selectorAuthAccessToken = (state: TAuthStoreModel) => state.accessToken;
export const selectorAuthUser = (state: TAuthStoreModel) => state.user;
export const selectorAuthIsAuthenticated = (state: TAuthStoreModel) => !!state.accessToken;
export const selectorAuthSetTokens = (state: TAuthStoreModel) => state.setTokens;
export const selectorAuthSetUser = (state: TAuthStoreModel) => state.setUser;
export const selectorAuthClearAuth = (state: TAuthStoreModel) => state.clearAuth;
