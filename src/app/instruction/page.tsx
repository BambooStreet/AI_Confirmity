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
          <h2 className="font-semibold text-blue-900 mb-2">실험 진행 방법</h2>
          <p className="text-sm leading-relaxed">
            다음 페이지에서 뉴스 기사 하나를 읽게 됩니다. 기사를 충분히 읽은 후,
            기사 하단의 댓글을 확인해주세요.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            <div>
              <h3 className="font-medium text-gray-900">기사 읽기</h3>
              <p className="text-sm text-gray-600">
                뉴스 동영상을 시청하고 기사 본문을 읽어주세요.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            <div>
              <h3 className="font-medium text-gray-900">댓글 확인</h3>
              <p className="text-sm text-gray-600">
                기사 하단에 달린 댓글들을 확인해주세요.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            <div>
              <h3 className="font-medium text-gray-900">댓글 작성</h3>
              <p className="text-sm text-gray-600">
                기사를 읽고 느낀 점이나 의견을 자유롭게 댓글로 작성해주세요.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              4
            </span>
            <div>
              <h3 className="font-medium text-gray-900">설문 응답</h3>
              <p className="text-sm text-gray-600">
                댓글 작성 후 &quot;다음&quot; 버튼을 눌러 사후 설문에 응답해주세요.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>참고:</strong> 기사와 댓글을 자연스럽게 읽어주세요. 정답이나
            오답은 없으며, 평소 온라인에서 뉴스를 읽을 때처럼 편하게 참여해주시면
            됩니다.
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
