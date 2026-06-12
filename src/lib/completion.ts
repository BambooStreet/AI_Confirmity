import type { ConditionKey } from "@/lib/conditions";

// 그룹(조건)별 CloudResearch 완료 코드 = 프로젝트 ID.
// 리다이렉트 URL은 코드로부터 생성된다: https://connect.cloudresearch.com/participant/project/{code}/complete
//
// 실제 데이터 수집 그룹은 6개(AI 라벨 O/X × 댓글 5/15/25)뿐이다.
// VALID_CONDITIONS에 있는 나머지(10/20/30)는 이번 수집에서 미사용 → 매핑 없음(아래 getCompletion이 null 반환).
const COMPLETION_CODES: Partial<Record<ConditionKey, string>> = {
  ai_5: "A704BCA841", // A1: AI 라벨O, 댓글 5
  ai_15: "E3C42D31A6", // A2: AI 라벨O, 댓글 15
  ai_25: "13D3228C34", // A3: AI 라벨O, 댓글 25
  no_ai_5: "A23B913014", // A4: AI 라벨X, 댓글 5
  no_ai_15: "6677D1FB4D", // A5: AI 라벨X, 댓글 15
  no_ai_25: "9102DA6EED", // A6: AI 라벨X, 댓글 25
};

export type Completion = { code: string; url: string };

/** 조건 문자열(ai_5 등)로 완료 코드·리다이렉트 URL을 찾는다. 매핑 없으면 null. */
export function getCompletion(condition: string | null | undefined): Completion | null {
  if (!condition) return null;
  const code = COMPLETION_CODES[condition as ConditionKey];
  if (!code) return null;
  return {
    code,
    url: `https://connect.cloudresearch.com/participant/project/${code}/complete`,
  };
}
