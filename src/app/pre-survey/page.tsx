"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import SurveyForm from "@/components/survey/SurveyForm";
import { preSurveyQuestions, type SurveyQuestion } from "@/data/survey-questions";

export default function PreSurveyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<SurveyQuestion[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/survey?type=pre", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { questions: SurveyQuestion[] }) => {
        if (active) setQuestions(data.questions);
      })
      .catch(() => {
        // API 실패 시 코드 기본값으로 폴백 — 설문이 멈추지 않도록.
        if (active) setQuestions(preSurveyQuestions);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (answers: Record<string, string>) => {
    setIsSubmitting(true);
    const participantId = localStorage.getItem("participantId");

    if (participantId) {
      await Promise.all([
        fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            participantId,
            surveyType: "pre",
            answers,
          }),
        }),
        fetch("/api/participants", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participantId, currentStep: 2 }),
        }),
      ]);
    }

    router.push("/instruction");
  };

  return (
    <PageWrapper currentStep="pre-survey">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">사전 설문</h1>
      <p className="text-sm text-gray-500 mb-6">
        본 실험에 앞서 몇 가지 질문에 응답해주세요.
      </p>

      {questions === null ? (
        <p className="text-sm text-gray-400">설문을 불러오는 중…</p>
      ) : (
        <SurveyForm
          questions={questions}
          surveyType="pre"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </PageWrapper>
  );
}
