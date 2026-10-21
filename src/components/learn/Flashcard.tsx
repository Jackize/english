"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export interface FlashcardWord {
  id: string;
  word: string;
  ipa?: string | null;
  wordForm?: string | null;
  meaningEn: string;
  meaningVi: string;
  example?: string | null;
  relatedForms?: string | null;
}

interface FlashcardProps {
  word: FlashcardWord;
  onReview: (result: "know" | "hard" | "again") => void;
  loading?: boolean;
}

export function Flashcard({ word, onReview, loading }: FlashcardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleNext = (result: "know" | "hard" | "again") => {
    setRevealed(false);
    onReview(result);
  };

  return (
    <div className="w-full max-w-lg">
      <div className={`perspective-container w-full ${revealed ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="card-elevation flex min-h-[400px] flex-col items-center rounded-xl bg-white p-xl text-center">
              <div className="mb-md text-xs font-semibold uppercase tracking-widest text-on-surface-variant opacity-60">
                {word.wordForm ?? "Word"}
              </div>
              <h1 className="mb-sm text-3xl font-semibold text-on-background md:text-4xl">{word.word}</h1>
              {word.ipa && (
                <div className="mb-xl flex items-center gap-sm">
                  <span className="text-on-surface-variant opacity-80">{word.ipa}</span>
                  <button
                    type="button"
                    aria-label="Pronounce"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-variant"
                    onClick={() => {
                      if ("speechSynthesis" in window) {
                        const utterance = new SpeechSynthesisUtterance(word.word.split(/\s*\/\s*/)[0]);
                        utterance.lang = "en-US";
                        speechSynthesis.speak(utterance);
                      }
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  </button>
                </div>
              )}
              {!revealed && (
                <Button className="w-full" onClick={() => setRevealed(true)}>
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                  Reveal Meaning
                </Button>
              )}
            </div>
          </div>

          <div className="flip-card-back">
            <div className="card-elevation flex min-h-[400px] flex-col items-center rounded-xl bg-white p-xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Nghĩa tiếng Việt</p>
              <h2 className="mb-md text-2xl font-semibold text-on-background">{word.meaningVi}</h2>
              <p className="mb-sm text-sm text-on-surface-variant">{word.meaningEn}</p>
              {word.example && (
                <p className="mb-sm text-sm italic text-on-surface-variant">&ldquo;{word.example}&rdquo;</p>
              )}
              {word.relatedForms && (
                <p className="mb-md text-xs text-on-surface-variant">Related: {word.relatedForms}</p>
              )}
              <div className="mt-auto flex w-full flex-col gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" disabled={loading} onClick={() => handleNext("again")}>
                    Again
                  </Button>
                  <Button variant="outline" disabled={loading} onClick={() => handleNext("hard")}>
                    Hard
                  </Button>
                  <Button disabled={loading} onClick={() => handleNext("know")}>
                    Know
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
