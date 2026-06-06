"use client";

import { likert7Labels } from "@/data/survey-questions";
import { likert7LabelsEn } from "@/data/survey-questions.en";
import { useLang } from "@/lib/useLang";

type LikertScaleProps = {
  questionId: string;
  question: string;
  value: string;
  onChange: (questionId: string, value: string) => void;
  required?: boolean;
};

export default function LikertScale({
  questionId,
  question,
  value,
  onChange,
  required = false,
}: LikertScaleProps) {
  const lang = useLang();
  const labels = lang === "en" ? likert7LabelsEn : likert7Labels;
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {labels.map((label, index) => {
          const score = String(index + 1);
          const selected = value === score;
          return (
            <label
              key={index}
              className={`flex flex-col items-center gap-2 rounded-lg border px-1 py-2 text-xs cursor-pointer transition-colors ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name={questionId}
                value={score}
                checked={selected}
                onChange={() => onChange(questionId, score)}
                className="sr-only"
              />
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {index + 1}
              </span>
              <span className="text-center leading-tight text-gray-600">
                {label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
