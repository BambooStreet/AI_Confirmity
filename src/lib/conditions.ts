export const COMMENT_COUNTS = [5, 10, 15, 20, 25, 30] as const;
export type CommentCount = (typeof COMMENT_COUNTS)[number];

export type ExperimentCondition = {
  hasAiLabel: boolean;
  commentCount: CommentCount;
};

export const VALID_CONDITIONS = [
  "ai_5",
  "ai_10",
  "ai_15",
  "ai_20",
  "ai_25",
  "ai_30",
  "no_ai_5",
  "no_ai_10",
  "no_ai_15",
  "no_ai_20",
  "no_ai_25",
  "no_ai_30",
] as const;

export type ConditionKey = (typeof VALID_CONDITIONS)[number];

export function parseCondition(condition: string): ExperimentCondition | null {
  if (!VALID_CONDITIONS.includes(condition as ConditionKey)) {
    return null;
  }

  const hasAiLabel = condition.startsWith("ai_");
  const countStr = condition.replace(/^(no_)?ai_/, "");
  const commentCount = parseInt(countStr, 10) as CommentCount;

  return { hasAiLabel, commentCount };
}

export function isValidCondition(condition: string): condition is ConditionKey {
  return VALID_CONDITIONS.includes(condition as ConditionKey);
}
