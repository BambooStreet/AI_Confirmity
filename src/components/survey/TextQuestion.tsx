"use client";

type TextQuestionProps = {
  questionId: string;
  question: string;
  value: string;
  onChange: (questionId: string, value: string) => void;
  required?: boolean;
};

export default function TextQuestion({
  questionId,
  question,
  value,
  onChange,
  required = false,
}: TextQuestionProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(questionId, e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
        placeholder="자유롭게 작성해주세요..."
      />
    </div>
  );
}
