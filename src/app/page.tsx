"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import {
  isValidCondition,
  VALID_CONDITIONS,
  type ConditionKey,
} from "@/lib/conditions";
import { normalizeLang, UI, type Lang } from "@/i18n/ui";

function describeCondition(key: ConditionKey): string {
  const count = key.replace(/^(no_)?ai_/, "");
  return `${key} — 댓글 ${count}개`;
}

const AI_GROUP = VALID_CONDITIONS.filter((k) => k.startsWith("ai_"));
const NO_AI_GROUP = VALID_CONDITIONS.filter((k) => k.startsWith("no_ai_"));

// 외부 패널(CloudResearch 등)이 URL에 붙여 보내는 참가자 식별자 후보 키.
// 플랫폼·설정에 따라 키 이름이 달라 우선순위대로 모두 체크한다.
const EXTERNAL_ID_KEYS = ["participantId", "workerId", "assignmentId", "hitId"];

type ExternalInfo = {
  externalId: string | null;
  externalMeta: Record<string, string> | null;
  // 연구자 확인용: URL에 phase=test가 있으면 전역 단계 설정과 무관하게 test로 기록
  phase: string | null;
};

// 진입 URL의 쿼리스트링 전체를 보존하고, 후보 키 중 첫 번째로 값이 있는 것을 식별자로 추출한다.
function extractExternalInfo(
  searchParams: ReturnType<typeof useSearchParams>
): ExternalInfo {
  const meta: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) meta[key] = value;
  const idKey = EXTERNAL_ID_KEYS.find((k) => meta[k]?.trim());
  return {
    externalId: idKey ? meta[idKey].trim() : null,
    externalMeta: Object.keys(meta).length > 0 ? meta : null,
    phase: searchParams.get("phase"),
  };
}

function startParticipant(
  condition: ConditionKey,
  external: ExternalInfo,
  lang: Lang,
  router: ReturnType<typeof useRouter>,
  onError: (msg: string) => void
) {
  fetch("/api/participants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      condition,
      externalId: external.externalId,
      externalMeta: external.externalMeta,
      phase: external.phase,
      lang,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        localStorage.setItem("participantId", data.id);
        // 재진입으로 기존 참가자가 반환되면 그쪽 condition·언어를 따른다.
        localStorage.setItem("condition", data.condition ?? condition);
        localStorage.setItem("lang", normalizeLang(data.language ?? lang));
        router.push("/consent");
      } else {
        onError(UI[lang].landing.registerError);
      }
    })
    .catch(() => {
      onError(UI[lang].landing.serverError);
    });
}

function LandingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCondition = searchParams.get("condition");
  const validUrlCondition =
    urlCondition && isValidCondition(urlCondition) ? urlCondition : null;
  // 참가자 진입 언어 — localStorage 저장 전(로딩/에러 화면)에도 써야 해서 URL에서 직접 읽는다
  const urlLang = normalizeLang(searchParams.get("lang"));

  const [error, setError] = useState<string | null>(() =>
    urlCondition && !validUrlCondition
      ? "유효하지 않은 실험 조건입니다. 아래에서 다시 선택해주세요."
      : null
  );
  const [mode, setMode] = useState<"loading" | "select">(() =>
    validUrlCondition ? "loading" : "select"
  );
  const [selected, setSelected] = useState<ConditionKey>(
    (validUrlCondition as ConditionKey | null) ?? VALID_CONDITIONS[0]
  );
  const [submitting, setSubmitting] = useState(false);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);
  // 배포 링크 영어 버전 여부 (연구자용 토글 — 링크에 &lang=en 부착)
  const [english, setEnglish] = useState(urlLang === "en");
  const didStart = useRef(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // 최초 진입 시 URL에 유효한 condition이 있을 때만 자동 시작(참가자 링크).
  // 연구자가 아래에서 그룹을 고르며 URL만 바꾸는 경우엔 시작되지 않는다.
  useEffect(() => {
    if (didStart.current || !validUrlCondition) return;
    didStart.current = true;
    startParticipant(
      validUrlCondition,
      extractExternalInfo(searchParams),
      urlLang,
      router,
      (msg) => {
        setError(msg);
        setMode("select");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const langSuffix = english ? "&lang=en" : "";
  const linkFor = (c: ConditionKey) => `${origin}/?condition=${c}${langSuffix}`;

  // 그룹 선택 시 주소창 URL을 그 그룹용으로 바꾼다(자동 시작은 트리거하지 않음).
  const handleSelectChange = (value: ConditionKey) => {
    setSelected(value);
    setCopied(false);
    router.replace(`/?condition=${value}${langSuffix}`, { scroll: false });
  };

  const handleEnglishChange = (checked: boolean) => {
    setEnglish(checked);
    setCopied(false);
    router.replace(
      `/?condition=${selected}${checked ? "&lang=en" : ""}`,
      { scroll: false }
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkFor(selected));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("복사에 실패했습니다. 링크를 직접 선택해 복사해주세요.");
    }
  };

  if (mode === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">{UI[urlLang].landing.preparing}</p>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    startParticipant(
      selected,
      extractExternalInfo(searchParams),
      english ? "en" : "ko",
      router,
      (msg) => {
        setError(msg);
        setSubmitting(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">실험 조건 선택</h1>
        <p className="text-sm text-gray-600 mb-6">
          실험을 시작하기 전 처치물(조건)을 선택해주세요.
        </p>

        <label
          htmlFor="condition-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          조건
        </label>
        <select
          id="condition-select"
          value={selected}
          onChange={(e) => handleSelectChange(e.target.value as ConditionKey)}
          disabled={submitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
        >
          <optgroup label="AI 라벨 표시">
            {AI_GROUP.map((key) => (
              <option key={key} value={key}>
                {describeCondition(key)}
              </option>
            ))}
          </optgroup>
          <optgroup label="AI 라벨 미표시">
            {NO_AI_GROUP.map((key) => (
              <option key={key} value={key}>
                {describeCondition(key)}
              </option>
            ))}
          </optgroup>
        </select>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleStart}
          disabled={submitting}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "준비 중..." : "실험 시작"}
        </button>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <label className="flex items-center gap-2 mb-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={english}
              onChange={(e) => handleEnglishChange(e.target.checked)}
              disabled={submitting}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              영어(English) 버전
              <span className="ml-1 text-xs text-gray-400">
                — 링크에 &lang=en이 붙고, 참가자는 전 과정을 영어로 진행합니다
              </span>
            </span>
          </label>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            이 그룹 참가자 배포 링크
          </label>
          <div className="flex gap-2">
            <input
              readOnly
              value={origin ? linkFor(selected) : ""}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-xs text-gray-700 bg-gray-50 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={copyLink}
              className="text-xs px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap"
            >
              {copied ? "복사됨" : "복사"}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-gray-400">
            참가자가 이 링크로 들어오면 해당 그룹으로 자동 시작됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <LandingContent />
    </Suspense>
  );
}
