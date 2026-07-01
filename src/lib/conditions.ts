export const COMMENT_COUNTS = [3, 9, 27] as const;
export type CommentCount = (typeof COMMENT_COUNTS)[number];

export type ExperimentCondition = {
  hasAiLabel: boolean;
  commentCount: CommentCount;
};

export const VALID_CONDITIONS = [
  "ai_3",
  "ai_9",
  "ai_27",
  "no_ai_3",
  "no_ai_9",
  "no_ai_27",
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
