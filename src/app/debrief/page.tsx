"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useLang } from "@/lib/useLang";
import { getCompletion, type Completion } from "@/lib/completion";

const CONTENT = {
  ko: {
    title: "실험 참여가 완료되었습니다",
    thanks: "소중한 시간을 내어 참여해주셔서 감사합니다.",
    codeTitle: "참여 완료 및 보상 받기",
    codeDesc:
      "아래 버튼을 누르면 CloudResearch로 돌아가 참여가 완료 처리됩니다. 버튼이 작동하지 않으면 아래 완료 코드를 모집 페이지에 직접 입력해주세요.",
    redirect: "참여 완료하기 (CloudResearch로 돌아가기)",
    codeLabel: "완료 코드 (버튼이 안 될 때 직접 입력)",
    copy: "코드 복사",
    copied: "✓ 복사 완료",
    copiedMsg:
      "완료 코드가 복사되었습니다. CloudResearch 페이지에 붙여넣어주세요.",
    copyError: "복사에 실패했습니다. 코드를 직접 선택해 복사해주세요.",
    loading: "완료 정보를 불러오는 중입니다…",
    noCode:
      "완료 코드를 불러오지 못했습니다. 아래 연구 책임자에게 문의해주시면 보상을 처리해드리겠습니다.",
    contactIntro: "문의사항이 있으시면 아래로 연락해주세요.",
    contactLines: [
      "연구 책임자: 이해윤",
      "이메일: hailey99@g.skku.edu",
      "소속: 성균관대학교 인터랙션사이언스학과",
    ],
  },
  en: {
    title: "You have completed the study",
    thanks: "Thank you for taking the time to participate.",
    codeTitle: "Complete & receive compensation",
    codeDesc:
      "Click the button below to return to CloudResearch and have your participation marked complete. If the button does not work, enter the completion code below on the recruitment page manually.",
    redirect: "Complete participation (return to CloudResearch)",
    codeLabel: "Completion code (enter manually if the button fails)",
    copy: "Copy Code",
    copied: "✓ Copied",
    copiedMsg:
      "The completion code has been copied. Please paste it on the CloudResearch page.",
    copyError: "Copy failed. Please select and copy the code manually.",
    loading: "Loading your completion details…",
    noCode:
      "We couldn't load your completion code. Please contact the principal researcher below and we will process your compensation.",
    contactIntro: "If you have any questions, please contact:",
    contactLines: [
      "Principal Researcher: Haeyun Lee",
      "Email: hailey99@g.skku.edu",
      "Affiliation: Department of Interaction Science, Sungkyunkwan University",
    ],
  },
} as const;

export default function DebriefPage() {
  const lang = useLang();
  const c = CONTENT[lang];
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  // undefined = 로딩 중, null = 매핑 없음, Completion = 정상
  const [completion, setCompletion] = useState<Completion | null | undefined>(
    undefined
  );

  // 사후설문 제출 시에도 기록되지만, debrief 도달을 완료 기준으로 한 번 더 보장한다.
  // (서버에서 최초 완료 시각은 덮어쓰지 않음)
  useEffect(() => {
    const participantId = localStorage.getItem("participantId");
    if (participantId) {
      fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, completed: true }),
      }).catch(() => {
        // 완료 기록 실패는 참가자 화면 흐름을 막지 않는다 (사후설문 제출 시 이미 기록됨)
      });
    }
    // 조건(ai_5 등)으로 그룹별 완료 코드·리다이렉트 URL을 선택.
    // localStorage는 SSR엔 없어 마운트 후 읽어야 하므로 effect 내 setState가 불가피하다
    // (초기값 undefined라 하이드레이션 불일치 없음).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompletion(getCompletion(localStorage.getItem("condition")));
  }, []);

  const copyCode = async () => {
    if (!completion) return;
    try {
      await navigator.clipboard.writeText(completion.code);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <PageWrapper currentStep="debrief" showProgress={false}>
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{c.title}</h1>

        <p className="text-gray-600 mb-8 leading-relaxed">{c.thanks}</p>

        {completion === undefined ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-blue-800">{c.loading}</p>
          </div>
        ) : completion === null ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 text-left">
            <p className="text-sm font-medium text-amber-900 leading-relaxed">
              {c.noCode}
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <p className="text-sm font-medium text-blue-900 mb-1">
              {c.codeTitle}
            </p>
            <p className="text-xs text-blue-800 mb-4 leading-relaxed">
              {c.codeDesc}
            </p>

            <a
              href={completion.url}
              className="block w-full text-center text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-3 transition-colors"
            >
              {c.redirect}
            </a>

            <p className="text-xs text-blue-800 mt-4 mb-1">{c.codeLabel}</p>
            <div className="flex gap-2">
              <input
                readOnly
                value={completion.code}
                onFocus={(e) => e.currentTarget.select()}
                className={`flex-1 border rounded-md px-3 py-2 text-sm font-mono font-bold focus:outline-none focus:ring-2 transition-colors ${
                  copied
                    ? "border-green-400 bg-green-50 text-green-900 focus:ring-green-500"
                    : "border-blue-300 bg-white text-blue-900 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={copyCode}
                className={`text-sm px-4 py-2 rounded-md text-white font-medium whitespace-nowrap transition-colors ${
                  copied
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {copied ? c.copied : c.copy}
              </button>
            </div>
            {copied && (
              <p
                className="mt-2 text-sm font-medium text-green-700 flex items-center gap-1"
                role="status"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {c.copiedMsg}
              </p>
            )}
            {copyError && (
              <p className="mt-2 text-xs text-red-600">{c.copyError}</p>
            )}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6 text-left">
          <p className="text-sm text-gray-600 leading-relaxed">
            {c.contactIntro}
            {c.contactLines.map((line) => (
              <span key={line}>
                <br />
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
