import type { CMESType } from "./cmes";

export type OptionWeights = Partial<Record<CMESType, number>>;

export type QuestionOption = {
  label: string;
  weights: OptionWeights;
};

export type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What matters most to you in your ideal work?",
    options: [
      { label: "Making a positive impact on others", weights: { C: 3 } },
      { label: "Becoming an expert in my field", weights: { M: 3 } },
      { label: "Trying new things and variety", weights: { E: 3 } },
      { label: "Predictable income and security", weights: { S: 3 } },
    ],
  },
  {
    id: "q2",
    text: "When you imagine your dream life in 5 years, what stands out?",
    options: [
      { label: "Helping a cause or community", weights: { C: 2 } },
      { label: "Being known for my skills", weights: { M: 2 } },
      { label: "Travel and new experiences", weights: { E: 2 } },
      { label: "A stable home and routine", weights: { S: 2 } },
    ],
  },
  {
    id: "q3",
    text: "How do you prefer to grow?",
    options: [
      { label: "By contributing to something bigger", weights: { C: 2 } },
      { label: "By mastering one craft deeply", weights: { M: 2 } },
      { label: "By exploring many domains", weights: { E: 2 } },
      { label: "By building step by step safely", weights: { S: 2 } },
    ],
  },
  {
    id: "q4",
    text: "What would you sacrifice least willingly?",
    options: [
      { label: "The chance to give back", weights: { C: 3 } },
      { label: "My reputation for excellence", weights: { M: 3 } },
      { label: "Freedom to try new things", weights: { E: 3 } },
      { label: "Financial or job security", weights: { S: 3 } },
    ],
  },
  {
    id: "q5",
    text: "Which quote resonates more?",
    options: [
      { label: "Leave the world a bit better", weights: { C: 2 } },
      { label: "Practice until it becomes natural", weights: { M: 2 } },
      { label: "Collect experiences, not things", weights: { E: 2 } },
      { label: "Slow and steady wins the race", weights: { S: 2 } },
    ],
  },
  {
    id: "q6",
    text: "In a team, you're happiest when you're...",
    options: [
      { label: "Contributing to a shared mission", weights: { C: 2 } },
      { label: "Leading in your specialty", weights: { M: 2 } },
      { label: "Bringing fresh ideas", weights: { E: 2 } },
      { label: "Keeping things reliable", weights: { S: 2 } },
    ],
  },
  {
    id: "q7",
    text: "How do you feel about risk?",
    options: [
      { label: "Worth it for a greater good", weights: { C: 1 } },
      { label: "Worth it to level up skills", weights: { M: 1 } },
      { label: "Exciting; I like some unpredictability", weights: { E: 2 } },
      { label: "I prefer to minimize it", weights: { S: 2 } },
    ],
  },
  {
    id: "q8",
    text: "Your perfect weekend includes...",
    options: [
      { label: "Volunteering or helping someone", weights: { C: 2 } },
      { label: "Practicing or learning something", weights: { M: 2 } },
      { label: "A new place or activity", weights: { E: 2 } },
      { label: "Rest and routine at home", weights: { S: 2 } },
    ],
  },
];

export function addWeightsToScores(
  current: Record<CMESType, number>,
  weights: OptionWeights
): Record<CMESType, number> {
  const next = { ...current };
  const types: CMESType[] = ["C", "M", "E", "S"];
  for (const t of types) {
    next[t] = (next[t] ?? 0) + (weights[t] ?? 0);
  }
  return next;
}
