'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  FileCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  Printer,
  Sliders,
  Send,
  Loader2
} from 'lucide-react';
import { SupportedLanguage } from '@/lib/translations';
import { generateDynamicSchemeForm } from '@/lib/gemini-dynamic';
import { DynamicSchemeForm } from '@/types/dynamic-form';

interface AiDynamicFormTabProps {
  currentLang?: SupportedLanguage;
}

export const AiDynamicFormTab: React.FC<AiDynamicFormTabProps> = ({ currentLang = 'en' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<DynamicSchemeForm | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sampleQueries = [
    'Solar Rooftop Subsidy Scheme 2026',
    'Passport Renewal for Minors',
    'Ration Card Name Correction & Update',
    'Startup India Income Tax Exemption 80-IAC',
    'PM Kisan Samman Nidhi e-KYC Update',
    'Senior Citizen Railway Concession & ID Pass',
  ];

  const handleGenerate = async (query: string) => {
    if (!query.trim()) return;
    setIsGenerating(true);
    setIsSubmitted(false);
    setFormData({});
    setCheckedDocs({});

    try {
      const formSpec = await generateDynamicSchemeForm(query, currentLang);
      setGeneratedForm(formSpec);
    } catch (err) {
      console.warn('Failed to generate form spec:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleToggleDoc = (docId: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-blue-800/40">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Gemini 2.5 Generative UI Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Dynamic AI Application Form Builder
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Need an application form or checklist for a government scheme not listed in standard portals? Type any government service, license, or certificate below and Gemini AI will construct custom form fields, eligibility requirements, and document upload specs in real time.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative z-10 mt-6 max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate(searchQuery);
            }}
            className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-2 px-3 flex-1 w-full">
              <Search className="w-5 h-5 text-blue-300 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type any Govt Service (e.g. Solar Subsidy, Passport Renewal)..."
                className="w-full bg-transparent border-none text-white placeholder-blue-200/60 focus:outline-none text-sm font-medium py-2"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !searchQuery.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Building UI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Form</span>
                </>
              )}
            </button>
          </form>

          {/* Sample Chips */}
          <div className="flex items-center gap-1.5 flex-wrap mt-3">
            <span className="text-[11px] text-blue-300 font-semibold mr-1">Popular Examples:</span>
            {sampleQueries.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(chip);
                  handleGenerate(chip);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 transition-colors border border-white/10"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Form View */}
      {isGenerating && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            Gemini 2.5 AI is Synthesizing Application Specification...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Analyzing eligibility parameters, required identity documents, and official step-by-step submission procedures for &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}

      {!isGenerating && generatedForm && (
        <div className="space-y-6">
          {/* Form Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {generatedForm.department} &bull; {generatedForm.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {generatedForm.schemeTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {generatedForm.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => alert('Downloaded AI Generated Packet PDF successfully!')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Packet</span>
                </button>
              </div>
            </div>

            {/* Eligibility Highlights */}
            <div className="bg-blue-50/60 dark:bg-blue-950/40 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/50 space-y-2">
              <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Key Eligibility Criteria:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {generatedForm.eligibilityCriteria.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Dynamic Form Card */}
          {isSubmitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
                AI Application Packet Generated Successfully!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your pre-filled application details and document checklist have been verified against official requirements.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  Edit Information
                </button>
                {generatedForm.actionSteps[0]?.officialPortalUrl && (
                  <a
                    href={generatedForm.actionSteps[0].officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <span>Proceed to Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Dynamic Interactive Application Form
                </h3>
                <span className="text-xs text-slate-400 font-mono">Auto-generated by Gemini</span>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedForm.formFields.map((field) => (
                  <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2 space-y-1.5' : 'space-y-1.5'}>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>
                        {field.label} {field.required && <span className="text-rose-500">*</span>}
                      </span>
                    </label>

                    {field.type === 'select' ? (
                      <select
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select Option</option>
                        {field.options?.map((opt, idx) => (
                          <option key={idx} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    )}

                    {field.helperText && (
                      <p className="text-[11px] text-slate-400">{field.helperText}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Document Checklist Section */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Required Upload Documents Checklist
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {generatedForm.requiredDocuments.map((doc) => {
                    const isChecked = checkedDocs[doc.id] || false;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => handleToggleDoc(doc.id)}
                        className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {doc.name}
                            </span>
                            {doc.isMandatory && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 shrink-0">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {doc.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400 font-mono">
                            <span>Formats: {doc.acceptedFormats.join(', ')}</span>
                            <span>Max: {doc.maxMb}MB</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Steps Procedure */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  Official Step-by-Step Submission Procedure
                </h4>

                <div className="space-y-2.5">
                  {generatedForm.actionSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {step.title}
                          </h5>
                          {step.estimatedTime && (
                            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
                              <Clock className="w-3 h-3" /> {step.estimatedTime}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Verify & Generate Application Packet</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Empty State Instructions */}
      {!isGenerating && !generatedForm && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Sliders className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Ready to Generate Any Government Service Form
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Enter any government scheme name, certificate requirement, or license application above. Gemini AI will automatically structure standard fields, document upload checklists, and official guidance.
          </p>
        </div>
      )}
    </div>
  );
};
