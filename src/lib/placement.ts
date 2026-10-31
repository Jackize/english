import type { LevelCode } from "@/lib/curriculum";

export interface PlacementQuestion {
  id: string;
  level: LevelCode;
  prompt: string;
  choices: { id: string; label: string }[];
  answer: string;
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "q1",
    level: "A1",
    prompt: "She ___ a teacher.",
    choices: [
      { id: "a", label: "is" },
      { id: "b", label: "are" },
      { id: "c", label: "am" },
      { id: "d", label: "be" },
    ],
    answer: "a",
  },
  {
    id: "q2",
    level: "A1",
    prompt: "I have ___ apple every morning.",
    choices: [
      { id: "a", label: "a" },
      { id: "b", label: "an" },
      { id: "c", label: "the" },
      { id: "d", label: "some" },
    ],
    answer: "b",
  },
  {
    id: "q3",
    level: "A2",
    prompt: "They ___ to the cinema yesterday.",
    choices: [
      { id: "a", label: "go" },
      { id: "b", label: "goes" },
      { id: "c", label: "went" },
      { id: "d", label: "gone" },
    ],
    answer: "c",
  },
  {
    id: "q4",
    level: "A2",
    prompt: "This book is ___ than that one.",
    choices: [
      { id: "a", label: "interesting" },
      { id: "b", label: "more interesting" },
      { id: "c", label: "most interesting" },
      { id: "d", label: "interestinger" },
    ],
    answer: "b",
  },
  {
    id: "q5",
    level: "B1",
    prompt: "If it rains tomorrow, we ___ at home.",
    choices: [
      { id: "a", label: "stay" },
      { id: "b", label: "stayed" },
      { id: "c", label: "will stay" },
      { id: "d", label: "would stay" },
    ],
    answer: "c",
  },
  {
    id: "q6",
    level: "B1",
    prompt: "She has been working here ___ 2019.",
    choices: [
      { id: "a", label: "for" },
      { id: "b", label: "since" },
      { id: "c", label: "from" },
      { id: "d", label: "at" },
    ],
    answer: "b",
  },
  {
    id: "q7",
    level: "B2",
    prompt: "The report ___ by the manager before the meeting.",
    choices: [
      { id: "a", label: "reviewed" },
      { id: "b", label: "was reviewed" },
      { id: "c", label: "has review" },
      { id: "d", label: "is reviewing" },
    ],
    answer: "b",
  },
  {
    id: "q8",
    level: "B2",
    prompt: "Despite ___ hard, he didn't pass the exam.",
    choices: [
      { id: "a", label: "study" },
      { id: "b", label: "studied" },
      { id: "c", label: "studying" },
      { id: "d", label: "to study" },
    ],
    answer: "c",
  },
  {
    id: "q9",
    level: "C1",
    prompt: "Had I known earlier, I ___ differently.",
    choices: [
      { id: "a", label: "would act" },
      { id: "b", label: "had acted" },
      { id: "c", label: "would have acted" },
      { id: "d", label: "acted" },
    ],
    answer: "c",
  },
  {
    id: "q10",
    level: "C2",
    prompt: "His argument was so ___ that no one could refute it.",
    choices: [
      { id: "a", label: "fragile" },
      { id: "b", label: "cogent" },
      { id: "c", label: "redundant" },
      { id: "d", label: "ambiguous" },
    ],
    answer: "b",
  },
];

export function scorePlacement(answers: Record<string, string>) {
  const score = PLACEMENT_QUESTIONS.filter(
    (question) => answers[question.id] === question.answer,
  ).length;
  const total = PLACEMENT_QUESTIONS.length;

  let level: LevelCode = "A1";
  if (score >= 10) level = "C2";
  else if (score >= 9) level = "C1";
  else if (score >= 7) level = "B2";
  else if (score >= 5) level = "B1";
  else if (score >= 3) level = "A2";

  return { score, total, level };
}
