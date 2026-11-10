// Shared English text-to-speech with best-voice selection.
//
// The Web Speech API's default voice sounds robotic. Quality depends entirely
// on which voice the browser exposes. Important caveat: Chrome's "Google ..."
// voices are *network* voices and setting one can make speak() fail silently,
// so we prefer reliable *local* voices first (Apple on macOS, SAPI on Windows)
// and only fall back to network voices (Google / Microsoft Natural) when no
// good local voice exists.

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

// Voice matching is by NAME across the whole pool (not by the `localService`
// flag, which browsers report inconsistently). Apple voices are matched first
// so Brave — which blocks Google's network voices — still finds a usable voice.
const APPLE_PREFERRED: ((voice: SpeechSynthesisVoice) => boolean)[] = [
  (voice) =>
    /(Samantha|Ava|Evan|Allison|Serena|Daniel|Karen|Moira|Tessa|Kate|Oliver|Siri)/i.test(
      voice.name,
    ),
];

const MICROSOFT_PREFERRED: ((voice: SpeechSynthesisVoice) => boolean)[] = [
  (voice) => /Microsoft .* Online \(Natural\) - English/i.test(voice.name),
];

const GOOGLE_PREFERRED: ((voice: SpeechSynthesisVoice) => boolean)[] = [
  (voice) => voice.name === "Google US English",
  (voice) => voice.name === "Google UK English Female",
  (voice) => voice.name === "Google UK English Male",
];

function pickBestVoice(): SpeechSynthesisVoice | null {
  const pool = (cachedVoices ?? []).filter(
    (voice) =>
      voice.lang.toLowerCase().startsWith("en") && !/espeak/i.test(voice.name),
  );
  if (pool.length === 0) return null;

  for (const matches of APPLE_PREFERRED) {
    const found = pool.find(matches);
    if (found) return found;
  }
  for (const matches of MICROSOFT_PREFERRED) {
    const found = pool.find(matches);
    if (found) return found;
  }
  // Google network voices last: Brave blocks them, so only use if nothing else.
  for (const matches of GOOGLE_PREFERRED) {
    const found = pool.find(matches);
    if (found) return found;
  }

  const local = pool.find((voice) => voice.localService);
  if (local) return local;

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

  // Some browsers leave speechSynthesis stuck in a paused state.
  synth.resume();
  synth.cancel();
  synth.speak(utterance);
}
