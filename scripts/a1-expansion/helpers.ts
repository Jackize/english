import type { SeedVocabLesson, SeedWord } from "../curriculum-data";

/** Tạo một mục từ vựng A1 với đầy đủ 6 trường. */
export function w(
  word: string,
  ipa: string,
  wordForm: string,
  meaningVi: string,
  meaningEn: string,
  example: string,
): SeedWord {
  return { word, ipa, wordForm, meaningVi, meaningEn, example };
}

/** Tạo một bài học A1 gọn: 1 phần lý thuyết + danh sách từ. */
export function lesson(
  title: string,
  summary: string,
  sectionTitle: string,
  body: string,
  remember: string,
  words: SeedWord[],
): SeedVocabLesson {
  return {
    title,
    summary,
    sections: [{ title: sectionTitle, body, remember }],
    words,
  };
}

/** Phần mở rộng của một chủ đề A1 cũ: 1 từ bổ sung cho bài 1 + 3 bài mới. */
export interface A1TopicExpansion {
  extraWord: SeedWord;
  lessons: SeedVocabLesson[];
}
