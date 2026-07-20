'use client';

import { useState, useCallback } from 'react';
import { SupportedLanguage } from '@/lib/translations';
import { voiceController } from '@/lib/voice';

export function useVoiceAssistant(currentLang: SupportedLanguage) {
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const toggleListening = useCallback(
    (onResult: (text: string) => void) => {
      if (isListening) {
        voiceController.stopListening();
        setIsListening(false);
      } else {
        setIsListening(true);
        voiceController.startListening(
          currentLang,
          (text) => {
            onResult(text);
            setIsListening(false);
          },
          (err) => {
            console.error('Speech recognition error:', err);
            setIsListening(false);
          },
          () => setIsListening(false)
        );
      }
    },
    [currentLang, isListening]
  );

  const toggleSpeaking = useCallback(
    (msgId: string, text: string) => {
      if (speakingMsgId === msgId) {
        voiceController.stopSpeaking();
        setSpeakingMsgId(null);
      } else {
        setSpeakingMsgId(msgId);
        voiceController.speak(text, currentLang, () => {
          setSpeakingMsgId(null);
        });
      }
    },
    [currentLang, speakingMsgId]
  );

  return {
    isListening,
    speakingMsgId,
    toggleListening,
    toggleSpeaking,
  };
}
