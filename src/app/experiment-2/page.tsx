"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import RedditPost from "@/components/community/RedditPost";
import RedditCommentList from "@/components/community/RedditCommentList";
import { getCommentsForCondition, type PresetComment } from "@/data/comments";
import { useExperimentSession } from "@/lib/useExperimentSession";

type Stage = 1 | 2;

export default function ExperimentTwoPage() {
  const router = useRouter();
  const { participantId, commentCount, hasAiLabel, isReady } =
    useExperimentSession();

  const [stage, setStage] = useState<Stage>(1);
  const [hasCommented, setHasCommented] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  const comments: PresetComment[] = useMemo(
    () => getCommentsForCondition(commentCount, hasAiLabel),
    [commentCount, hasAiLabel]
  );

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const handleStage1Next = () => setStage(2);

  const handleStage2Next = async () => {
    if (!hasCommented || advancing) return;
    setAdvancing(true);
    if (participantId) {
      await fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, currentStep: 5 }),
      });
    }
    router.push("/post-survey");
  };

  return (
    <PageWrapper currentStep="experiment-2" maxWidth="lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">본실험 2</h1>
        <span className="text-xs text-gray-500">단계 {stage} / 2</span>
      </div>

      <RedditPost
        subreddit="ethicsdebate"
        postedBy="thinking_alone"
        postedAgo="6시간 전"
        title="존엄사 합법화, 어떻게 생각하세요?"
        score={342}
        commentCount={comments.length}
      >
        <p className="mb-2 text-gray-700">
          최근 존엄사(조력 존엄사) 합법화 논의가 다시 떠오르고 있어요. 환자
          본인의 자기결정권을 존중해야 한다는 의견과, 생명 윤리·악용 가능성을
          우려하는 의견이 팽팽하게 맞서고 있습니다.
        </p>
        <p className="text-gray-700">
          여러분 생각은 어떠신지 댓글로 솔직하게 의견 부탁드려요. 의료/법조/돌봄
          현장 경험 있으신 분 의견도 환영합니다.
        </p>
      </RedditPost>

      {stage === 1 && (
        <>
          <RedditCommentList
            presetComments={comments}
            showAiLabel={hasAiLabel}
            participantId={participantId}
            showInput={false}
          />
          <p className="mt-6 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
            댓글들을 충분히 읽어보신 뒤 다음 단계에서 본인의 의견을 작성하게
            됩니다.
          </p>
          <button
            onClick={handleStage1Next}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            다음 (의견 작성)
          </button>
        </>
      )}

      {stage === 2 && (
        <>
          <RedditCommentList
            presetComments={comments}
            showAiLabel={hasAiLabel}
            participantId={participantId}
            inputPlaceholder="존엄사 합법화에 대한 본인의 의견을 자유롭게 적어주세요…"
            inputButtonLabel="Comment"
            onUserCommentSubmitted={() => setHasCommented(true)}
          />

          {!hasCommented && (
            <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              본인의 의견을 댓글로 작성한 뒤 다음으로 넘어갈 수 있습니다.
            </p>
          )}

          <button
            onClick={handleStage2Next}
            disabled={!hasCommented || advancing}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? "저장 중…" : "다음 (사후 설문)"}
          </button>
        </>
      )}
    </PageWrapper>
  );
}
