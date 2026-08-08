import { Component } from "react";
import type { ErrorInfo } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.types";

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  override render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please refresh the page.</p>;
    }
    return this.props.children;
  }
}
