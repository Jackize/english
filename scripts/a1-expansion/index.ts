import type { SeedVocabTopic } from "../curriculum-data";
import type { A1TopicExpansion } from "./helpers";
import { PART_01 } from "./part-01";
import { PART_02 } from "./part-02";
import { PART_03 } from "./part-03";
import { PART_04 } from "./part-04";
import { PART_05 } from "./part-05";
import { PART_06 } from "./part-06";
import { NEW_TOPICS_A } from "./new-topics-a";
import { NEW_TOPICS_B } from "./new-topics-b";

/** Phần mở rộng của 18 chủ đề A1 gốc, tra theo slug. */
export const A1_EXPANSIONS: Record<string, A1TopicExpansion> = {
  ...PART_01,
  ...PART_02,
  ...PART_03,
  ...PART_04,
  ...PART_05,
  ...PART_06,
};

/** 7 chủ đề A1 mới (19–25), mỗi chủ đề 4 bài × 15 từ. */
export const A1_NEW_TOPICS: SeedVocabTopic[] = [
  ...NEW_TOPICS_A,
  ...NEW_TOPICS_B,
];
