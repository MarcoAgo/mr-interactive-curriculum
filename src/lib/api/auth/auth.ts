import type { TUser } from "@/store/auth/auth.types";
import { getAuthState } from "@/store/auth/use-auth";
import { env } from "@/lib/env";
import { parseApiError, parseJsonResponse } from "../_helpers/response.helpers";
import type { LoginResponse } from "./auth.types";
import { fetchWithAuth } from "./_helpers/auth.helpers";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return { success: false, error: await parseApiError(response) };
  }

  const data = await parseJsonResponse<{ accessToken: string; refreshToken: string }>(response);
  return { success: true, accessToken: data.accessToken, refreshToken: data.refreshToken };
}

export async function logout(): Promise<void> {
  const { refreshToken: refreshTokenValue, clearAuth } = getAuthState();
  const response = await fetchWithAuth(`${env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshTokenValue }),
  });

  if (!response.ok) throw new Error("Failed to logout");
  clearAuth();
}

export async function refreshToken(): Promise<LoginResponse> {
  const { refreshToken: refreshTokenValue, clearAuth, setTokens } = getAuthState();
  if (!refreshTokenValue) {
    clearAuth();
    return { success: false, error: "No refresh token available" };
  }

  const response = await fetch(`${env.VITE_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshTokenValue }),
  });

  if (!response.ok) {
    clearAuth();
    return { success: false, error: await parseApiError(response) };
  }

  const data = await parseJsonResponse<{ accessToken?: string; refreshToken?: string }>(response);
  if (data.accessToken) {
    setTokens(data.accessToken, data.refreshToken ?? refreshTokenValue);
  }

  return { success: true, ...data };
}

export async function getMe(): Promise<TUser> {
  const response = await fetchWithAuth(`${env.VITE_API_URL}/auth/me`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return parseJsonResponse<TUser>(response);
}
