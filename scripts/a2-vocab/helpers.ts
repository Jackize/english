import type { SeedWord } from "../curriculum-data";

/** Tạo một mục từ vựng A2 với đầy đủ 6 trường. */
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
