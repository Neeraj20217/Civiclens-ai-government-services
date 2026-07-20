'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Mic,
  Bot,
  User,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SupportedLanguage } from '@/lib/translations';
import { FormattedMarkdownMessage } from '@/components/ui/FormattedMarkdownMessage';
import { askGeminiAi } from '@/lib/gemini';
import { ChatMessage } from '@/types/chat';
import { voiceController } from '@/lib/voice';

interface FloatingChatbotWidgetProps {
  currentLang: SupportedLanguage;
}

const DEFAULT_WIDGET_MESSAGE: ChatMessage = {
  id: 'widget-welcome',
  role: 'assistant',
  content: 'Hello! I am your **CivicLens AI Assistant**. Ask me anything about Indian government schemes, certificate checklists, or passport procedures!',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const FloatingChatbotWidget: React.FC<FloatingChatbotWidgetProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WIDGET_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const aiResult = await askGeminiAi(textToSend, currentLang, history);

      const botMsgId = `bot-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        role: 'assistant',
        content: aiResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: aiResult.suggestedActions,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Widget error:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
          console.error('Voice error:', err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
    }
  };

  const toggleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      voiceController.stopSpeaking();
      setSpeakingMsgId(null);
    } else {
      setSpeakingMsgId(msgId);
      voiceController.speak(text, currentLang, () => setSpeakingMsgId(null));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open CivicLens AI Chatbot"
          className="group relative p-4 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-2xl shadow-blue-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Open CivicLens AI Chatbot</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">CivicLens AI Chatbot</h3>
                <p className="text-[10px] text-blue-100 font-medium">Google Gemini 2.5 Active</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chatbot Widget"
              className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  <FormattedMarkdownMessage content={msg.content} />
                  {msg.role === 'assistant' && (
                    <div className="mt-2 pt-1 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[9px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => toggleSpeak(msg.id, msg.content)}
                        className="hover:text-blue-500 font-semibold flex items-center gap-0.5"
                      >
                        {speakingMsgId === msg.id ? (
                          <VolumeX className="w-3 h-3 text-red-500" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-blue-500" />
                        )}
                        <span>{speakingMsgId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  Thinking...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={inputText}
                aria-label="Type message in chatbot widget"
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask government scheme or certificate..."
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                aria-label="Voice input"
                className={`p-2 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-bounce'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                aria-label="Send message"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
