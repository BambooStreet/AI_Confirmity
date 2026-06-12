"use client";

import { useMemo, useState } from "react";
import type { SurveyQuestion } from "@/data/survey-questions";
import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";
import LikertScale from "./LikertScale";
import MultipleChoice from "./MultipleChoice";
import TextQuestion from "./TextQuestion";
import SemanticDifferential from "./SemanticDifferential";
import NumberQuestion from "./NumberQuestion";

type SurveyFormProps = {
  questions: SurveyQuestion[];
  surveyType: "pre" | "post";
  onSubmit: (answers: Record<string, string>) => void;
  isSubmitting?: boolean;
};

function isVisible(q: SurveyQuestion, answers: Record<string, string>): boolean {
  if (!q.showIf) return true;
  return answers[q.showIf.id] === q.showIf.equals;
}

export default function SurveyForm({
  questions,
  onSubmit,
  isSubmitting = false,
}: SurveyFormProps) {
  const lang = useLang();
  const t = UI[lang].survey;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = useMemo(() => {
    const set = new Set(questions.map((q) => q.page));
    return Array.from(set).sort((a, b) => a - b);
  }, [questions]);

  const totalPages = pages.length;
  const isLastPage = currentPage === pages[totalPages - 1];

  const currentPageQuestions = useMemo(
    () => questions.filter((q) => q.page === currentPage),
    [questions, currentPage]
  );

  const visibleQuestions = useMemo(
    () => currentPageQuestions.filter((q) => isVisible(q, answers)),
    [currentPageQuestions, answers]
  );

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      // 조건부 문항의 부모 응답이 바뀌면, 해당 자식 응답을 초기화
      for (const q of questions) {
        if (q.showIf && q.showIf.id === questionId && !isVisible(q, next)) {
          delete next[q.id];
        }
      }
      return next;
    });
    setError(null);
  };

  const validateCurrentPage = (): boolean => {
    const unanswered = visibleQuestions.filter(
      (q) => q.required && !answers[q.id]
    );
    if (unanswered.length > 0) {
      setError(t.requiredError);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentPage()) return;
    const idx = pages.indexOf(currentPage);
    setCurrentPage(pages[idx + 1]);
    setError(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const idx = pages.indexOf(currentPage);
    if (idx <= 0) return;
    setCurrentPage(pages[idx - 1]);
    setError(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentPage()) return;
    onSubmit(answers);
  };

  const pageHeader = currentPageQuestions.find(
    (q) => q.pageTitle || q.pageDescription
  );

  // 페이지 내에서 section이 바뀌는 지점에 헤더 표시
  let lastSection: string | undefined;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span>{t.pageIndicator(pages.indexOf(currentPage) + 1, totalPages)}</span>
      </div>

      {pageHeader?.pageTitle && (
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {pageHeader.pageTitle}
        </h2>
      )}
      {pageHeader?.pageDescription && (
        <p className="text-sm text-gray-600 mb-6">{pageHeader.pageDescription}</p>
      )}

      <div>
        {visibleQuestions.map((q) => {
          const showSectionHeader = q.section && q.section !== lastSection;
          lastSection = q.section;

          const questionNode = (() => {
            switch (q.type) {
              case "likert7":
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
              case "semantic_diff7":
                return (
                  <SemanticDifferential
                    key={q.id}
                    questionId={q.id}
                    question={q.question}
                    leftLabel={q.leftLabel || ""}
                    rightLabel={q.rightLabel || ""}
                    value={answers[q.id] || ""}
                    onChange={handleChange}
                    required={q.required}
                  />
                );
              case "number":
                return (
                  <NumberQuestion
                    key={q.id}
                    questionId={q.id}
                    question={q.question}
                    value={answers[q.id] || ""}
                    onChange={handleChange}
                    required={q.required}
                    min={q.min}
                    max={q.max}
                    unit={q.unit}
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
          })();

          return (
            <div key={q.id}>
              {showSectionHeader && (
                <h3 className="mt-6 mb-3 border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">
                  {q.section}
                </h3>
              )}
              {q.precedingNotice && (
                <div className="mt-6 mb-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-medium text-gray-800 leading-relaxed">
                  {q.precedingNotice}
                </div>
              )}
              {questionNode}
            </div>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <div className="mt-6 flex gap-3">
        {pages.indexOf(currentPage) > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {t.prev}
          </button>
        )}
        {isLastPage ? (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex-[2] bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t.next}
          </button>
        )}
      </div>
    </form>
  );
}
