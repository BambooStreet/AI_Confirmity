"use client";

import { STEPS, type Step } from "@/lib/session";
import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";

export default function ProgressBar({ currentStep }: { currentStep: Step }) {
  const lang = useLang();
  const stepLabels = UI[lang].steps;
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
            {stepLabels[step]}
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
