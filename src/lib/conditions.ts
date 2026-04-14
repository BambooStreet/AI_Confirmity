export type ExperimentCondition = {
  hasAiLabel: boolean;
  commentCount: 10 | 20 | 30;
};

export const VALID_CONDITIONS = [
  "ai_10",
  "ai_20",
  "ai_30",
  "no_ai_10",
  "no_ai_20",
  "no_ai_30",
] as const;

export type ConditionKey = (typeof VALID_CONDITIONS)[number];

export function parseCondition(condition: string): ExperimentCondition | null {
  if (!VALID_CONDITIONS.includes(condition as ConditionKey)) {
    return null;
  }

  const hasAiLabel = condition.startsWith("ai_");
  const countStr = condition.replace(/^(no_)?ai_/, "");
  const commentCount = parseInt(countStr, 10) as 10 | 20 | 30;

  return { hasAiLabel, commentCount };
}

export function isValidCondition(condition: string): condition is ConditionKey {
  return VALID_CONDITIONS.includes(condition as ConditionKey);
}
