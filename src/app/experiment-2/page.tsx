"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import RedditPost from "@/components/community/RedditPost";
import RedditCommentList from "@/components/community/RedditCommentList";
import {
  getCommentsForCondition,
  stanceForPreOpinion,
  type PresetComment,
} from "@/data/comments";
import { useExperimentSession } from "@/lib/useExperimentSession";
import { useLang } from "@/lib/useLang";
import { EXP2_CONTENT } from "./content";

type Stage = 1 | 2 | 3 | 4 | 5;

const QUIZ_HOLD_SECONDS = 10;

async function saveEuthanasiaResponse(
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
        surveyType: "euthanasia",
        answers: { [questionId]: answer },
      }),
    });
  } catch {
    // 네트워크 실패 시에도 클라이언트 흐름은 계속 진행
  }
}

function LikertScale({
  labels,
  value,
  onChange,
}: {
  labels: readonly string[];
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2">
        {labels.map((label, idx) => {
          const score = idx + 1;
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              className={`flex flex-col items-center gap-2 rounded-lg border px-2 py-3 text-xs transition-colors ${
                selected
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {score}
              </span>
              <span className="text-center leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConfidenceScale({
  question,
  lowLabel,
  highLabel,
  value,
  onChange,
}: {
  question: string;
  lowLabel: string;
  highLabel: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-800 mb-3">{question}</p>
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
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

function QuizQuestion({
  label,
  question,
  options,
  value,
  onChange,
}: {
  label: string;
  question: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-800 mb-2">
        <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
          {label}
        </span>
        {question}
      </p>
      <div className="space-y-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`block w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                selected
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ExperimentTwoPage() {
  const router = useRouter();
  const lang = useLang();
  const c = EXP2_CONTENT[lang];
  const { participantId, commentCount, hasAiLabel, isReady } =
    useExperimentSession();

  const [stage, setStage] = useState<Stage>(1);
  const [preOpinion, setPreOpinion] = useState<number | null>(null);
  const [preOpinionConfidence, setPreOpinionConfidence] = useState<number | null>(
    null
  );
  const [finalOpinion, setFinalOpinion] = useState<number | null>(null);
  const [finalOpinionConfidence, setFinalOpinionConfidence] = useState<
    number | null
  >(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  // Quiz state
  const [quiz1, setQuiz1] = useState<string | null>(null);
  const [quiz2, setQuiz2] = useState<string | null>(null);
  const [quiz1Locked, setQuiz1Locked] = useState(false);
  const [quiz2Locked, setQuiz2Locked] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [holdingRemaining, setHoldingRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (stage !== 1 || holdingRemaining === null) return;
    if (holdingRemaining <= 0) {
      setHoldingRemaining(null);
      setStage(2);
      return;
    }
    const t = setTimeout(
      () => setHoldingRemaining((r) => (r === null ? null : r - 1)),
      1000
    );
    return () => clearTimeout(t);
  }, [stage, holdingRemaining]);

  const comments: PresetComment[] = useMemo(() => {
    if (preOpinion === null) return [];
    return getCommentsForCondition(
      commentCount,
      hasAiLabel,
      stanceForPreOpinion(preOpinion),
      lang
    );
  }, [commentCount, hasAiLabel, preOpinion, lang]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const handleStage1Next = () => {
    if (holdingRemaining !== null) return;
    setStage(2);
  };

  const handleQuizSubmit = async () => {
    if (advancing) return;
    if (!quiz1Locked && !quiz1) return;
    if (!quiz2Locked && !quiz2) return;

    const nextAttempts = quizAttempts + 1;
    setQuizAttempts(nextAttempts);

    const correct1 = quiz1Locked || quiz1 === c.q1.answer;
    const correct2 = quiz2Locked || quiz2 === c.q2.answer;

    if (!correct1 || !correct2) {
      if (!quiz1Locked) {
        if (correct1) setQuiz1Locked(true);
        else setQuiz1(null);
      }
      if (!quiz2Locked) {
        if (correct2) setQuiz2Locked(true);
        else setQuiz2(null);
      }
      setQuizFeedback(null);
      setHoldingRemaining(QUIZ_HOLD_SECONDS);
      setStage(1);
      return;
    }

    setQuizFeedback(null);
    if (participantId) {
      await saveEuthanasiaResponse(
        participantId,
        "quiz_q1",
        quiz1 ?? c.q1.answer
      );
      await saveEuthanasiaResponse(
        participantId,
        "quiz_q2",
        quiz2 ?? c.q2.answer
      );
      await saveEuthanasiaResponse(
        participantId,
        "quiz_attempts",
        String(nextAttempts)
      );
    }
    setStage(3);
  };

  const handleStage3Next = async () => {
    if (preOpinion === null || preOpinionConfidence === null || advancing) return;
    setAdvancing(true);
    if (participantId) {
      await saveEuthanasiaResponse(
        participantId,
        "pre_opinion",
        String(preOpinion)
      );
      await saveEuthanasiaResponse(
        participantId,
        "pre_opinion_confidence",
        String(preOpinionConfidence)
      );
    }
    setStage(4);
    setAdvancing(false);
  };

  const handleStage4Next = () => {
    if (!hasCommented) return;
    setStage(5);
  };

  const handleStage5Next = async () => {
    if (finalOpinion === null || finalOpinionConfidence === null || advancing)
      return;
    setAdvancing(true);
    if (participantId) {
      await saveEuthanasiaResponse(
        participantId,
        "final_opinion",
        String(finalOpinion)
      );
      await saveEuthanasiaResponse(
        participantId,
        "final_opinion_confidence",
        String(finalOpinionConfidence)
      );
      if (preOpinion !== null) {
        await saveEuthanasiaResponse(
          participantId,
          "opinion_shift",
          String(finalOpinion - preOpinion)
        );
      }
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
        <h1 className="text-xl font-bold text-gray-900">{c.title}</h1>
        <span className="text-xs text-gray-500">{c.stageIndicator(stage)}</span>
      </div>

      {stage === 1 && (
        <section>
          {holdingRemaining !== null ? (
            <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <p className="font-semibold mb-1">{c.wrongTitle}</p>
              <p>{c.wrongCountdown(holdingRemaining)}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-amber-100">
                <div
                  className="h-full bg-amber-500 transition-all duration-1000 ease-linear"
                  style={{
                    width: `${
                      ((QUIZ_HOLD_SECONDS - holdingRemaining) /
                        QUIZ_HOLD_SECONDS) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-4">{c.readIntro}</p>
          )}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {c.defTitle}
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-3 mb-6">
            {c.defBody}
          </div>
          <button
            onClick={handleStage1Next}
            disabled={holdingRemaining !== null}
            className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {holdingRemaining !== null
              ? c.autoAdvance(holdingRemaining)
              : c.next}
          </button>
        </section>
      )}

      {stage === 2 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.quizTitle}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {quiz1Locked || quiz2Locked ? c.quizDescRetry : c.quizDescFirst}
          </p>

          {!quiz1Locked && (
            <QuizQuestion
              label="1"
              question={c.q1.question}
              options={c.q1.options}
              value={quiz1}
              onChange={(v) => {
                setQuiz1(v);
                setQuizFeedback(null);
              }}
            />
          )}
          {!quiz2Locked && (
            <QuizQuestion
              label={quiz1Locked ? "1" : "2"}
              question={c.q2.question}
              options={c.q2.options}
              value={quiz2}
              onChange={(v) => {
                setQuiz2(v);
                setQuizFeedback(null);
              }}
            />
          )}

          {quizFeedback && (
            <p className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              {quizFeedback}
            </p>
          )}

          <button
            onClick={handleQuizSubmit}
            disabled={
              advancing ||
              (!quiz1Locked && !quiz1) ||
              (!quiz2Locked && !quiz2)
            }
            className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {c.submit}
          </button>
        </section>
      )}

      {stage === 3 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.stage3Title}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{c.stage3Desc}</p>
          <LikertScale
            labels={c.likertLabels}
            value={preOpinion}
            onChange={setPreOpinion}
          />
          {preOpinion !== null && (
            <ConfidenceScale
              question={c.confidenceQuestion}
              lowLabel={c.confidenceLow}
              highLabel={c.confidenceHigh}
              value={preOpinionConfidence}
              onChange={setPreOpinionConfidence}
            />
          )}
          <button
            onClick={handleStage3Next}
            disabled={
              preOpinion === null ||
              preOpinionConfidence === null ||
              advancing
            }
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? c.saving : c.next}
          </button>
        </section>
      )}

      {stage === 4 && (
        <section>
          <RedditPost
            subreddit="ethicsdebate"
            postedBy="thinking_alone"
            postedAgo={c.postedAgo}
            title={c.postTitle}
            score={342}
            commentCount={comments.length}
          >
            <div className="mb-4 mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-md border border-gray-200 bg-black">
              <iframe
                className="h-full w-full"
                src={c.videoSrc}
                title={c.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="space-y-3 text-gray-800 leading-relaxed">
              {c.postBody}
            </div>
          </RedditPost>

          <RedditCommentList
            presetComments={comments}
            showAiLabel={hasAiLabel}
            participantId={participantId}
            inputPlaceholder={c.inputPlaceholder}
            inputButtonLabel="Comment"
            inputMinWords={lang === "en" ? 5 : 1}
            onUserCommentSubmitted={() => setHasCommented(true)}
          />

          {!hasCommented && (
            <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              {c.mustComment}
            </p>
          )}

          <button
            onClick={handleStage4Next}
            disabled={!hasCommented}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {c.next}
          </button>
        </section>
      )}

      {stage === 5 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.stage5Title}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{c.stage5Desc}</p>
          <LikertScale
            labels={c.likertLabels}
            value={finalOpinion}
            onChange={setFinalOpinion}
          />
          {finalOpinion !== null && (
            <ConfidenceScale
              question={c.confidenceQuestion}
              lowLabel={c.confidenceLow}
              highLabel={c.confidenceHigh}
              value={finalOpinionConfidence}
              onChange={setFinalOpinionConfidence}
            />
          )}
          <button
            onClick={handleStage5Next}
            disabled={
              finalOpinion === null ||
              finalOpinionConfidence === null ||
              advancing
            }
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? c.saving : c.nextToSurvey}
          </button>
        </section>
      )}
    </PageWrapper>
  );
}
