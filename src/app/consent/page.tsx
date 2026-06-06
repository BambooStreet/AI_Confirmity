"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import { useLang } from "@/lib/useLang";

// ⚠️ EN은 한국어 동의서의 직역 초벌입니다 — IRB 영문 승인 문구 확보 시 교체하세요.
const CONTENT = {
  ko: {
    title: "연구 참여 동의서",
    sections: [
      {
        heading: "연구 제목",
        paragraphs: ["온라인 커뮤니티 게시글·댓글에 대한 이용자 인식 연구"],
      },
      {
        heading: "연구 절차",
        paragraphs: [
          "본 연구에 참여하시면 먼저 인적 사항, 평소 온라인 커뮤니티 이용 행태, AI에 대한 인식 등을 묻는 간단한 사전 설문에 응답하시게 됩니다. 이후 두 가지 본실험에 차례로 참여하시며, 각 실험에서는 온라인 커뮤니티 형태로 제시되는 게시글과 댓글을 읽고 본인의 의견을 직접 댓글로 남긴 뒤 관련 질문에 응답하시게 됩니다. 마지막으로 사후 설문에 응답하시면 모든 절차가 완료됩니다. 전체 소요시간은 약 10-15분입니다.",
        ],
      },
      {
        heading: "개인정보 보호",
        paragraphs: [
          "수집된 모든 데이터는 익명으로 처리되며, 연구 목적으로만 사용됩니다. 개인을 식별할 수 있는 정보는 수집하지 않습니다.",
        ],
      },
      {
        heading: "자발적 참여",
        paragraphs: [
          "본 연구 참여는 자발적이며, 언제든지 참여를 중단할 수 있습니다. 참여 중단으로 인한 불이익은 전혀 없습니다.",
        ],
      },
      {
        heading: "연구자 연락처",
        paragraphs: [
          "본 연구에 대한 문의사항이 있으시면 아래 연락처로 문의해주세요.",
          "연구 책임자: 이해윤",
          "이메일: hailey99@g.skku.edu",
          "소속: 성균관대학교 인터랙션사이언스학과",
        ],
      },
    ],
    checkbox:
      "위 내용을 충분히 읽고 이해하였으며, 자발적으로 본 연구에 참여하는 것에 동의합니다.",
    submit: "동의하고 시작하기",
    submitting: "처리 중...",
  },
  en: {
    title: "Informed Consent",
    sections: [
      {
        heading: "Study Title",
        paragraphs: [
          "A Study of User Perceptions of Posts and Comments in Online Communities",
        ],
      },
      {
        heading: "Procedure",
        paragraphs: [
          "If you take part in this study, you will first complete a short pre-survey about your demographics, your typical use of online communities, and your perceptions of AI. You will then take part in two main tasks. In each task, you will read a post and its comments presented in an online community format, leave a comment with your own opinion, and answer related questions. Finally, you will complete a short post-survey, which concludes the study. The entire study takes about 10–15 minutes.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          "All collected data will be anonymized and used for research purposes only. No personally identifiable information will be collected.",
        ],
      },
      {
        heading: "Voluntary Participation",
        paragraphs: [
          "Participation in this study is voluntary, and you may withdraw at any time. There is no penalty for withdrawing.",
        ],
      },
      {
        heading: "Researcher Contact",
        paragraphs: [
          "If you have any questions about this study, please contact:",
          "Principal Researcher: Haeyun Lee",
          "Email: hailey99@g.skku.edu",
          "Affiliation: Department of Interaction Science, Sungkyunkwan University",
        ],
      },
    ],
    checkbox:
      "I have read and fully understood the information above, and I voluntarily agree to participate in this study.",
    submit: "Agree and Start",
    submitting: "Processing...",
  },
} as const;

export default function ConsentPage() {
  const router = useRouter();
  const lang = useLang();
  const c = CONTENT[lang];
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{c.title}</h1>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-4 mb-8">
        {c.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold text-gray-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-0" : undefined}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 rounded"
          />
          <span className="text-sm text-gray-700">{c.checkbox}</span>
        </label>

        <button
          onClick={handleNext}
          disabled={!agreed || isSubmitting}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? c.submitting : c.submit}
        </button>
      </div>
    </PageWrapper>
  );
}
