"use client";

import ProgressBar from "./ProgressBar";
import type { Step } from "@/lib/session";

type PageWrapperProps = {
  currentStep: Step;
  children: React.ReactNode;
  showProgress?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl";
};

const maxWidthClasses = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function PageWrapper({
  currentStep,
  children,
  showProgress = true,
  maxWidth = "md",
}: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
        {showProgress && <ProgressBar currentStep={currentStep} />}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
