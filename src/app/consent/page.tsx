"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";

export default function ConsentPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (!agreed) return;
    setIsSubmitting(true);

    const participantId = localStorage.getItem("participantId");
    if (participantId) {
      await fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, consent: true, currentStep: 1 }),
      });
    }

    router.push("/pre-survey");
  };

  return (
    <PageWrapper currentStep="consent">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">연구 참여 동의서</h1>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-900">연구 제목</h2>
        <p>온라인 뉴스 댓글에 대한 이용자 인식 연구</p>

        <h2 className="text-lg font-semibold text-gray-900">연구 목적</h2>
        <p>
          본 연구는 온라인 뉴스 환경에서 이용자들이 댓글을 어떻게 인식하고 반응하는지를
          이해하기 위해 수행됩니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">연구 절차</h2>
        <p>
          본 연구에 참여하시면 간단한 사전 설문에 응답한 후, 뉴스 기사를 읽고 댓글을
          확인하게 됩니다. 이후 사후 설문에 응답하시면 실험이 완료됩니다. 전체
          소요시간은 약 15-20분입니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">개인정보 보호</h2>
        <p>
          수집된 모든 데이터는 익명으로 처리되며, 연구 목적으로만 사용됩니다. 개인을
          식별할 수 있는 정보는 수집하지 않습니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">자발적 참여</h2>
        <p>
          본 연구 참여는 자발적이며, 언제든지 참여를 중단할 수 있습니다. 참여 중단으로
          인한 불이익은 전혀 없습니다.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">연구자 연락처</h2>
        <p>
          본 연구에 대한 문의사항이 있으시면 아래 연락처로 문의해주세요.
          <br />
          연구 책임자: [연구자 이름]
          <br />
          이메일: [이메일 주소]
          <br />
          소속: [소속 기관]
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 rounded"
          />
          <span className="text-sm text-gray-700">
            위 내용을 충분히 읽고 이해하였으며, 자발적으로 본 연구에 참여하는 것에
            동의합니다.
          </span>
        </label>

        <button
          onClick={handleNext}
          disabled={!agreed || isSubmitting}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "처리 중..." : "동의하고 시작하기"}
        </button>
      </div>
    </PageWrapper>
  );
}
