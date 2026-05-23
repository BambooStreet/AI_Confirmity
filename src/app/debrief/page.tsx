"use client";

import PageWrapper from "@/components/layout/PageWrapper";

export default function DebriefPage() {
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
