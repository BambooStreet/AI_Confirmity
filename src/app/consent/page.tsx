"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import { useLang } from "@/lib/useLang";

const CONTENT = {
  ko: {
    title: "연구 참여 동의서",
    sections: [
      {
        heading: "연구 제목",
        bullets: ["온라인 커뮤니티 게시글·댓글에 대한 이용자 인식 연구"],
      },
      {
        heading: "연구 절차",
        intro: "본 연구는 아래 순서로 진행되며, 전체 소요시간은 약 10~15분입니다.",
        bullets: [
          "사전 설문: 인적 사항, 평소 온라인 커뮤니티 이용 행태, AI에 대한 인식 등을 묻는 간단한 설문에 응답합니다.",
          "본실험(2회): 커뮤니티 형태로 제시되는 게시글과 댓글을 읽고, 본인의 의견을 직접 댓글로 남긴 뒤 관련 질문에 응답합니다.",
          "사후 설문: 마무리 설문에 응답하면 모든 절차가 완료됩니다.",
        ],
      },
      {
        heading: "개인정보 보호",
        bullets: [
          "수집된 모든 데이터는 익명으로 처리됩니다.",
          "수집된 데이터는 연구 목적으로만 사용됩니다.",
          "개인을 식별할 수 있는 정보는 수집하지 않습니다.",
        ],
      },
      {
        heading: "자발적 참여",
        bullets: [
          "본 연구 참여는 전적으로 자발적입니다.",
          "참여 도중 언제든지 중단할 수 있습니다.",
          "참여를 중단하더라도 어떠한 불이익도 없습니다.",
        ],
      },
      {
        heading: "연구자 연락처",
        intro: "본 연구에 대한 문의사항이 있으시면 아래로 연락해 주세요.",
        bullets: [
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
        bullets: [
          "Understanding how people respond to posts and comments in online communities",
        ],
      },
      {
        heading: "What You'll Do",
        intro: "The study runs in the following steps and takes about 10–15 minutes in total.",
        bullets: [
          "Pre-survey: a few background questions about you, how you usually use online communities, and how you view AI.",
          "Main tasks (twice): read a community-style post and its comments, share your own opinion as a comment, then answer a few follow-up questions.",
          "Post-survey: a short wrap-up questionnaire completes the study.",
        ],
      },
      {
        heading: "Your Privacy",
        bullets: [
          "Everything you share is stored anonymously.",
          "Your responses are used only for research.",
          "We never collect anything that could identify you personally.",
        ],
      },
      {
        heading: "Taking Part Is Your Choice",
        bullets: [
          "Joining this study is entirely voluntary.",
          "You can stop at any point along the way.",
          "Choosing to stop comes with no penalty of any kind.",
        ],
      },
      {
        heading: "Questions?",
        intro: "If anything about the study is unclear, feel free to reach out.",
        bullets: [
          "Principal Researcher: Haeyoon Lee",
          "Email: hailey99@g.skku.edu",
          "Affiliation: Department of Interaction Science, Sungkyunkwan University",
        ],
      },
    ],
    checkbox:
      "I have read and fully understood the information above, and I voluntarily agree to take part in this study.",
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
            {"intro" in section && section.intro && (
              <p className="mb-1">{section.intro}</p>
            )}
            <ul className="list-disc pl-5 space-y-1">
              {section.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
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
