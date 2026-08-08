import { getAuthState } from "@/store/auth/use-auth";
import { refreshToken } from "../auth";

export function isAuthenticated(): boolean {
  return !!getAuthState().accessToken;
}

export function getAuthHeaders(): HeadersInit {
  const { accessToken } = getAuthState();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  return headers;
}

/**
 * Wraps fetch with Bearer-token injection and a single refresh-and-retry on 401.
 */
export async function fetchWithAuth(
  url: string | URL,
  options?: RequestInit,
  retried = false,
): Promise<Response> {
  const headers = new Headers(options?.headers);
  const { accessToken } = getAuthState();
  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 && !retried) {
    const refreshResponse = await refreshToken();
    if (!refreshResponse.success) {
      throw new Error(refreshResponse.error ?? "Failed to refresh token");
    }

    const retryHeaders = new Headers(options?.headers);
    const { accessToken: newAccessToken } = getAuthState();
    if (newAccessToken) retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

    response = await fetch(url, { ...options, headers: retryHeaders });
    if (response.status === 401) {
      throw new Error("Authentication failed after token refresh");
    }
  }

  return response;
}
