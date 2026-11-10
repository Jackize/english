// Shared flashcard/quiz exercise builder.
// Mỗi từ vựng sinh ra một bài tập nhỏ, xen kẽ trắc nghiệm (chọn nghĩa tiếng
// Việt) và điền từ (gõ lại từ tiếng Anh) để buổi học không bị một màu.

export interface ExerciseWord {
  id: string;
  word: string;
  ipa: string | null;
  wordForm: string | null;
  meaningVi: string;
  meaningEn: string | null;
  example: string | null;
}

export type MiniExercise =
  | { kind: "mcq"; word: string; meaningVi: string; choices: string[]; correctIndex: number }
  | { kind: "fill"; word: string; meaningVi: string; example: string | null; blank: string | null };

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildExercises(vocab: ExerciseWord[]): MiniExercise[] {
  return vocab.map((entry, index) => {
    if (index % 2 === 0) {
      const seen = new Set<string>([entry.meaningVi]);
      const distractors: string[] = [];
      for (const other of shuffle(vocab.filter((_, j) => j !== index))) {
        if (distractors.length >= 3) break;
        if (seen.has(other.meaningVi)) continue;
        seen.add(other.meaningVi);
        distractors.push(other.meaningVi);
      }
      const choices = shuffle([entry.meaningVi, ...distractors]);
      return {
        kind: "mcq",
        word: entry.word,
        meaningVi: entry.meaningVi,
        choices,
        correctIndex: choices.indexOf(entry.meaningVi),
      };
    }

    let blank: string | null = null;
    if (entry.example) {
      const pattern = new RegExp(`\\b${escapeRegex(entry.word)}\\b`, "i");
      if (pattern.test(entry.example)) {
        blank = entry.example.replace(pattern, "______");
      }
    }
    return {
      kind: "fill",
      word: entry.word,
      meaningVi: entry.meaningVi,
      example: entry.example,
      blank,
    };
  });
}
