'use client';

import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Building2,
  DollarSign,
  UserCheck,
  Bookmark
} from 'lucide-react';
import { GOVERNMENT_SCHEMES, STATES_LIST, OCCUPATIONS_LIST, Scheme } from '@/lib/schemes-data';

interface SchemeMatcherTabProps {
  onSelectSchemeForEligibility: (scheme: Scheme) => void;
  onSelectSchemeForActionPlan: (scheme: Scheme) => void;
  onSaveBookmark: (scheme: Scheme) => void;
  isBookmarked: (schemeId: string) => boolean;
}

type GenderCategory = 'all' | 'female' | 'male';

export const SchemeMatcherTab: React.FC<SchemeMatcherTabProps> = ({
  onSelectSchemeForEligibility,
  onSelectSchemeForActionPlan,
  onSaveBookmark,
  isBookmarked,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [age, setAge] = useState<number>(24);
  const [gender, setGender] = useState<GenderCategory>('all');
  const [state, setState] = useState<string>('Maharashtra');
  const [occupation, setOccupation] = useState<string>('Student');
  const [income, setIncome] = useState<number>(200000);
  const [education, setEducation] = useState<string>('Graduate');
  const [isDisability, setIsDisability] = useState<boolean>(false);

  const [matchedResults, setMatchedResults] = useState<{ scheme: Scheme; score: number; matchReasons: string[] }[]>([]);

  const calculateMatches = () => {
    const scored = GOVERNMENT_SCHEMES.map((scheme) => {
      let score = 50;
      const matchReasons: string[] = [];

      const crit = scheme.matchCriteria;

      if (crit.minAge && age >= crit.minAge) {
        score += 15;
        matchReasons.push(`Age ${age} meets minimum requirement (${crit.minAge}+)`);
      }
      if (crit.maxAge && age <= crit.maxAge) {
        score += 10;
        matchReasons.push(`Age within upper limit (${crit.maxAge})`);
      }

      if (crit.genders && (crit.genders.includes('all') || crit.genders.includes(gender))) {
        score += 15;
        if (gender === 'female' && crit.genders.includes('female')) {
          matchReasons.push('Targeted Women Welfare Scheme priority');
        }
      }

      if (crit.occupations) {
        const occMatch = crit.occupations.some(o => o.toLowerCase().includes(occupation.toLowerCase()) || occupation.toLowerCase().includes(o.toLowerCase()));
        if (occMatch) {
          score += 25;
          matchReasons.push(`Matches occupation category: ${occupation}`);
        }
      }

      if (crit.incomeLimit) {
        if (income <= crit.incomeLimit) {
          score += 20;
          matchReasons.push(`Annual Income ₹${income.toLocaleString()} within limit (₹${crit.incomeLimit.toLocaleString()})`);
        } else {
          score -= 30;
        }
      } else {
        score += 10;
      }

      const finalScore = Math.min(Math.max(score, 20), 98);

      return { scheme, score: finalScore, matchReasons };
    });

    scored.sort((a, b) => b.score - a.score);
    setMatchedResults(scored);
    setStep(4);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Smart Scheme Matcher Engine</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Answer 3 quick steps to discover 100% tailored Central &amp; State government schemes matching your profile.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          <div className={`p-2.5 rounded-xl transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            1. Personal Info
          </div>
          <div className={`p-2.5 rounded-xl transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            2. Occupation &amp; State
          </div>
          <div className={`p-2.5 rounded-xl transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-400'}`}>
            3. Income &amp; Education
          </div>
          <div className={`p-2.5 rounded-xl transition-all ${step >= 4 ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            4. Scheme Matches
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-500" />
            <span>Step 1: Personal Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age-range" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Age (Years): <strong className="text-blue-600 dark:text-blue-400 text-sm">{age} Years</strong>
              </label>
              <input
                id="age-range"
                type="range"
                min={14}
                max={85}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>14 yrs</span>
                <span>50 yrs</span>
                <span>85 yrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Gender Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all' as GenderCategory, label: 'Any / General' },
                  { id: 'female' as GenderCategory, label: 'Female 👧' },
                  { id: 'male' as GenderCategory, label: 'Male 👦' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      gender === g.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <span>Next: Occupation &amp; State</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-500" />
            <span>Step 2: Occupation &amp; Location</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="occupation-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Primary Occupation / Status
              </label>
              <select
                id="occupation-select"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {OCCUPATIONS_LIST.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                State / Union Territory
              </label>
              <select
                id="state-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATES_LIST.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <input
              type="checkbox"
              id="pwd"
              checked={isDisability}
              onChange={(e) => setIsDisability(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="pwd" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
              Person with Benchmark Disability (PwD) / Differently Abled Support Eligible
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <span>Next: Financials &amp; Education</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <span>Step 3: Income &amp; Education Level</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="income-range" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Annual Family Income (INR): <strong className="text-emerald-600 dark:text-emerald-400 text-sm">₹{income.toLocaleString()}</strong>
              </label>
              <input
                id="income-range"
                type="range"
                min={50000}
                max={3000000}
                step={50000}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹50K (BPL)</span>
                <span>₹8Lakhs (NCL)</span>
                <span>₹30Lakhs</span>
              </div>
            </div>

            <div>
              <label htmlFor="education-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Highest Qualification
              </label>
              <select
                id="education-select"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {['Below 10th', '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Post Graduate', 'Doctorate'].map((ed) => (
                  <option key={ed} value={ed}>
                    {ed}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={calculateMatches}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white font-bold text-xs shadow-xl shadow-emerald-500/25 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Calculate Scheme Matches</span>
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Analysis Complete</span>
              <h3 className="text-xl font-extrabold">Found {matchedResults.length} Schemes Matching Your Profile</h3>
              <p className="text-xs text-blue-100 mt-1">
                Profile: {age} yrs &bull; {gender.toUpperCase()} &bull; {occupation} &bull; {state} &bull; Income: ₹{income.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors shrink-0"
            >
              Modify Profile Details
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {matchedResults.map(({ scheme, score, matchReasons }) => {
              const saved = isBookmarked(scheme.id);
              return (
                <div
                  key={scheme.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {scheme.level} Scheme
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{scheme.ministry}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {scheme.title} ({scheme.shortCode})
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                          {score}%
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">Match Confidence</div>
                      </div>
                      <button
                        onClick={() => onSaveBookmark(scheme)}
                        aria-label={saved ? 'Remove bookmark' : 'Bookmark scheme'}
                        className={`p-2.5 rounded-2xl border transition-colors ${
                          saved
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                        title={saved ? 'Bookmarked' : 'Save to Vault'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs space-y-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>Why You Matched:</span>
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                      {matchReasons.map((reason, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Key Scheme Benefits:</h5>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {scheme.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectSchemeForEligibility(scheme)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                      >
                        Deep Eligibility Check
                      </button>
                      <button
                        onClick={() => onSelectSchemeForActionPlan(scheme)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1"
                      >
                        <span>Generate Action Plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
