import { useEffect } from 'react';
import { Language } from '../types/fraud';
import { speechSynthesizer } from './speechSynthesizer';

export function useCursorVoice(enabled: boolean, language: Language) {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest speakable element
      const speakEl = target.closest<HTMLElement>(
        '[data-speak], [data-speak-te], [data-speak-hi], [data-speak-en], button, h1, h2, h3, h4, input, select, textarea, [role="button"]'
      );

      if (!speakEl) return;

      let textToSpeak = '';

      if (language === 'te' && speakEl.getAttribute('data-speak-te')) {
        textToSpeak = speakEl.getAttribute('data-speak-te')!;
      } else if (language === 'hi' && speakEl.getAttribute('data-speak-hi')) {
        textToSpeak = speakEl.getAttribute('data-speak-hi')!;
      } else if (language === 'en' && speakEl.getAttribute('data-speak-en')) {
        textToSpeak = speakEl.getAttribute('data-speak-en')!;
      } else if (speakEl.getAttribute('data-speak')) {
        textToSpeak = speakEl.getAttribute('data-speak')!;
      } else if (speakEl.getAttribute('aria-label')) {
        textToSpeak = speakEl.getAttribute('aria-label')!;
      } else if (speakEl.tagName === 'INPUT' || speakEl.tagName === 'SELECT' || speakEl.tagName === 'TEXTAREA') {
        const label = speakEl.getAttribute('placeholder') || speakEl.getAttribute('name') || '';
        if (label) {
          textToSpeak = language === 'te' ? `ఫీల్డ్: ${label}` : language === 'hi' ? `फ़ील्ड: ${label}` : `Field: ${label}`;
        }
      } else if (speakEl.tagName === 'BUTTON' || speakEl.tagName === 'H1' || speakEl.tagName === 'H2' || speakEl.tagName === 'H3' || speakEl.tagName === 'H4') {
        textToSpeak = speakEl.innerText?.trim().slice(0, 80) || '';
      }

      if (textToSpeak && textToSpeak.length > 1) {
        speechSynthesizer.speakHover(textToSpeak, language);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, language]);
}
