'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Sparkles, ShieldCheck, Home } from 'lucide-react';
import { diagnoseWebsiteError } from '@/lib/gemini-dynamic';
import { AiErrorDiagnosis } from '@/types/dynamic-form';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  diagnosis: AiErrorDiagnosis | null;
  isDiagnosing: boolean;
}

export class AiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      diagnosis: null,
      isDiagnosing: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo, isDiagnosing: true });

    // Call Gemini AI Self-Healing Diagnostic Engine
    diagnoseWebsiteError(error.message, errorInfo.componentStack || '')
      .then((diagnosis) => {
        this.setState({ diagnosis, isDiagnosing: false });
      })
      .catch(() => {
        this.setState({ isDiagnosing: false });
      });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    try {
      localStorage.removeItem('civiclens_dark_mode');
    } catch (e) {
      console.warn('Could not reset state:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { error, diagnosis, isDiagnosing } = this.state;

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-xl w-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-blue-500/10 space-y-6 relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    CivicLens AI <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Self-Healing</span>
                  </h2>
                  <p className="text-xs text-slate-400">Automatic Issue Diagnosis & Recovery</p>
                </div>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>

            {/* AI Diagnosis Card */}
            <div className="bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-slate-900 rounded-2xl border border-blue-800/40 p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  Gemini 2.5 AI Diagnostic Analysis
                </span>
                {isDiagnosing && <span className="text-amber-400 animate-pulse">Analyzing error...</span>}
              </div>

              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {diagnosis?.userFriendlyExplanation ||
                  error?.message ||
                  'An unexpected view rendering issue occurred. Gemini AI is recovering your session context.'}
              </p>

              {diagnosis?.recoverySteps && diagnosis.recoverySteps.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-blue-900/40">
                  <h4 className="text-xs font-bold text-slate-300">Recommended Next Steps:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {diagnosis.recoverySteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{diagnosis?.suggestedAction || 'Reload Page'}</span>
              </button>
              <button
                onClick={this.handleResetState}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
