export interface TUser {
  id: string;
  email: string;
  name: string;
}

export interface TAuthStoreModel {
  accessToken: string | null;
  refreshToken: string | null;
  user: TUser | null;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setUser: (user: TUser | null) => void;
  clearAuth: () => void;
  initializeFromStorage: () => void;
}
