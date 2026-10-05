import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Sports Hub caught an uncaught UI error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0A0D14] text-white">
          <div className="max-w-md w-full p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-700 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black font-display text-white">
              Something Interrupted Your Match
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              An unexpected client render state occurred. Your active bookings and session data remain securely saved in your browser.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#CDFF00] hover:bg-[#b8e600] text-[#0A0D14] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Sports Hub</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
