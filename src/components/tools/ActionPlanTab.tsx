'use client';

import React, { useState } from 'react';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Printer
} from 'lucide-react';
import { GOVERNMENT_SCHEMES, Scheme } from '@/lib/schemes-data';

interface ActionPlanTabProps {
  initialScheme?: Scheme | null;
}

export const ActionPlanTab: React.FC<ActionPlanTabProps> = ({ initialScheme }) => {
  const [selectedScheme, setSelectedScheme] = useState<Scheme>(
    initialScheme || GOVERNMENT_SCHEMES[0]
  );

  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalEstDays = selectedScheme.applicationSteps.reduce((acc, curr) => acc + curr.estDays, 0);
  const doneCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = selectedScheme.applicationSteps.length;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
            <ListTodo className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Action Plan Roadmap</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive timeline roadmap breaking complex government procedures into step-by-step milestones.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          aria-label="Print action plan"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Action Plan</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg mb-6 space-y-3">
        <label htmlFor="action-plan-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Target Goal / Scheme Action Plan:
        </label>
        <select
          id="action-plan-select"
          value={selectedScheme.id}
          onChange={(e) => {
            const found = GOVERNMENT_SCHEMES.find((s) => s.id === e.target.value);
            if (found) {
              setSelectedScheme(found);
              setCompletedSteps({});
            }
          }}
          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {GOVERNMENT_SCHEMES.map((scheme) => (
            <option key={scheme.id} value={scheme.id}>
              Goal: Apply for {scheme.title} ({scheme.shortCode})
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Official Roadmap &bull; {selectedScheme.ministry}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Action Plan: {selectedScheme.title}
            </h3>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Estimated Timeline</div>
              <div className="text-base font-extrabold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalEstDays} Days Total</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Milestone Progress</div>
              <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                {doneCount} / {totalSteps} Done
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-8 py-2">
          {selectedScheme.applicationSteps.map((st) => {
            const isDone = !!completedSteps[st.step];
            return (
              <div key={st.step} className="relative group">
                <div
                  onClick={() => toggleStep(st.step)}
                  className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{st.step}</span>}
                </div>

                <div className={`p-5 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 opacity-80'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Step {st.step}: {st.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Est: {st.estDays} Days
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
