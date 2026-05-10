import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof window !== "undefined" && import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="min-h-screen bg-cyber-dark text-cyber-neon flex flex-col items-center justify-center font-mono px-6 text-center">
        <h1 className="text-4xl font-black mb-4 text-glow uppercase">
          System Fault
        </h1>
        <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">
          A render exception occurred. Reload to re-establish link.
        </p>
        <pre className="text-[10px] text-cyber-danger max-w-xl mt-6 whitespace-pre-wrap">
          {this.state.error?.message ?? "Unknown error"}
        </pre>
        <button
          type="button"
          onClick={() => {
            this.reset();
            window.location.reload();
          }}
          className="mt-8 px-6 py-3 border border-cyber-neon text-cyber-neon uppercase tracking-widest text-xs hover:bg-cyber-neon hover:text-black transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
        >
          Reload
        </button>
      </div>
    );
  }
}
