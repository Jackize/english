export interface QuizWord {
  word: string;
  ipa?: string | null;
  meaningVi: string;
  example?: string | null;
}

export interface GeneratedQuestion {
  prompt: string;
  explanation: string;
  choices: { label: string; correct?: boolean }[];
}

export type WrittenDirection = "vi-en" | "en-vi";

export interface WrittenPrompt {
  vocabId: string;
  direction: WrittenDirection;
  prompt: string;
}

/**
 * Sinh danh sách câu tự luận cho phần thi thật:
 * - Việt → Anh: hiện nghĩa tiếng Việt, người học gõ từ tiếng Anh.
 * - Anh → Việt: hiện từ tiếng Anh, người học gõ nghĩa tiếng Việt.
 * Mỗi từ xuất hiện ở cả hai chiều để kiểm tra cả khả năng nhận biết và tái tạo.
 */
export function buildWrittenPrompts(
  words: { id: string; word: string; meaningVi: string }[],
): WrittenPrompt[] {
  return [
    ...words.map((word) => ({
      vocabId: word.id,
      direction: "vi-en" as const,
      prompt: word.meaningVi,
    })),
    ...words.map((word) => ({
      vocabId: word.id,
      direction: "en-vi" as const,
      prompt: word.word,
    })),
  ];
}

export function buildVocabularyQuestions(words: QuizWord[]): GeneratedQuestion[] {
  return words.map((word, index) => {
    const distractors: string[] = [];
    const offsets = [1, 3, 5, 2, 4, 6];
    for (const offset of offsets) {
      const candidate = words[(index + offset) % words.length];
      if (candidate && candidate.meaningVi !== word.meaningVi && !distractors.includes(candidate.meaningVi)) {
        distractors.push(candidate.meaningVi);
      }
      if (distractors.length === 3) break;
    }

    // Đặt đáp án đúng ở vị trí khác nhau để không lộ đáp án.
    const labels = [word.meaningVi, ...distractors];
    const offset = (word.word.length + index) % labels.length;
    const ordered = [...labels.slice(offset), ...labels.slice(0, offset)];

    return {
      prompt: `Từ “${word.word}” có nghĩa là gì?`,
      explanation: `${word.word}${word.ipa ? ` ${word.ipa}` : ""} — ${word.meaningVi}.${
        word.example ? ` Ví dụ: ${word.example}` : ""
      }`,
      choices: ordered.map((label) => ({ label, correct: label === word.meaningVi })),
    };
  });
}
