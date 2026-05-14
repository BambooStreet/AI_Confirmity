"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import AschStimulus, {
  ASCH_LABELS,
  ASCH_CORRECT_ANSWER,
  type AschLineLabel,
} from "@/components/experiment/AschStimulus";
import RedditPost from "@/components/community/RedditPost";
import RedditCommentList from "@/components/community/RedditCommentList";
import { buildAschComments, computeAiClaim } from "@/data/asch-comments";
import { useExperimentSession } from "@/lib/useExperimentSession";

type Stage = 1 | 2 | 3 | 4;

async function saveAschResponse(
  participantId: string,
  questionId: string,
  answer: string
) {
  try {
    await fetch("/api/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participantId,
        surveyType: "asch",
        answers: { [questionId]: answer },
      }),
    });
  } catch {
    // 네트워크 실패 시에도 클라이언트 흐름은 계속 진행
  }
}

export default function ExperimentPage() {
  const router = useRouter();
  const { participantId, commentCount, hasAiLabel, isReady } =
    useExperimentSession();

  const [stage, setStage] = useState<Stage>(1);
  const [initialChoice, setInitialChoice] = useState<AschLineLabel | null>(null);
  const [stageSelection, setStageSelection] = useState<AschLineLabel | null>(null);
  const [aiClaim, setAiClaim] = useState<AschLineLabel | null>(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  const aschComments = useMemo(
    () => (aiClaim ? buildAschComments(commentCount, aiClaim, hasAiLabel) : []),
    [aiClaim, commentCount, hasAiLabel]
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
    if (!stageSelection || advancing) return;
    setAdvancing(true);
    const choice = stageSelection;
    const claim = computeAiClaim(choice);
    setInitialChoice(choice);
    setAiClaim(claim);
    if (participantId) {
      await saveAschResponse(participantId, "initial_choice", choice);
      await saveAschResponse(participantId, "ai_claim", claim);
      await saveAschResponse(
        participantId,
        "correct_answer",
        ASCH_CORRECT_ANSWER
      );
    }
    setStageSelection(null);
    setStage(3);
    setAdvancing(false);
  };

  const handleStage3Next = () => {
    if (!hasCommented) return;
    setStage(4);
  };

  const handleStage4Next = async () => {
    if (!stageSelection || advancing) return;
    setAdvancing(true);
    const final = stageSelection;
    if (participantId) {
      await saveAschResponse(participantId, "final_choice", final);
      const conformed =
        aiClaim && initialChoice && final === aiClaim && initialChoice !== aiClaim;
      await saveAschResponse(
        participantId,
        "conformed",
        conformed ? "true" : "false"
      );
      await fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, currentStep: 4 }),
      });
    }
    router.push("/experiment-2");
  };

  return (
    <PageWrapper currentStep="experiment" maxWidth="lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">본실험 1</h1>
        <span className="text-xs text-gray-500">
          단계 {stage} / 4
        </span>
      </div>

      {stage === 1 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            아래 선분들을 살펴보세요
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            기준 선분(★)과 비교 선분(A·B·C)을 충분히 비교해보세요. 다음 단계에서 답을
            선택하게 됩니다.
          </p>
          <AschStimulus />
          <button
            onClick={handleStage1Next}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            다음
          </button>
        </section>
      )}

      {stage === 2 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            기준 선분(★)과 길이가 같은 비교 선분은 무엇인가요?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            A·B·C 중 기준선과 가장 가까운 길이의 선분을 하나 골라주세요.
          </p>
          <AschStimulus
            selectable
            selected={stageSelection}
            onSelect={setStageSelection}
          />
          <button
            onClick={handleStage2Next}
            disabled={!stageSelection || advancing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? "저장 중…" : "다음"}
          </button>
        </section>
      )}

      {stage === 3 && aiClaim && (
        <section>
          <RedditPost
            subreddit="visualperception"
            postedBy="line_check_bot"
            postedAgo="30분 전"
            title="이 선분 길이 비교, 기준선과 같은 게 어느 거예요? (A/B/C)"
            score={128}
            commentCount={aschComments.length}
          >
            <p className="mb-4 text-gray-700">
              기준선과 같은 길이의 비교선이 뭔지 의견 좀 모아봅시다. 댓글로 본인
              답이랑 이유 같이 남겨주세요.
            </p>
            <AschStimulus />
          </RedditPost>

          <RedditCommentList
            presetComments={aschComments}
            showAiLabel={hasAiLabel}
            participantId={participantId}
            inputPlaceholder="본인 답과 이유를 자유롭게 적어주세요…"
            inputButtonLabel="Comment"
            onUserCommentSubmitted={() => setHasCommented(true)}
          />

          {!hasCommented && (
            <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              다음 단계로 넘어가려면 본인의 의견을 댓글로 남겨주세요.
            </p>
          )}

          <button
            onClick={handleStage3Next}
            disabled={!hasCommented}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </section>
      )}

      {stage === 4 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            다시 한 번 골라주세요
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            방금 댓글들을 보고 난 뒤, 기준 선분(★)과 길이가 같은 비교 선분을 다시
            선택해주세요. 의견을 바꿔도 좋고, 그대로 유지해도 좋습니다.
          </p>
          <AschStimulus
            selectable
            selected={stageSelection}
            onSelect={setStageSelection}
          />
          <button
            onClick={handleStage4Next}
            disabled={!stageSelection || advancing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? "저장 중…" : "다음 (본실험2)"}
          </button>
          {/* keep labels referenced for type completeness */}
          <span className="hidden" aria-hidden>
            {ASCH_LABELS.join(",")}
          </span>
        </section>
      )}
    </PageWrapper>
  );
}
