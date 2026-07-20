'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Compass,
  FileCheck,
  Building2,
  ListTodo,
  CheckCircle2
} from 'lucide-react';
import { FormattedMarkdownMessage } from '@/components/ui/FormattedMarkdownMessage';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { askGeminiAi } from '@/lib/gemini';
import { ChatMessage } from '@/types/chat';
import { voiceController } from '@/lib/voice';

interface AiAssistantTabProps {
  initialPrompt?: string;
  currentLang: SupportedLanguage;
  onNavigateToTab: (tabId: string, payload?: unknown) => void;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `### 🏛️ Welcome to CivicLens AI Assistant!

I am your personalized **Google Cloud AI Assistant for Government Services**. I can help you with:

- 🌾 **Welfare Schemes**: PM-KISAN, Ayushman Bharat, Post-Matric Scholarships, MUDRA loans.
- 📜 **Certificates & Licenses**: Caste Certificate, Domicile, Non-Creamy Layer, Passport, RTO Driving License.
- 💼 **Startup & Grants**: Startup India Seed Fund, Udyam MSME, Business Subsidy.
- 🗣️ **Multilingual Support**: Available in 8 Indic languages with Speech-to-Text & Text-to-Speech!

How may I assist you today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedActions: [
    'Match Welfare Schemes',
    'Caste Certificate Guide',
    'Passport Application',
    'Locate RTO / MeeSeva Office'
  ],
  isRealApi: true,
};

export const AiAssistantTab: React.FC<AiAssistantTabProps> = ({
  initialPrompt,
  currentLang,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const processedPromptRef = useRef<string | null>(null);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendPromptInternal = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const chatHistory = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const aiResult = await askGeminiAi(textToSend, currentLang, chatHistory);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        role: 'assistant',
        content: aiResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: aiResult.suggestedActions,
        referencedSchemes: aiResult.referencedSchemes,
        documentChecklist: aiResult.documentChecklist,
        isRealApi: aiResult.isRealApi,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error fetching Gemini response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && processedPromptRef.current !== initialPrompt) {
      processedPromptRef.current = initialPrompt;
      sendPromptInternal(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleVoiceInput = () => {
    if (isListening) {
      voiceController.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceController.startListening(
        currentLang,
        (text) => {
          setInputText(text);
          setIsListening(false);
        },
        (err) => {
          console.error('Voice input error:', err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
    }
  };

  const toggleSpeakMessage = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      voiceController.stopSpeaking();
      setSpeakingMsgId(null);
    } else {
      setSpeakingMsgId(msgId);
      voiceController.speak(text, currentLang, () => {
        setSpeakingMsgId(null);
      });
    }
  };

  const handleActionClick = (action: string) => {
    if (action.includes('Match') || action.includes('Scheme')) {
      onNavigateToTab('matcher');
    } else if (action.includes('Checklist') || action.includes('Document')) {
      onNavigateToTab('checklist');
    } else if (action.includes('Office') || action.includes('Locate')) {
      onNavigateToTab('offices');
    } else if (action.includes('Plan') || action.includes('Action')) {
      onNavigateToTab('actionplan');
    } else {
      sendPromptInternal(action);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl h-[calc(100vh-5rem)] flex flex-col">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xl mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-0.5 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">CivicLens Gemini AI Assistant</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Multi-turn Indic Conversational AI &bull; Google Gemini 2.5 Flash
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToTab('matcher')}
            aria-label="Open Scheme Matcher"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Scheme Matcher</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 overflow-y-auto space-y-6 backdrop-blur-xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[75%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
                }`}
              >
                <FormattedMarkdownMessage content={msg.content} />

                <div className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] opacity-80">
                  <span>{msg.timestamp}</span>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => toggleSpeakMessage(msg.id, msg.content)}
                      aria-label="Listen to message audio"
                      className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-1 font-semibold"
                      title="Listen via Voice Speech Synthesis"
                    >
                      {speakingMsgId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-1">
                  {msg.suggestedActions.map((action, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handleActionClick(action)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold transition-all shadow-sm flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span>{action}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-center text-xs text-slate-400 font-medium">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>Gemini 2.5 is retrieving official scheme guidelines...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendPromptInternal(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            aria-label="Ask CivicLens AI"
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.askPromptPlaceholder || 'Type your query or scheme question...'}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700"
          />

          <button
            type="button"
            onClick={handleVoiceInput}
            aria-label="Voice input speech to text"
            className={`p-3 rounded-2xl transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-bounce'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Speech to Text Voice Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            aria-label="Send message to AI assistant"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToTab('matcher')}
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <Compass className="w-3 h-3" />
              <span>Scheme Matcher</span>
            </button>
            <button
              onClick={() => onNavigateToTab('checklist')}
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <FileCheck className="w-3 h-3" />
              <span>Checklists</span>
            </button>
            <button
              onClick={() => onNavigateToTab('explainer')}
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3 h-3" />
              <span>Doc Explainer</span>
            </button>
            <button
              onClick={() => onNavigateToTab('actionplan')}
              className="hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <ListTodo className="w-3 h-3" />
              <span>Action Plan</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Zero Data Logging Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
