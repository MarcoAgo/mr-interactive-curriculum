import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      <h1>404 — Page not found</h1>
      <Link to="/">Back home</Link>
    </div>
  );
};
