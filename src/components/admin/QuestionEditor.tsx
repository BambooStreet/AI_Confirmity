"use client";

import { useEffect, useMemo, useState } from "react";
import type { QuestionType, SurveyQuestion } from "@/data/survey-questions";
import SurveyForm from "@/components/survey/SurveyForm";

type SurveyType = "pre" | "post";

const TYPE_LABELS: Record<QuestionType, string> = {
  likert7: "리커트 7점",
  multiple_choice: "선택형",
  semantic_diff7: "의미분별 7점",
  number: "숫자",
  text: "자유서술",
};

const TYPE_OPTIONS = Object.keys(TYPE_LABELS) as QuestionType[];

// 타입별 좌측 색 띠 — 카드 간 시각적 구분
const TYPE_ACCENT: Record<QuestionType, string> = {
  likert7: "border-l-blue-400",
  multiple_choice: "border-l-violet-400",
  semantic_diff7: "border-l-teal-400",
  number: "border-l-amber-400",
  text: "border-l-gray-400",
};

function newId(): string {
  return `q_${Date.now().toString(36)}`;
}

function blankQuestion(page: number): SurveyQuestion {
  return { id: newId(), question: "", type: "likert7", required: true, page };
}

type Props = { password: string };

export default function QuestionEditor({ password }: Props) {
  const [surveyType, setSurveyType] = useState<SurveyType>("pre");
  const [questions, setQuestions] = useState<SurveyQuestion[] | null>(null);
  const [original, setOriginal] = useState<string>(""); // JSON 스냅샷 (dirty 판정용)
  const [customized, setCustomized] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [previewKey, setPreviewKey] = useState(0);

  async function load(type: SurveyType) {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(
        `/api/admin/survey?type=${type}&password=${encodeURIComponent(password)}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        setError(`불러오기 실패 (${res.status})`);
        return;
      }
      const data = (await res.json()) as {
        questions: SurveyQuestion[];
        customized: boolean;
        updatedAt: string | null;
      };
      setQuestions(data.questions);
      setOriginal(JSON.stringify(data.questions));
      setCustomized(data.customized);
      setUpdatedAt(data.updatedAt);
    } catch {
      setError("네트워크 오류");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(surveyType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyType]);

  const dirty = useMemo(
    () => questions !== null && JSON.stringify(questions) !== original,
    [questions, original]
  );

  // 페이지/순서 기준으로 미리보기와 동일한 순서를 유지한다.
  function patch(index: number, p: Partial<SurveyQuestion>) {
    setQuestions((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      next[index] = { ...next[index], ...p };
      return next;
    });
  }

  function changeType(index: number, type: QuestionType) {
    setQuestions((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const cur = next[index];
      // 타입별로 불필요한 필드는 제거하고 필요한 필드는 초기화
      const cleaned: SurveyQuestion = {
        id: cur.id,
        question: cur.question,
        type,
        required: cur.required,
        page: cur.page,
        ...(cur.section ? { section: cur.section } : {}),
        ...(cur.pageTitle ? { pageTitle: cur.pageTitle } : {}),
        ...(cur.pageDescription ? { pageDescription: cur.pageDescription } : {}),
        ...(cur.precedingNotice ? { precedingNotice: cur.precedingNotice } : {}),
        ...(cur.showIf ? { showIf: cur.showIf } : {}),
      };
      if (type === "multiple_choice") cleaned.options = cur.options?.length ? cur.options : [""];
      if (type === "semantic_diff7") {
        cleaned.leftLabel = cur.leftLabel ?? "";
        cleaned.rightLabel = cur.rightLabel ?? "";
      }
      if (type === "number") {
        cleaned.min = cur.min;
        cleaned.max = cur.max;
        cleaned.unit = cur.unit;
      }
      next[index] = cleaned;
      return next;
    });
  }

  function move(index: number, dir: -1 | 1) {
    setQuestions((prev) => {
      if (!prev) return prev;
      const j = index + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setQuestions((prev) => (prev ? prev.filter((_, i) => i !== index) : prev));
  }

  function addAfter(index: number) {
    setQuestions((prev) => {
      if (!prev) return prev;
      const page = prev[index]?.page ?? 1;
      const next = [...prev];
      next.splice(index + 1, 0, blankQuestion(page));
      return next;
    });
  }

  function addAtEnd() {
    setQuestions((prev) => {
      const page = prev && prev.length ? prev[prev.length - 1].page : 1;
      return [...(prev ?? []), blankQuestion(page)];
    });
  }

  async function save() {
    if (!questions) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(
        `/api/admin/survey?type=${surveyType}&password=${encodeURIComponent(password)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questions }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? `저장 실패 (${res.status})`);
        return;
      }
      setQuestions(data.questions);
      setOriginal(JSON.stringify(data.questions));
      setCustomized(true);
      setUpdatedAt(data.updatedAt);
      setNotice("저장되었습니다. 이후 응답자는 수정된 문항을 보게 됩니다.");
    } catch {
      setError("저장 중 네트워크 오류");
    } finally {
      setSaving(false);
    }
  }

  async function resetToDefault() {
    if (
      !confirm(
        "코드 기본값으로 되돌립니다. 편집 내용이 사라지고 응답자는 기본 문항을 보게 됩니다. 계속할까요?"
      )
    )
      return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(
        `/api/admin/survey?type=${surveyType}&password=${encodeURIComponent(password)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? `복원 실패 (${res.status})`);
        return;
      }
      setQuestions(data.questions);
      setOriginal(JSON.stringify(data.questions));
      setCustomized(false);
      setUpdatedAt(null);
      setNotice("기본값으로 복원되었습니다.");
    } catch {
      setError("복원 중 네트워크 오류");
    } finally {
      setSaving(false);
    }
  }

  function revertLocal() {
    setQuestions(JSON.parse(original) as SurveyQuestion[]);
    setError(null);
    setNotice(null);
  }

  const allIds = useMemo(
    () => (questions ? questions.map((q) => q.id) : []),
    [questions]
  );

  return (
    <div className="space-y-4">
      {/* 툴바 */}
      <div className="sticky top-0 z-10 bg-gray-50 -mx-6 px-6 py-3 border-b border-gray-200 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
          {(["pre", "post"] as SurveyType[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                if (dirty && !confirm("저장하지 않은 변경이 있습니다. 이동할까요?")) return;
                setSurveyType(t);
              }}
              className={`px-3 py-1.5 text-sm ${
                surveyType === t ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              {t === "pre" ? "사전 설문" : "사후 설문"}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-500">
          {customized ? (
            <>
              <span className="text-green-700 font-medium">편집본 사용 중</span>
              {updatedAt && ` · ${new Date(updatedAt).toLocaleString("ko-KR")}`}
            </>
          ) : (
            <span className="text-gray-500">코드 기본값 사용 중</span>
          )}
          {dirty && <span className="ml-2 text-amber-600 font-medium">● 저장 안 됨</span>}
        </span>

        <div className="ml-auto inline-flex rounded-md border border-gray-300 overflow-hidden">
          <button
            onClick={() => setMode("edit")}
            className={`px-3 py-1.5 text-sm ${
              mode === "edit" ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            편집
          </button>
          <button
            onClick={() => {
              setPreviewKey((k) => k + 1);
              setMode("preview");
            }}
            className={`px-3 py-1.5 text-sm ${
              mode === "preview" ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            미리보기
          </button>
        </div>

        <button
          onClick={revertLocal}
          disabled={!dirty || saving}
          className="text-xs px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          변경 취소
        </button>
        <button
          onClick={() => void resetToDefault()}
          disabled={saving || !customized}
          className="text-xs px-3 py-1.5 rounded border border-red-300 bg-white text-red-600 hover:bg-red-50 disabled:opacity-40"
        >
          기본값 복원
        </button>
        <button
          onClick={() => void save()}
          disabled={!dirty || saving}
          className="text-sm px-4 py-1.5 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-40"
        >
          {saving ? "저장 중…" : "저장"}
        </button>
      </div>

      {error && (
        <p className="rounded bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {notice && (
        <p className="rounded bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
          {notice}
        </p>
      )}

      {loading && <p className="text-sm text-gray-500">불러오는 중…</p>}

      {!loading && questions && mode === "preview" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="mb-4 text-xs text-gray-500">
            ↓ 응답자가 보게 될 실제 화면입니다 (미리보기, 응답은 저장되지 않음)
          </p>
          <SurveyForm
            key={previewKey}
            questions={questions}
            surveyType={surveyType}
            onSubmit={() => alert("미리보기에서는 제출되지 않습니다.")}
          />
        </div>
      )}

      {!loading && questions && mode === "edit" && (
        <div className="space-y-4">
          {questions.map((q, i) => {
            const newPage = i === 0 || q.page !== questions[i - 1].page;
            return (
              <div key={i}>
                {newPage && (
                  <div className="flex items-center gap-3 pt-3 pb-1">
                    <span className="rounded-full bg-gray-700 px-3 py-0.5 text-xs font-semibold text-white">
                      페이지 {q.page}
                    </span>
                    <span className="h-px flex-1 bg-gray-300" />
                  </div>
                )}
                <QuestionCard
                  q={q}
                  index={i}
                  total={questions.length}
                  allIds={allIds}
                  onPatch={(p) => patch(i, p)}
                  onChangeType={(t) => changeType(i, t)}
                  onMove={(d) => move(i, d)}
                  onRemove={() => remove(i)}
                  onAddAfter={() => addAfter(i)}
                />
              </div>
            );
          })}
          <button
            onClick={addAtEnd}
            className="w-full py-3 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600"
          >
            + 문항 추가
          </button>
        </div>
      )}
    </div>
  );
}

// ───────────────────────── 문항 카드 ─────────────────────────

function QuestionCard({
  q,
  index,
  total,
  allIds,
  onPatch,
  onChangeType,
  onMove,
  onRemove,
  onAddAfter,
}: {
  q: SurveyQuestion;
  index: number;
  total: number;
  allIds: string[];
  onPatch: (p: Partial<SurveyQuestion>) => void;
  onChangeType: (t: QuestionType) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onAddAfter: () => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(
    !!(q.section || q.pageTitle || q.pageDescription || q.precedingNotice || q.showIf)
  );

  const inputCls =
    "w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelCls = "block text-[11px] font-medium text-gray-500 mb-1";

  return (
    <div
      className={`bg-white border border-gray-200 border-l-4 ${TYPE_ACCENT[q.type]} rounded-lg shadow-sm p-4`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-700 text-[11px] font-semibold text-white">
          {index + 1}
        </span>
        <input
          value={q.id}
          onChange={(e) => onPatch({ id: e.target.value })}
          className="font-mono text-xs border border-gray-300 rounded px-2 py-1 w-40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="questionId"
          title="응답 데이터의 questionId — 분석 일관성을 위해 가급적 유지하세요"
        />
        <select
          value={q.type}
          onChange={(e) => onChangeType(e.target.value as QuestionType)}
          className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-800 bg-white"
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={q.required}
            onChange={(e) => onPatch({ required: e.target.checked })}
          />
          필수
        </label>
        <label className="flex items-center gap-1 text-xs text-gray-600">
          페이지
          <input
            type="number"
            min={1}
            value={q.page}
            onChange={(e) => onPatch({ page: Number(e.target.value) })}
            className="w-14 border border-gray-300 rounded px-1.5 py-1 text-xs"
          />
        </label>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="px-1.5 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30"
            title="위로"
          >
            ↑
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="px-1.5 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30"
            title="아래로"
          >
            ↓
          </button>
          <button
            onClick={onAddAfter}
            className="px-1.5 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
            title="아래에 문항 추가"
          >
            +
          </button>
          <button
            onClick={onRemove}
            className="px-1.5 py-1 text-xs text-red-500 hover:bg-red-50 rounded"
            title="삭제"
          >
            ✕
          </button>
        </div>
      </div>

      <textarea
        value={q.question}
        onChange={(e) => onPatch({ question: e.target.value })}
        rows={2}
        className={inputCls}
        placeholder="질문 내용"
      />

      {/* 타입별 필드 */}
      {q.type === "multiple_choice" && (
        <OptionsEditor
          options={q.options ?? [""]}
          onChange={(options) => onPatch({ options })}
        />
      )}

      {q.type === "semantic_diff7" && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>왼쪽 라벨</label>
            <input
              value={q.leftLabel ?? ""}
              onChange={(e) => onPatch({ leftLabel: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>오른쪽 라벨</label>
            <input
              value={q.rightLabel ?? ""}
              onChange={(e) => onPatch({ rightLabel: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
      )}

      {q.type === "number" && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <label className={labelCls}>최소(min)</label>
            <input
              type="number"
              value={q.min ?? ""}
              onChange={(e) =>
                onPatch({ min: e.target.value === "" ? undefined : Number(e.target.value) })
              }
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>최대(max)</label>
            <input
              type="number"
              value={q.max ?? ""}
              onChange={(e) =>
                onPatch({ max: e.target.value === "" ? undefined : Number(e.target.value) })
              }
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>단위</label>
            <input
              value={q.unit ?? ""}
              onChange={(e) => onPatch({ unit: e.target.value || undefined })}
              className={inputCls}
              placeholder="예: 세, 년"
            />
          </div>
        </div>
      )}

      {/* 고급 옵션 */}
      <button
        onClick={() => setShowAdvanced((v) => !v)}
        className="mt-3 text-[11px] text-gray-400 hover:text-gray-600"
      >
        {showAdvanced ? "▾ 고급 옵션 닫기" : "▸ 고급 옵션 (조건부 표시 · 섹션 · 안내문)"}
      </button>

      {showAdvanced && (
        <div className="mt-2 space-y-3 border-t border-gray-100 pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>섹션 제목 (section)</label>
              <input
                value={q.section ?? ""}
                onChange={(e) => onPatch({ section: e.target.value || undefined })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>페이지 제목 (pageTitle)</label>
              <input
                value={q.pageTitle ?? ""}
                onChange={(e) => onPatch({ pageTitle: e.target.value || undefined })}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>페이지 설명 (pageDescription)</label>
            <input
              value={q.pageDescription ?? ""}
              onChange={(e) => onPatch({ pageDescription: e.target.value || undefined })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>안내 문구 (precedingNotice) — 회색 박스</label>
            <textarea
              value={q.precedingNotice ?? ""}
              onChange={(e) => onPatch({ precedingNotice: e.target.value || undefined })}
              rows={2}
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>조건부 표시: 다음 문항이</label>
              <select
                value={q.showIf?.id ?? ""}
                onChange={(e) =>
                  onPatch(
                    e.target.value
                      ? { showIf: { id: e.target.value, equals: q.showIf?.equals ?? "" } }
                      : { showIf: undefined }
                  )
                }
                className={inputCls}
              >
                <option value="">(없음 — 항상 표시)</option>
                {allIds
                  .filter((id) => id !== q.id)
                  .map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>이 값과 같을 때 표시 (equals)</label>
              <input
                value={q.showIf?.equals ?? ""}
                onChange={(e) =>
                  q.showIf &&
                  onPatch({ showIf: { id: q.showIf.id, equals: e.target.value } })
                }
                disabled={!q.showIf?.id}
                className={`${inputCls} disabled:bg-gray-50`}
                placeholder="예: 예"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ───────────────────────── 선택지 편집 ─────────────────────────

function OptionsEditor({
  options,
  onChange,
}: {
  options: string[];
  onChange: (opts: string[]) => void;
}) {
  return (
    <div className="mt-3 space-y-2">
      <label className="block text-[11px] font-medium text-gray-500">선택지</label>
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 w-4">{i + 1}</span>
          <input
            value={opt}
            onChange={(e) => {
              const next = [...options];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => onChange(options.filter((_, j) => j !== i))}
            disabled={options.length <= 1}
            className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded disabled:opacity-30"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...options, ""])}
        className="text-xs text-blue-600 hover:underline"
      >
        + 선택지 추가
      </button>
    </div>
  );
}
