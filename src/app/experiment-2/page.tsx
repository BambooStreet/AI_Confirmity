"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import CircleComparison from "@/components/experiment/CircleComparison";
import CommentSection from "@/components/experiment/CommentSection";
import { getCircleCommentsForCondition } from "@/data/circle-comments";
import type { PresetComment } from "@/data/comments";
import { parseCondition } from "@/lib/conditions";

export default function ExperimentTwoPage() {
  const router = useRouter();
  const [participantId, setParticipantId] = useState<string>("");
  const [comments, setComments] = useState<PresetComment[]>([]);
  const [showAiLabel, setShowAiLabel] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);

  useEffect(() => {
    const pid = localStorage.getItem("participantId") || "";
    const condition = localStorage.getItem("condition") || "";
    setParticipantId(pid);

    const parsed = parseCondition(condition);
    if (parsed) {
      setComments(
        getCircleCommentsForCondition(parsed.commentCount, parsed.hasAiLabel)
      );
      setShowAiLabel(parsed.hasAiLabel);
    }
    setLoaded(true);
  }, []);

  const handleNext = async () => {
    if (participantId) {
      await fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, currentStep: 5 }),
      });
    }
    router.push("/post-survey");
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <PageWrapper currentStep="experiment-2" maxWidth="lg">
      <CircleComparison />
      <CommentSection
        presetComments={comments}
        showAiLabel={showAiLabel}
        participantId={participantId}
        onUserCommentSubmitted={() => setHasCommented(true)}
      />

      {!hasCommented && (
        <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          다음 단계로 넘어가려면 본인의 의견을 댓글로 작성해주세요.
        </p>
      )}

      <button
        onClick={handleNext}
        disabled={!hasCommented}
        className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        다음 (사후 설문)
      </button>
    </PageWrapper>
  );
}
