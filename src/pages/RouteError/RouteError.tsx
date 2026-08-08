import { Link, useRouteError } from "react-router";

export const RouteError = () => {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : "Something went wrong.";

  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      <h1>Unexpected error</h1>
      <p>{message}</p>
      <Link to="/">Back home</Link>
    </div>
  );
};
