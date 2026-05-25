"use client";

import { useEffect, useMemo, useState } from "react";
import QuestionEditor from "@/components/admin/QuestionEditor";

const PASSWORD_KEY = "admin_password_v1";

type ParticipantSummary = {
  id: string;
  condition: string;
  startedAt: string;
  completedAt: string | null;
  consent: boolean;
  currentStep: number;
  _count: { responses: number; comments: number };
};

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
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
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
  async function downloadAllCsv() {
    setExporting(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/export?password=${encodeURIComponent(password)}`,
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
      a.download = `participants_${stamp}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("CSV 다운로드 중 네트워크 오류");
    } finally {
      setExporting(false);
    }
  }

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
              <button
                onClick={() => void downloadAllCsv()}
                disabled={exporting}
                className="text-xs px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {exporting ? "내보내는 중…" : "전체 CSV 다운로드"}
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
                    <li><code className="text-gray-900">condition</code> — 실험 조건 (예: <code>ai_10</code> = AI 라벨 표시 + 댓글 10개, <code>no_ai_5</code> = 라벨 없음 + 5개)</li>
                    <li><code className="text-gray-900">consent</code> — 동의 여부 (Y/N)</li>
                    <li><code className="text-gray-900">current_step</code> — 도달한 단계</li>
                    <li><code className="text-gray-900">completed</code> — 사후설문까지 완료 여부 (Y/N)</li>
                    <li><code className="text-gray-900">started_at / completed_at</code> — 시작/완료 시각 (UTC)</li>
                    <li><code className="text-gray-900">n_responses / n_comments</code> — 응답·작성 댓글 개수</li>
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
          <div className="px-4 py-3 border-b border-gray-200 text-xs text-gray-500 sticky top-0 bg-white">
            총 {list.length}명
          </div>
          <ul>
            {list.map((p) => {
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
                    <div className="mt-1 text-xs text-gray-700">
                      <span className="font-semibold">{p.condition}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-gray-500">
                      시작 {formatDate(p.startedAt)} · 응답 {p._count.responses}
                      개 · 댓글 {p._count.comments}개
                    </div>
                  </button>
                </li>
              );
            })}
            {list.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-gray-500">
                참가자 데이터가 없습니다.
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
