"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useLang } from "@/lib/useLang";

type Stage = 1 | 2 | 3 | 4;

const CONTENT = {
  ko: {
    title: "본실험 1",
    stageIndicator: (stage: Stage) => `단계 ${stage} / 4`,
    stage1Title: "기준 선분을 잘 기억해주세요",
    stage1Desc: (sec: number) => `${sec}초 뒤 자동으로 다음 단계로 넘어갑니다.`,
    stage2Title: "방금 본 기준 선분(★)과 길이가 같은 비교 선분은 무엇인가요?",
    stage2Desc: "A·B·C 중 기준선과 가장 가까운 길이의 선분을 하나 골라주세요.",
    confidenceQuestion: "본인의 선택에 얼마나 확신하십니까?",
    confidenceLow: "1 = 전혀 확신 안 함",
    confidenceHigh: "7 = 매우 확신함",
    saving: "저장 중…",
    next: "다음",
    postedAgo: "30분 전",
    postTitle: "이 선분 길이 비교, 기준선과 같은 게 어느 거예요? (A/B/C)",
    postBodyIntro: (
      <>
        앞서 보여드린 <strong>기준 선분(★)</strong>과 같은 길이의 비교선이 뭔지
        의견 좀 모아봅시다. 댓글로 본인 답이랑 이유 같이 남겨주세요.
      </>
    ),
    postNotice:
      "※ '기준 선분'은 단계 1에서 잠깐 보여드렸던 ★ 표시의 선분을 말합니다. 그 선분과 길이가 같은 비교선(A·B·C)을 찾아주세요.",
    inputPlaceholder: "본인 답과 이유를 자유롭게 적어주세요…",
    mustComment: "다음 단계로 넘어가려면 본인의 의견을 댓글로 남겨주세요.",
    stage4Title: "다시 한 번 골라주세요",
    stage4Desc:
      "방금 댓글들을 보고 난 뒤, 처음에 본 기준 선분(★)과 길이가 같은 비교 선분을 다시 선택해주세요. 의견을 바꿔도 좋고, 그대로 유지해도 좋습니다.",
    nextToExp2: "다음 (본실험2)",
  },
  en: {
    title: "Task 1",
    stageIndicator: (stage: Stage) => `Step ${stage} / 4`,
    stage1Title: "Memorize the reference line",
    stage1Desc: (sec: number) =>
      `Moving to the next step automatically in ${sec}s.`,
    stage2Title:
      "Which comparison line is the same length as the reference line (★) you just saw?",
    stage2Desc:
      "Choose the one line among A, B, and C closest in length to the reference line.",
    confidenceQuestion: "How confident are you in your choice?",
    confidenceLow: "1 = Not confident at all",
    confidenceHigh: "7 = Extremely confident",
    saving: "Saving…",
    next: "Next",
    postedAgo: "30m ago",
    postTitle:
      "Line length comparison — which one matches the reference line? (A/B/C)",
    postBodyIntro: (
      <>
        Let&apos;s gather opinions on which comparison line is the same length
        as the <strong>reference line (★)</strong> shown earlier. Leave a
        comment with your answer and reasoning.
      </>
    ),
    postNotice:
      "※ The 'reference line' is the ★-marked line briefly shown in Step 1. Find the comparison line (A, B, or C) that matches its length.",
    inputPlaceholder: "Share your answer and reasoning freely…",
    mustComment: "Leave a comment with your opinion to move on to the next step.",
    stage4Title: "Choose once more",
    stage4Desc:
      "Now that you have seen the comments, select again the comparison line that matches the reference line (★) you saw at the beginning. You may change your answer or keep it the same.",
    nextToExp2: "Next (Task 2)",
  },
} as const;

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

function ConfidenceScale({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const lang = useLang();
  const c = CONTENT[lang];
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-800 mb-3">
        {c.confidenceQuestion}
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((score) => {
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              className={`flex h-9 items-center justify-center rounded-md border text-sm font-semibold transition-colors ${
                selected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {score}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-gray-500">
        <span>{c.confidenceLow}</span>
        <span>{c.confidenceHigh}</span>
      </div>
    </div>
  );
}

export default function ExperimentPage() {
  const router = useRouter();
  const lang = useLang();
  const c = CONTENT[lang];
  const { participantId, commentCount, hasAiLabel, isReady } =
    useExperimentSession();

  const STAGE1_SECONDS = 3;
  const [stage, setStage] = useState<Stage>(1);
  const [initialChoice, setInitialChoice] = useState<AschLineLabel | null>(null);
  const [stageSelection, setStageSelection] = useState<AschLineLabel | null>(null);
  const [aiClaim, setAiClaim] = useState<AschLineLabel | null>(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [stage1Remaining, setStage1Remaining] = useState(STAGE1_SECONDS);
  const [preConfidence, setPreConfidence] = useState<number | null>(null);
  const [finalConfidence, setFinalConfidence] = useState<number | null>(null);

  // 단계 1: 기준 선분 STAGE1_SECONDS초 노출 후 자동으로 단계 2로 이동
  useEffect(() => {
    if (stage !== 1) return;
    if (stage1Remaining <= 0) {
      setStage(2);
      return;
    }
    const t = setTimeout(() => setStage1Remaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, stage1Remaining]);

  const aschComments = useMemo(
    () =>
      aiClaim ? buildAschComments(commentCount, aiClaim, hasAiLabel, lang) : [],
    [aiClaim, commentCount, hasAiLabel, lang]
  );

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const handleStage2Next = async () => {
    if (!stageSelection || preConfidence === null || advancing) return;
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
      await saveAschResponse(
        participantId,
        "pre_confidence",
        String(preConfidence)
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
    if (!stageSelection || finalConfidence === null || advancing) return;
    setAdvancing(true);
    const final = stageSelection;
    if (participantId) {
      await saveAschResponse(participantId, "final_choice", final);
      await saveAschResponse(
        participantId,
        "final_confidence",
        String(finalConfidence)
      );
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
        <h1 className="text-xl font-bold text-gray-900">{c.title}</h1>
        <span className="text-xs text-gray-500">{c.stageIndicator(stage)}</span>
      </div>

      {stage === 1 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.stage1Title}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {c.stage1Desc(stage1Remaining)}
          </p>
          <AschStimulus variant="reference" />
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
              style={{
                width: `${
                  ((STAGE1_SECONDS - stage1Remaining) / STAGE1_SECONDS) * 100
                }%`,
              }}
            />
          </div>
        </section>
      )}

      {stage === 2 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.stage2Title}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{c.stage2Desc}</p>
          <AschStimulus
            variant="comparison"
            selectable
            selected={stageSelection}
            onSelect={setStageSelection}
          />
          {stageSelection && (
            <ConfidenceScale
              value={preConfidence}
              onChange={setPreConfidence}
            />
          )}
          <button
            onClick={handleStage2Next}
            disabled={!stageSelection || preConfidence === null || advancing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? c.saving : c.next}
          </button>
        </section>
      )}

      {stage === 3 && aiClaim && (
        <section>
          <RedditPost
            subreddit="visualperception"
            postedBy="line_check_bot"
            postedAgo={c.postedAgo}
            title={c.postTitle}
            score={128}
            commentCount={aschComments.length}
          >
            <p className="mb-4 text-gray-700">{c.postBodyIntro}</p>
            <p className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
              {c.postNotice}
            </p>
            <AschStimulus variant="comparison" />
          </RedditPost>

          <RedditCommentList
            presetComments={aschComments}
            showAiLabel={hasAiLabel}
            participantId={participantId}
            inputPlaceholder={c.inputPlaceholder}
            inputButtonLabel="Comment"
            onUserCommentSubmitted={() => setHasCommented(true)}
          />

          {!hasCommented && (
            <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              {c.mustComment}
            </p>
          )}

          <button
            onClick={handleStage3Next}
            disabled={!hasCommented}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {c.next}
          </button>
        </section>
      )}

      {stage === 4 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.stage4Title}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{c.stage4Desc}</p>
          <AschStimulus
            variant="comparison"
            selectable
            selected={stageSelection}
            onSelect={setStageSelection}
          />
          {stageSelection && (
            <ConfidenceScale
              value={finalConfidence}
              onChange={setFinalConfidence}
            />
          )}
          <button
            onClick={handleStage4Next}
            disabled={!stageSelection || finalConfidence === null || advancing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? c.saving : c.nextToExp2}
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
