"use client";

type MultipleChoiceProps = {
  questionId: string;
  question: string;
  options: string[];
  value: string;
  onChange: (questionId: string, value: string) => void;
  required?: boolean;
};

export default function MultipleChoice({
  questionId,
  question,
  options,
  value,
  onChange,
  required = false,
}: MultipleChoiceProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="radio"
              name={questionId}
              value={option}
              checked={value === option}
              onChange={() => onChange(questionId, option)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
