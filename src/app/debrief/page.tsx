"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";

// 고정 완료 코드 — CloudResearch 스터디(폼) 설정의 완료 코드란에 이 값을 그대로 등록할 것.
const COMPLETION_CODE = "ACF-2026-K7X4";

export default function DebriefPage() {
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

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          실험 참여가 완료되었습니다
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          소중한 시간을 내어 참여해주셔서 감사합니다.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
          <p className="text-sm font-medium text-blue-900 mb-1">완료 코드</p>
          <p className="text-xs text-blue-800 mb-3 leading-relaxed">
            아래 코드를 복사하여 모집 페이지(CloudResearch)에 입력해주세요.
            코드를 입력해야 참여 보상이 지급됩니다.
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
              {copied ? "✓ 복사 완료" : "코드 복사"}
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
              완료 코드가 복사되었습니다. CloudResearch 페이지에 붙여넣어주세요.
            </p>
          )}
          {copyError && (
            <p className="mt-2 text-xs text-red-600">
              복사에 실패했습니다. 코드를 직접 선택해 복사해주세요.
            </p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-left">
          <p className="text-sm text-gray-600 leading-relaxed">
            문의사항이 있으시면 아래로 연락해주세요.
            <br />
            연구 책임자: 이해윤
            <br />
            이메일: hailey99@g.skku.edu
            <br />
            소속: 성균관대학교 인터랙션사이언스학과
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
