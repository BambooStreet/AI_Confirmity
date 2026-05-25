"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import SurveyForm from "@/components/survey/SurveyForm";
import { postSurveyQuestions, type SurveyQuestion } from "@/data/survey-questions";

export default function PostSurveyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<SurveyQuestion[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/survey?type=post", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { questions: SurveyQuestion[] }) => {
        if (active) setQuestions(data.questions);
      })
      .catch(() => {
        // API 실패 시 코드 기본값으로 폴백 — 설문이 멈추지 않도록.
        if (active) setQuestions(postSurveyQuestions);
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
            surveyType: "post",
            answers,
          }),
        }),
        fetch("/api/participants", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            participantId,
            currentStep: 6,
            completed: true,
          }),
        }),
      ]);
    }

    router.push("/debrief");
  };

  return (
    <PageWrapper currentStep="post-survey">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">사후 설문</h1>
      <p className="text-sm text-gray-500 mb-6">
        게시글과 댓글을 읽은 후의 의견을 응답해주세요.
      </p>

      {questions === null ? (
        <p className="text-sm text-gray-400">설문을 불러오는 중…</p>
      ) : (
        <SurveyForm
          questions={questions}
          surveyType="post"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </PageWrapper>
  );
}
