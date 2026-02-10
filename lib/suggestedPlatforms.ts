import type { CMESType } from "./cmes";

export type SuggestedPlatform = {
  type: CMESType;
  label: string;
  url: string;
  description?: string;
};

export const SUGGESTED_PLATFORMS: SuggestedPlatform[] = [
  {
    type: "C",
    label: "Contribution — Explore impact",
    url: "https://example.com/contribution",
    description: "Platforms and communities focused on giving back.",
  },
  {
    type: "M",
    label: "Mastery — Deepen your craft",
    url: "https://example.com/mastery",
    description: "Resources to become an expert in your field.",
  },
  {
    type: "E",
    label: "Experience — New adventures",
    url: "https://example.com/experience",
    description: "Ideas and tools for variety and new experiences.",
  },
  {
    type: "S",
    label: "Stability — Build security",
    url: "https://example.com/stability",
    description: "Ways to build a stable, predictable path.",
  },
];

export function getSuggestedPlatformsByType(): Record<
  CMESType,
  SuggestedPlatform
> {
  const map = {} as Record<CMESType, SuggestedPlatform>;
  for (const p of SUGGESTED_PLATFORMS) {
    map[p.type] = p;
  }
  return map;
}
