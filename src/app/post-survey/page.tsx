"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import SurveyForm from "@/components/survey/SurveyForm";
import { postSurveyQuestions, type SurveyQuestion } from "@/data/survey-questions";
import { postSurveyQuestionsEn } from "@/data/survey-questions.en";
import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";

export default function PostSurveyPage() {
  const router = useRouter();
  const lang = useLang();
  const t = UI[lang].survey;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<SurveyQuestion[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/survey?type=post&lang=${lang}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { questions: SurveyQuestion[] }) => {
        if (active) setQuestions(data.questions);
      })
      .catch(() => {
        // API 실패 시 코드 기본값으로 폴백 — 설문이 멈추지 않도록.
        if (active)
          setQuestions(
            lang === "en" ? postSurveyQuestionsEn : postSurveyQuestions
          );
      });
    return () => {
      active = false;
    };
  }, [lang]);

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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.postTitle}</h1>
      <p className="text-sm text-gray-500 mb-6">{t.postDesc}</p>

      {questions === null ? (
        <p className="text-sm text-gray-400">{t.loading}</p>
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
