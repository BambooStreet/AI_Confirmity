export const STEPS = [
  "consent",
  "pre-survey",
  "instruction",
  "experiment",
  "post-survey",
  "debrief",
] as const;

export type Step = (typeof STEPS)[number];

export function getStepIndex(step: Step): number {
  return STEPS.indexOf(step);
}

export function getStepPath(step: Step): string {
  return `/${step}`;
}
