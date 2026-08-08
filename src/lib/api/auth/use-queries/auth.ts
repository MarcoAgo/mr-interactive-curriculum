import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getMe, login, logout } from "@/lib/api/auth/auth";
import type { LoginRequest } from "@/lib/api/auth/auth.types";
import { useAuthStore } from "@/store/auth/use-auth";
import {
  selectorAuthAccessToken,
  selectorAuthSetTokens,
  selectorAuthSetUser,
} from "@/store/auth/auth.selectors";

export function useLogin() {
  const navigate = useNavigate();
  const setTokens = useAuthStore(selectorAuthSetTokens);

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await login(credentials.email, credentials.password);
      if (!response.success || !response.accessToken || !response.refreshToken) {
        throw new Error(response.error ?? "Login failed");
      }
      setTokens(response.accessToken, response.refreshToken);
      return response;
    },
    onSuccess: async () => {
      await navigate("/");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.clear();
      await navigate("/login");
    },
  });
}

export function useGetMe() {
  const setUser = useAuthStore(selectorAuthSetUser);
  const accessToken = useAuthStore(selectorAuthAccessToken);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await getMe();
      setUser(user);
      return user;
    },
    enabled: !!accessToken,
  });
}
