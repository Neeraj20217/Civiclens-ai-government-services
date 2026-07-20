'use client';

import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { analyzeGovernmentDocument } from '@/lib/gemini';
import { DocumentAnalysisResult } from '@/types/chat';

export const DocExplainerTab: React.FC = () => {
  const [docText, setDocText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null);

  const sampleGRs = [
    {
      title: 'Maharashtra Government Gazette Resolution (Caste Validity Guidelines 2026)',
      sampleText: `GOVERNMENT OF MAHARASHTRA - REVENUE & SOCIAL JUSTICE DEPARTMENT
GR No. CBC-2026/CR-142/BCW-5
Subject: Mandatory submission of Form-15 Affidavit and Pre-1950 Blood Relative School Extracts for Caste Scrutiny Committee Verification.

It is hereby notified that all candidates seeking admissions to Higher & Technical Education under reserved SC/ST categories must present an Encumbrance-free Domicile Certificate alongside a notarized affidavit. The Tahsildar / Patwari shall verify the ancestral land revenue record 7/12 prior to issuing the provisional certificate. Non-Creamy Layer (NCL) certificate issued prior to 1st April 2026 shall be deemed invalid. Deadline for document upload on portal is 30th September 2026.`
    },
    {
      title: 'Startup India Seed Fund DPIIT Gazette Notification',
      sampleText: `MINISTRY OF COMMERCE AND INDUSTRY (DPIIT) - NOTIFICATION
Ref: SISFS/2026/POLICY-GUIDELINES
Sub: Grant of Seed Funding up to ₹20 Lakhs for Early-Stage Incubated Startups.

Eligibility parameters mandate that the entity must be incorporated as a Private Limited Company or LLP registered with Ministry of Corporate Affairs (MCA) within the preceding 24 months. Startups having received prior monetary grant exceeding ₹10 Lakhs under any central scheme are barred. Discrepancies in Founder Aadhaar PAN mapping will lead to automatic rejection by the Incubator Seed Evaluation Committee (IS-EC).`
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setDocText(`Scanned Document Content (${file.name}):\nGovernment Resolution / Notice regarding citizen service eligibility rules. Requires Aadhaar biometric verification and NPCI bank seeding before the 30th September deadline.`);
    }
  };

  const handleAnalyze = async () => {
    if (!docText.trim() && !uploadedFileName) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeGovernmentDocument(docText);
      setAnalysisResult(res);
    } catch (err) {
      console.error('Document analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Government Document Explainer &amp; Jargon Decoder</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload complex government notices, GRs, or PDFs to get plain-language summaries, legal terms translated, and key deadlines.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Try Sample Government Resolution (GR):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleGRs.map((sample, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDocText(sample.sampleText);
                  setUploadedFileName(sample.title);
                }}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 border border-slate-200 dark:border-slate-700 text-xs font-medium text-left text-slate-700 dark:text-slate-200 transition-all"
              >
                📄 {sample.title}
              </button>
            ))}
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50 dark:bg-slate-800/30">
          <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {uploadedFileName ? `Loaded File: ${uploadedFileName}` : 'Drag & Drop Government PDF / Image or Click to Browse'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Supports PDF, PNG, JPG, or Scanned GR Notices</p>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload-input"
          />
          <label
            htmlFor="file-upload-input"
            className="mt-3 inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Choose File
          </label>
        </div>

        <div>
          <label htmlFor="doc-text-area" className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
            Or Paste Document Text Directly:
          </label>
          <textarea
            id="doc-text-area"
            rows={5}
            value={docText}
            onChange={(e) => setDocText(e.target.value)}
            placeholder="Paste official notification text here..."
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!docText.trim() && !uploadedFileName)}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 disabled:opacity-50 text-white font-bold text-xs shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            {isAnalyzing ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isAnalyzing ? 'Gemini is Analyzing GR...' : 'Explain Document & Decode Jargon'}</span>
          </button>
        </div>
      </div>

      {analysisResult && (
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>💡 Executive Summary (Plain Language)</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {analysisResult.summary}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>📖 Legal &amp; Administrative Jargon Buster</span>
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {analysisResult.jargon.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    {item.term}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {item.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>⏰ Important Dates &amp; Deadlines:</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {analysisResult.importantDates.map((date: string, i: number) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>⚡ Action Items For You:</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {analysisResult.actionItems.map((act: string, i: number) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-2 text-xs text-rose-800 dark:text-rose-200">
            <h4 className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>⚠️ Critical Warnings &amp; Red Flags:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {analysisResult.warnings.map((warn: string, i: number) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
