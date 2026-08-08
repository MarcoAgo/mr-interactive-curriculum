import { Link } from "react-router";

export const About = () => {
  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      <h1>About</h1>
      <p>This page is loaded via React Router v8&apos;s native route-level `lazy` API.</p>
      <Link to="/">Back home</Link>
    </div>
  );
};
