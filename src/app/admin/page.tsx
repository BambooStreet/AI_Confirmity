"use client";

import { useEffect, useMemo, useState } from "react";
import QuestionEditor from "@/components/admin/QuestionEditor";
import { PHASES, PHASE_LABELS, isPhase, type Phase } from "@/lib/phases";

const PASSWORD_KEY = "admin_password_v1";

type ParticipantSummary = {
  id: string;
  condition: string;
  phase: string;
  language: string;
  externalId: string | null;
  startedAt: string;
  completedAt: string | null;
  consent: boolean;
  currentStep: number;
  _count: { responses: number; comments: number };
};

const PHASE_BADGE_STYLES: Record<string, string> = {
  test: "bg-gray-100 text-gray-600",
  pilot: "bg-purple-100 text-purple-700",
  main: "bg-blue-100 text-blue-700",
};

function phaseLabel(phase: string): string {
  return isPhase(phase) ? PHASE_LABELS[phase] : phase;
}

type ResponseRow = {
  id: string;
  surveyType: string;
  questionId: string;
  answer: string;
  createdAt: string;
};

type CommentRow = {
  id: string;
  content: string;
  createdAt: string;
};

type ParticipantDetail = ParticipantSummary & {
  responses: ResponseRow[];
  comments: CommentRow[];
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

function groupBy<T, K extends string>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ParticipantSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ParticipantDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [tab, setTab] = useState<"sessions" | "questions">("sessions");
  // 새 참가자에게 찍히는 전역 단계 설정
  const [currentPhase, setCurrentPhase] = useState<Phase | null>(null);
  const [phaseDraft, setPhaseDraft] = useState<Phase>("test");
  const [phaseSaving, setPhaseSaving] = useState(false);
  // 목록·CSV 필터
  const [phaseFilter, setPhaseFilter] = useState<"all" | Phase>("all");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (saved) {
      setPassword(saved);
      setInputPw(saved);
      void tryAuth(saved);
    }
  }, []);

  async function tryAuth(pw: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/sessions?password=${encodeURIComponent(pw)}`,
        { cache: "no-store" }
      );
      if (res.status === 401) {
        setError("비밀번호가 올바르지 않습니다.");
        sessionStorage.removeItem(PASSWORD_KEY);
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        setError(`서버 오류 (${res.status})`);
        return;
      }
      const data = (await res.json()) as { participants: ParticipantSummary[] };
      setList(data.participants);
      setPassword(pw);
      sessionStorage.setItem(PASSWORD_KEY, pw);
      setAuthed(true);
      void loadPhase(pw);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function loadPhase(pw: string) {
    try {
      const res = await fetch(
        `/api/admin/phase?password=${encodeURIComponent(pw)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const data = (await res.json()) as { phase: Phase };
      setCurrentPhase(data.phase);
      setPhaseDraft(data.phase);
    } catch {
      // 단계 조회 실패는 치명적이지 않음 — 표시만 비워둔다
    }
  }

  // 개별 참가자 단계 재분류 (예: 파일럿 중 확인차 들어간 세션을 test로)
  async function changeParticipantPhase(id: string, phase: Phase) {
    if (
      !window.confirm(
        `이 참가자의 단계를 "${PHASE_LABELS[phase]}"(으)로 변경할까요?`
      )
    ) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/sessions?password=${encodeURIComponent(password)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, phase }),
        }
      );
      if (!res.ok) {
        setError(`단계 변경 실패 (${res.status})`);
        return;
      }
      setDetail((d) => (d && d.id === id ? { ...d, phase } : d));
      setList((l) => l.map((p) => (p.id === id ? { ...p, phase } : p)));
    } catch {
      setError("단계 변경 중 네트워크 오류");
    }
  }

  async function savePhase() {
    if (phaseSaving || phaseDraft === currentPhase) return;
    if (
      !window.confirm(
        `현재 실험 단계를 "${PHASE_LABELS[phaseDraft]}"(으)로 변경할까요?\n이후 새로 들어오는 참가자에게 이 단계가 기록됩니다.`
      )
    ) {
      return;
    }
    setPhaseSaving(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/phase?password=${encodeURIComponent(password)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phase: phaseDraft }),
        }
      );
      if (!res.ok) {
        setError(`단계 변경 실패 (${res.status})`);
        return;
      }
      const data = (await res.json()) as { phase: Phase };
      setCurrentPhase(data.phase);
    } catch {
      setError("단계 변경 중 네트워크 오류");
    } finally {
      setPhaseSaving(false);
    }
  }

  async function refreshList() {
    await tryAuth(password);
  }

  async function loadDetail(id: string) {
    setSelectedId(id);
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await fetch(
        `/api/admin/sessions?password=${encodeURIComponent(
          password
        )}&id=${encodeURIComponent(id)}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        setError(`상세 조회 실패 (${res.status})`);
        return;
      }
      const data = (await res.json()) as { participant: ParticipantDetail };
      setDetail(data.participant);
    } catch {
      setError("상세 조회 중 네트워크 오류");
    } finally {
      setDetailLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(PASSWORD_KEY);
    setAuthed(false);
    setPassword("");
    setInputPw("");
    setList([]);
    setDetail(null);
    setSelectedId(null);
    setError(null);
  }

  function downloadDetailJson() {
    if (!detail) return;
    const blob = new Blob([JSON.stringify(detail, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `participant_${detail.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const [exporting, setExporting] = useState(false);
  const [showCsvHelp, setShowCsvHelp] = useState(false);
  // CSV 내보내기 시 미완료(completedAt 없음) 참가자 제외 여부
  const [onlyCompleted, setOnlyCompleted] = useState(false);
  async function downloadAllCsv() {
    setExporting(true);
    setError(null);
    try {
      const phaseQuery =
        phaseFilter === "all" ? "" : `&phase=${encodeURIComponent(phaseFilter)}`;
      const completedQuery = onlyCompleted ? "&completed=true" : "";
      const res = await fetch(
        `/api/admin/export?password=${encodeURIComponent(password)}${phaseQuery}${completedQuery}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        setError(`CSV 다운로드 실패 (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const stamp = new Date()
        .toISOString()
        .slice(0, 16)
        .replace(/[-:T]/g, "")
        .replace(/(\d{8})(\d{4})/, "$1_$2");
      a.download = `participants_${phaseFilter}${onlyCompleted ? "_completed" : ""}_${stamp}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("CSV 다운로드 중 네트워크 오류");
    } finally {
      setExporting(false);
    }
  }

  // 단계별 인원 수 + 현재 필터에 맞는 목록
  const phaseCounts = useMemo(() => {
    const counts: Record<string, number> = { all: list.length };
    for (const p of list) counts[p.phase] = (counts[p.phase] ?? 0) + 1;
    return counts;
  }, [list]);

  const filteredList = useMemo(
    () =>
      phaseFilter === "all" ? list : list.filter((p) => p.phase === phaseFilter),
    [list, phaseFilter]
  );

  const responseGroups = useMemo(() => {
    if (!detail) return {} as Record<string, ResponseRow[]>;
    return groupBy(detail.responses, (r) => r.surveyType);
  }, [detail]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">관리자 페이지</h1>
          <p className="text-xs text-gray-500 mb-6">
            세션별 응답을 확인하려면 비밀번호를 입력하세요.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void tryAuth(inputPw);
            }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !inputPw}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "확인 중..." : "들어가기"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-gray-900">관리자</h1>
          <nav className="inline-flex rounded-md border border-gray-300 overflow-hidden">
            <button
              onClick={() => setTab("sessions")}
              className={`px-3 py-1.5 text-sm ${
                tab === "sessions" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              세션 조회
            </button>
            <button
              onClick={() => setTab("questions")}
              className={`px-3 py-1.5 text-sm ${
                tab === "questions" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              문항 편집
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {tab === "sessions" && (
            <>
              <label className="flex items-center gap-1 text-xs text-gray-700 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyCompleted}
                  onChange={(e) => setOnlyCompleted(e.target.checked)}
                  className="accent-blue-600"
                />
                완료만
              </label>
              <button
                onClick={() => void downloadAllCsv()}
                disabled={exporting}
                className="text-xs px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {exporting
                  ? "내보내는 중…"
                  : `${
                      phaseFilter === "all"
                        ? "전체"
                        : phaseLabel(phaseFilter)
                    }${onlyCompleted ? " · 완료만" : ""} CSV 다운로드`}
              </button>
              <button
                onClick={() => setShowCsvHelp((v) => !v)}
                className={`text-xs px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50 ${
                  showCsvHelp ? "bg-gray-100 text-gray-800" : "bg-white text-gray-700"
                }`}
              >
                {showCsvHelp ? "컬럼 설명 닫기" : "컬럼 설명"}
              </button>
              <button
                onClick={() => void refreshList()}
                className="text-xs px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                새로고침
              </button>
            </>
          )}
          <button
            onClick={logout}
            className="text-xs px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </header>

      {tab === "questions" ? (
        <div className="p-6">
          <QuestionEditor password={password} />
        </div>
      ) : (
        <>
          {/* 현재 실험 단계 설정 — 새로 들어오는 참가자에게 찍힌다 */}
          <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-3 text-sm">
            <span className="text-xs font-medium text-gray-500">
              현재 실험 단계
            </span>
            {currentPhase && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-semibold ${PHASE_BADGE_STYLES[currentPhase]}`}
              >
                {PHASE_LABELS[currentPhase]}
              </span>
            )}
            <select
              value={phaseDraft}
              onChange={(e) => setPhaseDraft(e.target.value as Phase)}
              disabled={phaseSaving}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PHASES.map((p) => (
                <option key={p} value={p}>
                  {PHASE_LABELS[p]} ({p})
                </option>
              ))}
            </select>
            <button
              onClick={() => void savePhase()}
              disabled={phaseSaving || phaseDraft === currentPhase}
              className="text-xs px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
            >
              {phaseSaving ? "변경 중…" : "변경"}
            </button>
            <span className="text-[11px] text-gray-400">
              이후 새로 시작하는 참가자에게 이 단계가 기록됩니다. 파일럿·본실험
              시작 전에 꼭 변경하세요. 운영 중 확인차 들어갈 땐 링크에{" "}
              <code className="text-gray-500">&phase=test</code>를 붙이면 항상
              테스트로 기록됩니다.
            </span>
          </div>

          {error && (
            <p className="bg-red-50 border-b border-red-200 px-6 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {showCsvHelp && (
            <div className="border-b border-gray-200 bg-amber-50 px-6 py-4 text-xs text-gray-700 leading-relaxed">
              <p className="mb-2 font-semibold text-gray-800">
                CSV 컬럼 설명 (참가자 1명 = 1행)
              </p>
              <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                <div>
                  <p className="font-medium text-gray-800 mb-1">기본 정보</p>
                  <ul className="space-y-0.5">
                    <li><code className="text-gray-900">participant_id</code> — 참가자 고유 ID</li>
                    <li><code className="text-gray-900">phase</code> — 실험 단계 (<code>test</code> 내부 테스트 · <code>pilot</code> 파일럿 · <code>main</code> 본실험)</li>
                    <li><code className="text-gray-900">external_id</code> — 외부 패널(CloudResearch 등) 참가자 식별자. 승인 시 이 값으로 매칭</li>
                    <li><code className="text-gray-900">external_meta</code> — 진입 URL 쿼리스트링 전체 (JSON)</li>
                    <li><code className="text-gray-900">condition</code> — 실험 조건 (예: <code>ai_9</code> = AI 라벨 표시 + 댓글 9개, <code>no_ai_3</code> = 라벨 없음 + 3개)</li>
                    <li><code className="text-gray-900">language</code> — 참가자 경험 언어 (<code>ko</code> 한국어 · <code>en</code> 영어)</li>
                    <li><code className="text-gray-900">consent</code> — 동의 여부 (Y/N)</li>
                    <li><code className="text-gray-900">current_step</code> — 도달한 단계</li>
                    <li><code className="text-gray-900">completed</code> — 사후설문까지 완료 여부 (Y/N)</li>
                    <li><code className="text-gray-900">started_at / completed_at</code> — 시작/완료 시각 (UTC)</li>
                    <li><code className="text-gray-900">n_responses / n_comments</code> — 응답한 고유 문항 수(중복 재제출 제외) · 작성 댓글 개수</li>
                  </ul>
                  <p className="font-medium text-gray-800 mt-3 mb-1">컬럼 이름 규칙</p>
                  <ul className="space-y-0.5">
                    <li><code className="text-gray-900">설문종류__질문ID</code> 형식 (예: <code>pre__demo-age</code>, <code>post__ac-1</code>)</li>
                    <li><code>pre</code> 사전설문 · <code>post</code> 사후설문 · <code>asch</code> 본실험1(선분) · <code>euthanasia</code> 본실험2(존엄사)</li>
                    <li><code className="text-gray-900">comment_1~3</code> — 참가자가 실험 중 직접 작성한 댓글</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">본실험1 (asch__)</p>
                  <ul className="space-y-0.5">
                    <li><code className="text-gray-900">initial_choice</code> — 처음 고른 선분</li>
                    <li><code className="text-gray-900">ai_claim</code> — AI/댓글이 주장한(보여준) 선분</li>
                    <li><code className="text-gray-900">correct_answer</code> — 실제 정답 선분</li>
                    <li><code className="text-gray-900">pre_confidence / final_confidence</code> — 처치 전/후 확신도</li>
                    <li><code className="text-gray-900">final_choice</code> — 마지막에 고른 선분</li>
                    <li><code className="text-gray-900">conformed</code> — 동조 여부 (true = 안 골랐던 AI 주장으로 변경)</li>
                  </ul>
                  <p className="font-medium text-gray-800 mt-3 mb-1">본실험2 (euthanasia__)</p>
                  <ul className="space-y-0.5">
                    <li><code className="text-gray-900">quiz_attempts</code> — 사전 퀴즈 시도 횟수</li>
                    <li><code className="text-gray-900">pre_opinion / final_opinion</code> — 처치 전/후 의견 (1~7)</li>
                    <li><code className="text-gray-900">pre_opinion_confidence / final_opinion_confidence</code> — 각 확신도</li>
                    <li><code className="text-gray-900">opinion_shift</code> — 의견 변화량 (final − pre)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex" style={{ height: "calc(100vh - 49px)" }}>
        {/* 좌측 참가자 리스트 */}
        <aside className="w-96 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="px-4 py-2 border-b border-gray-200 sticky top-0 bg-white">
            <div className="flex gap-1">
              {(["all", ...PHASES] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setPhaseFilter(f)}
                  className={`text-[11px] px-2 py-1 rounded font-medium ${
                    phaseFilter === f
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f === "all" ? "전체" : PHASE_LABELS[f]}{" "}
                  {phaseCounts[f] ?? 0}
                </button>
              ))}
            </div>
          </div>
          <ul>
            {filteredList.map((p) => {
              const isSelected = p.id === selectedId;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => void loadDetail(p.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-[11px] text-gray-500 truncate">
                        {p.id}
                      </code>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          p.completedAt
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.completedAt ? "완료" : `Step ${p.currentStep}`}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-700">
                      <span className="font-semibold">{p.condition}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          PHASE_BADGE_STYLES[p.phase] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {phaseLabel(p.phase)}
                      </span>
                      {p.language === "en" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-emerald-100 text-emerald-700">
                          EN
                        </span>
                      )}
                      {p.externalId && (
                        <code className="text-[10px] text-gray-400 truncate">
                          {p.externalId}
                        </code>
                      )}
                    </div>
                    <div className="mt-0.5 text-[11px] text-gray-500">
                      시작 {formatDate(p.startedAt)} · 응답 {p._count.responses}
                      개 · 댓글 {p._count.comments}개
                    </div>
                  </button>
                </li>
              );
            })}
            {filteredList.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-gray-500">
                {phaseFilter === "all"
                  ? "참가자 데이터가 없습니다."
                  : `${phaseLabel(phaseFilter)} 단계의 참가자가 없습니다.`}
              </li>
            )}
          </ul>
        </aside>

        {/* 우측 상세 */}
        <main className="flex-1 overflow-y-auto p-6">
          {!selectedId && (
            <p className="text-sm text-gray-500">
              좌측에서 참가자를 선택하세요.
            </p>
          )}

          {selectedId && detailLoading && (
            <p className="text-sm text-gray-500">불러오는 중…</p>
          )}

          {detail && (
            <div className="space-y-6">
              <section className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      참가자 상세
                    </h2>
                    <code className="text-xs text-gray-500">{detail.id}</code>
                  </div>
                  <button
                    onClick={downloadDetailJson}
                    className="text-xs px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    JSON 다운로드
                  </button>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500 text-xs">조건</dt>
                    <dd className="text-gray-900 font-medium">
                      {detail.condition}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">실험 단계</dt>
                    <dd className="flex items-center gap-2">
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                          PHASE_BADGE_STYLES[detail.phase] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {phaseLabel(detail.phase)}
                      </span>
                      <select
                        value={detail.phase}
                        onChange={(e) =>
                          void changeParticipantPhase(
                            detail.id,
                            e.target.value as Phase
                          )
                        }
                        className="border border-gray-300 rounded px-1.5 py-0.5 text-[11px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="이 참가자의 단계를 재분류합니다"
                      >
                        {PHASES.map((p) => (
                          <option key={p} value={p}>
                            {PHASE_LABELS[p]}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">언어</dt>
                    <dd className="text-gray-900">
                      {detail.language === "en" ? "English (en)" : "한국어 (ko)"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">
                      외부 식별자 (CloudResearch)
                    </dt>
                    <dd className="text-gray-900">
                      {detail.externalId ? (
                        <code className="text-xs">{detail.externalId}</code>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">동의 여부</dt>
                    <dd className="text-gray-900">
                      {detail.consent ? "동의함" : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">시작 시각</dt>
                    <dd className="text-gray-900">
                      {formatDate(detail.startedAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">완료 시각</dt>
                    <dd className="text-gray-900">
                      {formatDate(detail.completedAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">현재 단계</dt>
                    <dd className="text-gray-900">{detail.currentStep}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs">응답·댓글 수</dt>
                    <dd className="text-gray-900">
                      응답 {detail.responses.length}개 / 댓글{" "}
                      {detail.comments.length}개
                    </dd>
                  </div>
                </dl>
              </section>

              {(Object.keys(responseGroups) as string[]).map((surveyType) => {
                const rows = responseGroups[surveyType];
                return (
                  <section
                    key={surveyType}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <header className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {surveyType}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {rows.length}개
                      </span>
                    </header>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-xs text-gray-500">
                        <tr>
                          <th className="text-left px-4 py-2 font-medium w-1/3">
                            questionId
                          </th>
                          <th className="text-left px-4 py-2 font-medium">
                            answer
                          </th>
                          <th className="text-left px-4 py-2 font-medium w-40">
                            시각
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr
                            key={r.id}
                            className="border-t border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-4 py-2 text-gray-800 font-mono text-xs">
                              {r.questionId}
                            </td>
                            <td className="px-4 py-2 text-gray-900 whitespace-pre-wrap">
                              {r.answer}
                            </td>
                            <td className="px-4 py-2 text-gray-500 text-xs">
                              {formatDate(r.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                );
              })}

              {detail.comments.length > 0 && (
                <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <header className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      작성한 댓글
                    </h3>
                    <span className="text-xs text-gray-500">
                      {detail.comments.length}개
                    </span>
                  </header>
                  <ul>
                    {detail.comments.map((c) => (
                      <li
                        key={c.id}
                        className="px-4 py-3 border-t border-gray-100"
                      >
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">
                          {c.content}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(c.createdAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {detail.responses.length === 0 &&
                detail.comments.length === 0 && (
                  <p className="text-sm text-gray-500">
                    저장된 응답이나 댓글이 없습니다.
                  </p>
                )}
            </div>
          )}
        </main>
          </div>
        </>
      )}
    </div>
  );
}
