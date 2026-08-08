import { createBrowserRouter } from "react-router";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { RouteError } from "@/pages/RouteError";
import { ROUTES } from "./routes.constants";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <RouteError />,
  },
  {
    path: ROUTES.ABOUT,
    errorElement: <RouteError />,
    lazy: async () => {
      const { About } = await import("@/pages/About");
      return { Component: About };
    },
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
