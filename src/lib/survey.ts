import { prisma } from "@/lib/prisma";
import {
  preSurveyQuestions,
  postSurveyQuestions,
  type QuestionType,
  type SurveyQuestion,
} from "@/data/survey-questions";
import {
  preSurveyQuestionsEn,
  postSurveyQuestionsEn,
} from "@/data/survey-questions.en";
import type { Lang } from "@/i18n/ui";

export type SurveyType = "pre" | "post";

/**
 * SurveyConfig 테이블의 키. 한국어는 기존 키("pre"/"post")를 그대로 쓰고,
 * 영어는 "_en" 접미사 키로 별도 행에 저장한다 (스키마 변경 없음).
 */
export type SurveyConfigKey = "pre" | "post" | "pre_en" | "post_en";

export function surveyConfigKey(type: SurveyType, lang: Lang): SurveyConfigKey {
  return lang === "en" ? (`${type}_en` as SurveyConfigKey) : type;
}

/** 코드에 정의된 정적 기본 문항. DB에 행이 없을 때 이 값을 사용한다. */
export const defaultQuestions: Record<SurveyConfigKey, SurveyQuestion[]> = {
  pre: preSurveyQuestions,
  post: postSurveyQuestions,
  pre_en: preSurveyQuestionsEn,
  post_en: postSurveyQuestionsEn,
};

const QUESTION_TYPES: QuestionType[] = [
  "likert7",
  "multiple_choice",
  "semantic_diff7",
  "number",
  "text",
];

export function isSurveyType(v: string | null | undefined): v is SurveyType {
  return v === "pre" || v === "post";
}

/**
 * 해당 type·언어의 문항을 반환한다. DB에 편집된 행이 있으면 그것을, 없으면 코드의 기본값을 사용한다.
 * (읽기 전용 — 여기서 DB에 쓰지 않는다. 최초 저장은 admin 편집 시에 일어난다.)
 */
export async function getSurveyQuestions(
  type: SurveyType,
  lang: Lang = "ko"
): Promise<SurveyQuestion[]> {
  const key = surveyConfigKey(type, lang);
  const row = await prisma.surveyConfig.findUnique({ where: { type: key } });
  if (row) return row.questions as unknown as SurveyQuestion[];
  return defaultQuestions[key];
}

/**
 * admin 저장 직전 서버측 검증. 통과하면 정규화된 배열을, 실패하면 에러 메시지를 반환한다.
 * 잘못 저장하면 실시간 설문이 깨질 수 있으므로 구조를 엄격히 확인한다.
 */
export function validateQuestions(
  input: unknown
):
  | { ok: true; questions: SurveyQuestion[] }
  | { ok: false; error: string } {
  if (!Array.isArray(input)) {
    return { ok: false, error: "문항 데이터는 배열이어야 합니다." };
  }
  if (input.length === 0) {
    return { ok: false, error: "문항이 최소 1개 이상 있어야 합니다." };
  }

  const seenIds = new Set<string>();
  const allIds = new Set<string>();

  // 1차: id 수집 (showIf 참조 검증용)
  for (const item of input) {
    if (item && typeof item === "object" && typeof (item as { id?: unknown }).id === "string") {
      allIds.add((item as { id: string }).id);
    }
  }

  const cleaned: SurveyQuestion[] = [];

  for (let i = 0; i < input.length; i++) {
    const raw = input[i];
    const where = `문항 ${i + 1}`;
    if (!raw || typeof raw !== "object") {
      return { ok: false, error: `${where}: 형식이 올바르지 않습니다.` };
    }
    const q = raw as Record<string, unknown>;

    const id = q.id;
    if (typeof id !== "string" || id.trim() === "") {
      return { ok: false, error: `${where}: id가 비어 있습니다.` };
    }
    if (seenIds.has(id)) {
      return { ok: false, error: `id "${id}"가 중복됩니다.` };
    }
    seenIds.add(id);

    if (typeof q.question !== "string" || q.question.trim() === "") {
      return { ok: false, error: `${id}: 질문 내용이 비어 있습니다.` };
    }

    if (typeof q.type !== "string" || !QUESTION_TYPES.includes(q.type as QuestionType)) {
      return {
        ok: false,
        error: `${id}: 알 수 없는 type "${String(q.type)}".`,
      };
    }
    const type = q.type as QuestionType;

    if (typeof q.required !== "boolean") {
      return { ok: false, error: `${id}: required는 true/false 여야 합니다.` };
    }

    if (!Number.isInteger(q.page) || (q.page as number) < 1) {
      return { ok: false, error: `${id}: page는 1 이상의 정수여야 합니다.` };
    }

    const out: SurveyQuestion = {
      id: id.trim(),
      question: q.question,
      type,
      required: q.required,
      page: q.page as number,
    };

    // 타입별 필수 필드
    if (type === "multiple_choice") {
      const opts = q.options;
      if (
        !Array.isArray(opts) ||
        opts.length === 0 ||
        !opts.every((o) => typeof o === "string" && o.trim() !== "")
      ) {
        return { ok: false, error: `${id}: 선택형 문항은 선택지가 1개 이상 필요합니다.` };
      }
      out.options = opts as string[];
    }

    if (type === "semantic_diff7") {
      if (typeof q.leftLabel !== "string" || q.leftLabel.trim() === "") {
        return { ok: false, error: `${id}: 의미분별척도는 왼쪽 라벨이 필요합니다.` };
      }
      if (typeof q.rightLabel !== "string" || q.rightLabel.trim() === "") {
        return { ok: false, error: `${id}: 의미분별척도는 오른쪽 라벨이 필요합니다.` };
      }
      out.leftLabel = q.leftLabel;
      out.rightLabel = q.rightLabel;
    }

    if (type === "number") {
      if (q.min !== undefined && q.min !== null) {
        if (typeof q.min !== "number") return { ok: false, error: `${id}: min은 숫자여야 합니다.` };
        out.min = q.min;
      }
      if (q.max !== undefined && q.max !== null) {
        if (typeof q.max !== "number") return { ok: false, error: `${id}: max는 숫자여야 합니다.` };
        out.max = q.max;
      }
      if (out.min !== undefined && out.max !== undefined && out.min > out.max) {
        return { ok: false, error: `${id}: min이 max보다 큽니다.` };
      }
      if (typeof q.unit === "string" && q.unit.trim() !== "") out.unit = q.unit;
    }

    // 조건부 표시
    if (q.showIf !== undefined && q.showIf !== null) {
      const s = q.showIf as Record<string, unknown>;
      if (typeof s.id !== "string" || typeof s.equals !== "string") {
        return { ok: false, error: `${id}: showIf는 { id, equals } 형식이어야 합니다.` };
      }
      if (!allIds.has(s.id)) {
        return { ok: false, error: `${id}: showIf가 존재하지 않는 문항 "${s.id}"를 참조합니다.` };
      }
      if (s.id === id.trim()) {
        return { ok: false, error: `${id}: showIf가 자기 자신을 참조할 수 없습니다.` };
      }
      out.showIf = { id: s.id, equals: s.equals };
    }

    // 선택적 표시 필드
    if (typeof q.pageTitle === "string" && q.pageTitle.trim() !== "") out.pageTitle = q.pageTitle;
    if (typeof q.pageDescription === "string" && q.pageDescription.trim() !== "")
      out.pageDescription = q.pageDescription;
    if (typeof q.section === "string" && q.section.trim() !== "") out.section = q.section;
    if (typeof q.precedingNotice === "string" && q.precedingNotice.trim() !== "")
      out.precedingNotice = q.precedingNotice;

    cleaned.push(out);
  }

  return { ok: true, questions: cleaned };
}
