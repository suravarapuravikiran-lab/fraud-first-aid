import { Language } from '../types/fraud';

// In-memory audio cache for zero-latency hover playback
const audioCache = new Map<string, HTMLAudioElement>();

class SpeechSynthesizer {
  private currentAudio: HTMLAudioElement | null = null;
  private synth: SpeechSynthesis | null = null;
  private isSpeakingState: boolean = false;
  private onStateChangeCb: ((isSpeaking: boolean) => void) | null = null;
  private hoverTimer: any = null;
  private lastSpokenKey: string = '';
  private lastSpokenTime: number = 0;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
    // Pre-cache key emergency phrases for instant 0ms response
    this.preloadKeyPhrases();
  }

  private preloadKeyPhrases() {
    const keyPhrases = [
      { text: 'నేషనల్ సైబర్ క్రైమ్ హెల్ప్‌లైన్ నంబర్ 1930 కి ఇప్పుడే కాల్ చేయండి', lang: 'te' },
      { text: 'యూపీఐ పేమెంట్ మోసం. ఫోన్‌పే, గూగుల్ పే మోసాలు', lang: 'te' },
      { text: 'నకిలీ ఉద్యోగ టాస్క్ మోసం. టెలిగ్రామ్ వాట్సాప్ ఫ్రాడ్', lang: 'te' },
      { text: 'ఎనీడెస్క్ రిమోట్ యాక్సెస్ మరియు ఓటీపీ హ్యాకింగ్', lang: 'te' },
      { text: 'డిజిటల్ అరెస్ట్ మరియు ఫేక్ పోలీస్ బెదిరింపు కాల్స్', lang: 'te' },
      { text: 'వాయిస్ గైడ్ ఆన్ చేయబడింది', lang: 'te' },
    ];

    setTimeout(() => {
      keyPhrases.forEach(item => {
        this.getAudioElement(item.text, item.lang as Language);
      });
    }, 1000);
  }

  public isSupported(): boolean {
    return true;
  }

  public setOnStateChange(cb: (isSpeaking: boolean) => void) {
    this.onStateChangeCb = cb;
  }

  public playAlertChime(freq: number = 720, duration: number = 0.15) {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + duration * 0.4);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // AudioContext fallback
    }
  }

  public stop() {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeakingState = false;
    if (this.onStateChangeCb) this.onStateChangeCb(false);
  }

  /**
   * Generates a natural HD voice stream from Google Neural Voice Engine
   * Provides fluent Telugu (Andhra/Telangana native), Hindi, and English
   */
  private getAudioElement(text: string, lang: Language): HTMLAudioElement {
    const cleanText = text.trim().slice(0, 180);
    const cacheKey = `${lang}_${cleanText}`;

    if (audioCache.has(cacheKey)) {
      return audioCache.get(cacheKey)!;
    }

    const tl = lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : 'en';
    // /api/tts routes to Vite proxy in local dev, and to api/tts.ts serverless function in Vercel production
    const url = `/api/tts?tl=${tl}&q=${encodeURIComponent(cleanText)}`;

    const audio = new Audio(url);
    audio.preload = 'auto';

    audioCache.set(cacheKey, audio);
    return audio;
  }

  /**
   * Speak using Google Neural Voice stream, with browser SpeechSynthesis fallback
   */
  public speak(text: string, lang: Language, playChime: boolean = true): Promise<boolean> {
    return new Promise((resolve) => {
      this.stop();

      if (playChime) {
        this.playAlertChime();
      }

      // Try Google Natural Voice Audio Stream first (Produces 100% authentic Andhra Telugu)
      try {
        const audio = this.getAudioElement(text, lang);
        this.currentAudio = audio;
        audio.currentTime = 0;

        audio.onplay = () => {
          this.isSpeakingState = true;
          if (this.onStateChangeCb) this.onStateChangeCb(true);
        };

        audio.onended = () => {
          this.isSpeakingState = false;
          this.currentAudio = null;
          if (this.onStateChangeCb) this.onStateChangeCb(false);
          resolve(true);
        };

        audio.onerror = () => {
          // If network audio fails, fall back to browser synth
          this.speakWithBrowserSynth(text, lang).then(resolve);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio play error, falling back to browser SpeechSynthesis:', err);
            this.speakWithBrowserSynth(text, lang).then(resolve);
          });
        }
      } catch (e) {
        this.speakWithBrowserSynth(text, lang).then(resolve);
      }
    });
  }

  /**
   * Fallback using browser SpeechSynthesis
   */
  private speakWithBrowserSynth(text: string, lang: Language): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve(false);
        return;
      }

      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isSpeakingState = true;
        if (this.onStateChangeCb) this.onStateChangeCb(true);
      };

      utterance.onend = () => {
        this.isSpeakingState = false;
        if (this.onStateChangeCb) this.onStateChangeCb(false);
        resolve(true);
      };

      utterance.onerror = () => {
        this.isSpeakingState = false;
        if (this.onStateChangeCb) this.onStateChangeCb(false);
        resolve(false);
      };

      this.synth.speak(utterance);
    });
  }

  /**
   * Hover-activated voice with 100ms debounce
   */
  public speakHover(text: string, lang: Language) {
    if (!text.trim()) return;

    const cacheKey = `${lang}_${text.trim()}`;
    const now = Date.now();

    // Prevent immediate re-trigger on same element within 1.6s
    if (cacheKey === this.lastSpokenKey && now - this.lastSpokenTime < 1600) {
      return;
    }

    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }

    this.hoverTimer = setTimeout(() => {
      this.lastSpokenKey = cacheKey;
      this.lastSpokenTime = Date.now();
      this.playAlertChime(850, 0.07);
      this.speak(text, lang, false);
    }, 100);
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechSynthesizer = new SpeechSynthesizer();
