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

        <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">연구 안내 (디브리핑)</h2>

          <p className="text-sm text-gray-700 leading-relaxed">
            본 연구는 온라인 뉴스 환경에서 AI가 생성한 댓글에 대한 이용자 인식을
            조사하기 위해 설계되었습니다.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            귀하가 읽은 기사에 달린 댓글 중 일부는 연구 목적으로 사전에 준비된
            것이었으며, 실험 조건에 따라 AI 라벨 표시 여부와 댓글 수가 다르게
            설정되었습니다.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            본 연구의 결과는 학술 목적으로만 사용되며, 수집된 데이터에서 개인을
            식별할 수 있는 정보는 포함되어 있지 않습니다.
          </p>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm text-gray-500">
              연구에 대한 문의사항이 있으시면 아래로 연락해주세요.
              <br />
              연구 책임자: [연구자 이름]
              <br />
              이메일: [이메일 주소]
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
