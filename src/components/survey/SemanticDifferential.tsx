"use client";

type SemanticDifferentialProps = {
  questionId: string;
  question: string;
  leftLabel: string;
  rightLabel: string;
  value: string;
  onChange: (questionId: string, value: string) => void;
  required?: boolean;
};

export default function SemanticDifferential({
  questionId,
  question,
  leftLabel,
  rightLabel,
  value,
  onChange,
  required = false,
}: SemanticDifferentialProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-600 text-right w-20 shrink-0">
          {leftLabel}
        </span>
        <div className="grid flex-1 grid-cols-7 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((score) => {
            const selected = value === String(score);
            return (
              <label
                key={score}
                className={`flex flex-col items-center gap-1 rounded-lg border py-2 cursor-pointer transition-colors ${
                  selected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={questionId}
                  value={String(score)}
                  checked={selected}
                  onChange={() => onChange(questionId, String(score))}
                  className="sr-only"
                />
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    selected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {score}
                </span>
              </label>
            );
          })}
        </div>
        <span className="text-xs text-gray-600 w-20 shrink-0">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}
