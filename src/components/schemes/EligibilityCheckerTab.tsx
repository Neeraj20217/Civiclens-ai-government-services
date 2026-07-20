'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GOVERNMENT_SCHEMES, Scheme } from '@/lib/schemes-data';

interface EligibilityCheckerTabProps {
  preselectedScheme?: Scheme | null;
  onNavigateToActionPlan: (scheme: Scheme) => void;
}

export const EligibilityCheckerTab: React.FC<EligibilityCheckerTabProps> = ({
  preselectedScheme,
  onNavigateToActionPlan,
}) => {
  const [selectedScheme, setSelectedScheme] = useState<Scheme>(
    preselectedScheme || GOVERNMENT_SCHEMES[0]
  );

  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleSelectScheme = (schemeId: string) => {
    const found = GOVERNMENT_SCHEMES.find((s) => s.id === schemeId);
    if (found) {
      setSelectedScheme(found);
      setAnswers({});
      setIsEvaluated(false);
    }
  };

  const handleAnswerChange = (questionId: string, isEligibleOption: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: isEligibleOption,
    }));
  };

  const handleEvaluate = () => {
    setIsEvaluated(true);

    const allTrue = Object.values(answers).every((val) => val === true);
    if (allTrue && Object.keys(answers).length === selectedScheme.eligibilityQuestions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const totalQuestions = selectedScheme.eligibilityQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const eligibleCount = Object.values(answers).filter(Boolean).length;

  let verdict: 'ELIGIBLE' | 'CONDITIONAL' | 'NOT_ELIGIBLE' = 'ELIGIBLE';
  if (answeredCount > 0) {
    if (eligibleCount === totalQuestions) {
      verdict = 'ELIGIBLE';
    } else if (eligibleCount >= 1) {
      verdict = 'CONDITIONAL';
    } else {
      verdict = 'NOT_ELIGIBLE';
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Deep Eligibility Evaluator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any central or state scheme to answer dynamic policy questions and receive instant AI verification.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg mb-6 space-y-4">
        <label htmlFor="scheme-eval-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Scheme to Evaluate:
        </label>
        <select
          id="scheme-eval-select"
          value={selectedScheme.id}
          onChange={(e) => handleSelectScheme(e.target.value)}
          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {GOVERNMENT_SCHEMES.map((scheme) => (
            <option key={scheme.id} value={scheme.id}>
              {scheme.title} ({scheme.shortCode}) — {scheme.level}
            </option>
          ))}
        </select>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">{selectedScheme.title}</p>
          <p>{selectedScheme.description}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <span>Target Policy Questions ({totalQuestions}):</span>
          <span className="text-xs font-normal text-slate-400">Answer all questions below</span>
        </h3>

        <div className="space-y-6">
          {selectedScheme.eligibilityQuestions.map((q, idx) => {
            const currentAnswer = answers[q.id];
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3"
              >
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-2 pl-8">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = currentAnswer === opt.eligible;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleAnswerChange(q.id, opt.eligible)}
                        className={`w-full p-3 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? opt.eligible
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
                              : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 font-bold'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && (
                          opt.eligible ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-rose-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleEvaluate}
            disabled={answeredCount < totalQuestions}
            aria-label="Evaluate scheme eligibility verdict"
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Evaluate Eligibility Verdict</span>
          </button>
        </div>
      </div>

      {isEvaluated && (
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
          {verdict === 'ELIGIBLE' && (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-300">
                    Official AI Verdict
                  </span>
                  <h3 className="text-2xl font-black">100% ELIGIBLE</h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed">
                Congratulations! Based on your responses, you satisfy all primary eligibility conditions for <strong>{selectedScheme.title}</strong>. You are clear to apply!
              </p>
            </div>
          )}

          {verdict === 'CONDITIONAL' && (
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  !
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-extrabold text-amber-700 dark:text-amber-300">
                    Official AI Verdict
                  </span>
                  <h3 className="text-2xl font-black">POSSIBLY ELIGIBLE (CONDITIONAL)</h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed">
                You satisfy some requirements for <strong>{selectedScheme.title}</strong>, but have 1 or more missing prerequisites. Review the missing criteria below to fulfill them.
              </p>
            </div>
          )}

          {verdict === 'NOT_ELIGIBLE' && (
            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  ✕
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-extrabold text-rose-700 dark:text-rose-300">
                    Official AI Verdict
                  </span>
                  <h3 className="text-2xl font-black">NOT ELIGIBLE CURRENTLY</h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed">
                You currently do not meet mandatory policy rules for <strong>{selectedScheme.title}</strong>. Check our alternative scheme recommendations!
              </p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Common Application Pitfalls to Avoid:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {selectedScheme.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => onNavigateToActionPlan(selectedScheme)}
              aria-label="Generate action plan for this scheme"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
            >
              <span>Generate Step-by-Step Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
