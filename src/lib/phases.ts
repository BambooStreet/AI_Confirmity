// 실험 단계 정의 — 클라이언트/서버 공용 (DB 접근 없음)

export const PHASES = ["test", "pilot", "main"] as const;
export type Phase = (typeof PHASES)[number];

export const PHASE_LABELS: Record<Phase, string> = {
  test: "테스트",
  pilot: "파일럿",
  main: "본실험",
};

// 설정이 없거나 잘못됐을 때의 안전한 기본값 — 본실험 데이터가 오염되지 않도록 test로 둔다.
export const DEFAULT_PHASE: Phase = "test";

export function isPhase(v: string | null | undefined): v is Phase {
  return PHASES.includes(v as Phase);
}
