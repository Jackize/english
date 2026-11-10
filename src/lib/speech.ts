// Shared English text-to-speech with best-voice selection.
//
// The Web Speech API's default voice sounds robotic. Quality depends entirely
// on which voice the browser exposes, so here we rank the high-quality voices
// (Microsoft "Online (Natural)" on Edge, Google remote voices on Chrome, Apple
// premium/standard voices on macOS/iOS) and pick the best one available.

let cachedVoices: SpeechSynthesisVoice[] | null = null;

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

function refreshVoices() {
  const synth = getSynth();
  if (!synth) return;
  const list = synth.getVoices();
  if (list.length > 0) cachedVoices = list;
}

// Chrome loads voices asynchronously: getVoices() is empty on the first call
// and fills up after the `voiceschanged` event.
if (typeof window !== "undefined") {
  const synth = getSynth();
  if (synth) {
    refreshVoices();
    synth.onvoiceschanged = refreshVoices;
  }
}

// Ordered best → worst across browsers/OSes. A matcher that returns true for a
// voice wins. Everything else falls back to "first English voice".
const PREFERRED_VOICES: ((voice: SpeechSynthesisVoice) => boolean)[] = [
  // Microsoft neural voices (Edge / Windows) — the best widely available.
  (voice) =>
    /Microsoft .* Online \(Natural\) - English \(United (States|Kingdom)\)/i.test(voice.name),
  // Google remote voices (Chrome / Android).
  (voice) => voice.name === "Google US English",
  (voice) => voice.name === "Google UK English Female",
  (voice) => voice.name === "Google UK English Male",
  // Apple premium / enhanced / standard (macOS / iOS / Safari).
  (voice) =>
    /(Samantha|Ava \(Premium\)|Ava \(Enhanced\)|Evan \(Enhanced\)|Allison|Serena|Daniel|Karen)/i.test(
      voice.name,
    ),
  // Windows offline SAPI voices — dated but clear; better than nothing.
  (voice) => /Microsoft (David|Zira) Desktop/i.test(voice.name),
];

function pickBestVoice(): SpeechSynthesisVoice | null {
  const pool = (cachedVoices ?? []).filter(
    (voice) =>
      voice.lang.toLowerCase().startsWith("en") &&
      !/espeak/i.test(voice.name),
  );
  if (pool.length === 0) return null;

  for (const matches of PREFERRED_VOICES) {
    const found = pool.find(matches);
    if (found) return found;
  }

  return (
    pool.find((voice) => voice.lang.toLowerCase() === "en-us") ??
    pool.find((voice) => voice.lang.toLowerCase() === "en-gb") ??
    pool[0] ??
    null
  );
}

export function speakEnglish(text: string, options?: { rate?: number }) {
  const synth = getSynth();
  if (!synth) return;
  const value = text.trim();
  if (!value) return;

  refreshVoices();

  const utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = "en-US";
  utterance.rate = options?.rate ?? 0.9;

  const voice = pickBestVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  synth.cancel();
  synth.speak(utterance);
}
