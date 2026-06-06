"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useLang } from "@/lib/useLang";

// 고정 완료 코드 — CloudResearch 스터디(폼) 설정의 완료 코드란에 이 값을 그대로 등록할 것.
const COMPLETION_CODE = "ACF-2026-K7X4";

const CONTENT = {
  ko: {
    title: "실험 참여가 완료되었습니다",
    thanks: "소중한 시간을 내어 참여해주셔서 감사합니다.",
    codeTitle: "완료 코드",
    codeDesc:
      "아래 코드를 복사하여 모집 페이지(CloudResearch)에 입력해주세요. 코드를 입력해야 참여 보상이 지급됩니다.",
    copy: "코드 복사",
    copied: "✓ 복사 완료",
    copiedMsg:
      "완료 코드가 복사되었습니다. CloudResearch 페이지에 붙여넣어주세요.",
    copyError: "복사에 실패했습니다. 코드를 직접 선택해 복사해주세요.",
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
    codeTitle: "Completion Code",
    codeDesc:
      "Copy the code below and enter it on the recruitment page (CloudResearch). You must enter the code to receive compensation.",
    copy: "Copy Code",
    copied: "✓ Copied",
    copiedMsg:
      "The completion code has been copied. Please paste it on the CloudResearch page.",
    copyError: "Copy failed. Please select and copy the code manually.",
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
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(COMPLETION_CODE);
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
          <p className="text-sm font-medium text-blue-900 mb-1">{c.codeTitle}</p>
          <p className="text-xs text-blue-800 mb-3 leading-relaxed">
            {c.codeDesc}
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={COMPLETION_CODE}
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
