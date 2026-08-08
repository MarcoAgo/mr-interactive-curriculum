import { authStore } from "./auth.store";
import type { TAuthStoreModel } from "./auth.types";

export const useAuthStore = <T>(selector: (state: TAuthStoreModel) => T): T => authStore(selector);

export const getAuthState = (): TAuthStoreModel => authStore.getState();
