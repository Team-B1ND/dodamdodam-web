import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorFallback from "@/shared/ui/error-fallback";

interface FallbackProps {
  error: Error;
  reset: () => void;
}

interface Props {
  children: ReactNode;
  onReset?: () => void;
  fallback?: (props: FallbackProps) => ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  reset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.reset,
        });
      }

      return <ErrorFallback error={this.state.error} onRetry={this.reset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

