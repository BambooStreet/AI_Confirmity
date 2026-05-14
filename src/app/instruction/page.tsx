"use client";

import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";

export default function InstructionPage() {
  const router = useRouter();

  const handleNext = async () => {
    const participantId = localStorage.getItem("participantId");
    if (participantId) {
      await fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, currentStep: 3 }),
      });
    }
    router.push("/experiment");
  };

  return (
    <PageWrapper currentStep="instruction">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">실험 안내</h1>

      <div className="space-y-6 text-gray-700">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <h2 className="font-semibold text-blue-900 mb-2">전체 흐름</h2>
          <p className="text-sm leading-relaxed">
            본 실험은 두 가지 과제로 구성됩니다. 두 과제 모두 온라인 커뮤니티에서
            의견을 나누는 상황을 모사하고 있어요. 평소 인터넷에서 글을 읽고 댓글을
            남길 때처럼 자연스럽게 참여해주세요.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            <div>
              <h3 className="font-medium text-gray-900">본실험 1 — 선분 비교</h3>
              <p className="text-sm text-gray-600">
                기준 선분과 같은 길이의 비교 선분을 고르는 짧은 시지각 과제입니다.
                선분을 살펴보고, 답을 고르고, 다른 사람들의 의견을 본 뒤 다시 한 번
                답을 선택하게 됩니다.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            <div>
              <h3 className="font-medium text-gray-900">
                본실험 2 — 존엄사 토론
              </h3>
              <p className="text-sm text-gray-600">
                존엄사 합법화를 두고 의견이 오가는 커뮤니티 글과 댓글을 읽은 뒤,
                본인의 생각을 댓글로 작성해주세요.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            <div>
              <h3 className="font-medium text-gray-900">사후 설문</h3>
              <p className="text-sm text-gray-600">
                두 과제가 끝나면 짧은 사후 설문에 응답하고 실험이 마무리됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>참고:</strong> 정답이나 오답은 없습니다. 평소 본인이 느끼는
            대로 자연스럽게 답해주시면 됩니다.
          </p>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        실험 시작하기
      </button>
    </PageWrapper>
  );
}
