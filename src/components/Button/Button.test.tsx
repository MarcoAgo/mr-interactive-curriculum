import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, test, vi } from "vitest";
import { Button } from "./Button";

afterEach(() => cleanup());

test("<Button /> should render its children", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});

test("<Button /> should call onClick when clicked", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Submit</Button>);
  fireEvent.click(screen.getByRole("button", { name: "Submit" }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("<Button /> should be disabled when the disabled prop is set", () => {
  render(<Button disabled>Submit</Button>);
  expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
});
