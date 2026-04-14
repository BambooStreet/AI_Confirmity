"use client";

import { likertLabels } from "@/data/survey-questions";

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
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="flex justify-between gap-2">
        {likertLabels.map((label, index) => (
          <label
            key={index}
            className="flex flex-col items-center gap-1 cursor-pointer flex-1"
          >
            <input
              type="radio"
              name={questionId}
              value={String(index + 1)}
              checked={value === String(index + 1)}
              onChange={() => onChange(questionId, String(index + 1))}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-xs text-gray-500 text-center">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
