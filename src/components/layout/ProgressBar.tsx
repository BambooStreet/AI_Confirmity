"use client";

import { STEPS, type Step } from "@/lib/session";

const STEP_LABELS: Record<Step, string> = {
  consent: "동의",
  "pre-survey": "사전 설문",
  instruction: "실험 안내",
  experiment: "본실험1",
  "experiment-2": "본실험2",
  "post-survey": "사후 설문",
  debrief: "완료",
};

export default function ProgressBar({ currentStep }: { currentStep: Step }) {
  const currentIndex = STEPS.indexOf(currentStep);
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {STEPS.map((step, index) => (
          <span
            key={step}
            className={`text-xs ${
              index <= currentIndex
                ? "text-blue-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            {STEP_LABELS[step]}
          </span>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
