'use client';

import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  Printer,
  CheckSquare,
  Square,
  Info
} from 'lucide-react';
import { GOVERNMENT_SCHEMES } from '@/lib/schemes-data';

export const DocChecklistTab: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('caste-and-validity-certificate');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const selectedScheme = GOVERNMENT_SCHEMES.find((s) => s.id === selectedServiceId) || GOVERNMENT_SCHEMES[0];

  const toggleCheck = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      service: selectedScheme.title,
      generatedDate: new Date().toISOString(),
      documents: selectedScheme.keyDocumentsRequired.map(d => ({
        document: d,
        isPrepared: !!checkedDocs[d]
      }))
    }, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr);
    dlAnchorElem.setAttribute("download", `Checklist_${selectedScheme.shortCode}.json`);
    dlAnchorElem.click();
  };

  const checkedCount = selectedScheme.keyDocumentsRequired.filter(d => checkedDocs[d]).length;
  const totalDocs = selectedScheme.keyDocumentsRequired.length;
  const progressPercent = Math.round((checkedCount / totalDocs) * 100);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Document Checklist Generator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive document readiness tracker &amp; printable official checklists for government services.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJson}
            aria-label="Download document checklist as JSON"
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-blue-500" />
            <span>Download JSON</span>
          </button>
          <button
            onClick={handlePrint}
            aria-label="Print document checklist"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Checklist</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg mb-6 space-y-3">
        <label htmlFor="service-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Government Service / Certificate:
        </label>
        <select
          id="service-select"
          value={selectedServiceId}
          onChange={(e) => {
            setSelectedServiceId(e.target.value);
            setCheckedDocs({});
          }}
          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {GOVERNMENT_SCHEMES.map((scheme) => (
            <option key={scheme.id} value={scheme.id}>
              {scheme.title} ({scheme.shortCode})
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {selectedScheme.ministry}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Official Document Checklist: {selectedScheme.title}
            </h3>
          </div>

          <div className="text-right">
            <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
              {checkedCount} / {totalDocs} Prepared
            </div>
            <div className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {selectedScheme.keyDocumentsRequired.map((docName, idx) => {
            const isChecked = !!checkedDocs[docName];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(docName)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isChecked
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {docName}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {isChecked ? 'Ready' : 'Required Original'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs space-y-2">
          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Important Verification Instructions:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
            <li>Always carry 1 set of self-attested photocopies along with original documents.</li>
            <li>Ensure applicant name spelling matches 100% across Aadhaar, PAN, and marksheets.</li>
            <li>Income certificates must be issued for the current financial year.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
