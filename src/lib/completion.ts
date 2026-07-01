import type { ConditionKey } from "@/lib/conditions";

// 그룹(조건)별 CloudResearch 완료 코드 = 프로젝트 ID.
// 리다이렉트 URL은 코드로부터 생성된다: https://connect.cloudresearch.com/participant/project/{code}/complete
//
// 실제 데이터 수집 그룹은 6개(AI 라벨 O/X × 댓글 3/9/27)다.
// 기존 CloudResearch 프로젝트(A1~A6)를 그대로 재사용하고 댓글 수만 3/9/27로 재매핑했다.
const COMPLETION_CODES: Partial<Record<ConditionKey, string>> = {
  ai_3: "A704BCA841", // A1: AI 라벨O, 댓글 3
  ai_9: "E3C42D31A6", // A2: AI 라벨O, 댓글 9
  ai_27: "13D3228C34", // A3: AI 라벨O, 댓글 27
  no_ai_3: "A23B913014", // A4: AI 라벨X, 댓글 3
  no_ai_9: "6677D1FB4D", // A5: AI 라벨X, 댓글 9
  no_ai_27: "9102DA6EED", // A6: AI 라벨X, 댓글 27
};

export type Completion = { code: string; url: string };

/** 조건 문자열(ai_3 등)로 완료 코드·리다이렉트 URL을 찾는다. 매핑 없으면 null. */
export function getCompletion(condition: string | null | undefined): Completion | null {
  if (!condition) return null;
  const code = COMPLETION_CODES[condition as ConditionKey];
  if (!code) return null;
  return {
    code,
    url: `https://connect.cloudresearch.com/participant/project/${code}/complete`,
  };
}
