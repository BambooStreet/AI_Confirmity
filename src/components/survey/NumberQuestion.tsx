"use client";

type NumberQuestionProps = {
  questionId: string;
  question: string;
  value: string;
  onChange: (questionId: string, value: string) => void;
  required?: boolean;
  min?: number;
  max?: number;
  unit?: string;
};

export default function NumberQuestion({
  questionId,
  question,
  value,
  onChange,
  required = false,
  min,
  max,
  unit,
}: NumberQuestionProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(questionId, e.target.value)}
          className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder={
            min !== undefined && max !== undefined ? `${min}-${max}` : ""
          }
        />
        {unit && <span className="text-sm text-gray-600">{unit}</span>}
      </div>
    </div>
  );
}
