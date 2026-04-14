"use client";

import { useState } from "react";
import type { SurveyQuestion } from "@/data/survey-questions";
import LikertScale from "./LikertScale";
import MultipleChoice from "./MultipleChoice";
import TextQuestion from "./TextQuestion";

type SurveyFormProps = {
  questions: SurveyQuestion[];
  surveyType: "pre" | "post";
  onSubmit: (answers: Record<string, string>) => void;
  isSubmitting?: boolean;
};

export default function SurveyForm({
  questions,
  surveyType,
  onSubmit,
  isSubmitting = false,
}: SurveyFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredUnanswered = questions.filter(
      (q) => q.required && !answers[q.id]
    );

    if (requiredUnanswered.length > 0) {
      setError("필수 항목을 모두 응답해주세요.");
      return;
    }

    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        {questions.map((q) => {
          switch (q.type) {
            case "likert":
              return (
                <LikertScale
                  key={q.id}
                  questionId={q.id}
                  question={q.question}
                  value={answers[q.id] || ""}
                  onChange={handleChange}
                  required={q.required}
                />
              );
            case "multiple_choice":
              return (
                <MultipleChoice
                  key={q.id}
                  questionId={q.id}
                  question={q.question}
                  options={q.options || []}
                  value={answers[q.id] || ""}
                  onChange={handleChange}
                  required={q.required}
                />
              );
            case "text":
              return (
                <TextQuestion
                  key={q.id}
                  questionId={q.id}
                  question={q.question}
                  value={answers[q.id] || ""}
                  onChange={handleChange}
                  required={q.required}
                />
              );
          }
        })}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "제출 중..." : "다음"}
      </button>
    </form>
  );
}
