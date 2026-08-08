import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth/use-auth";
import { selectorAuthIsAuthenticated } from "@/store/auth/auth.selectors";
import { ROUTES } from "@/routes/routes.constants";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(selectorAuthIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
