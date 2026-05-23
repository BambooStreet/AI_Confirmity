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

type Stage = 1 | 2 | 3 | 4 | 5;

const LIKERT_LABELS = [
  "매우 반대",
  "반대",
  "약간 반대",
  "중립",
  "약간 찬성",
  "찬성",
  "매우 찬성",
];

const QUIZ_HOLD_SECONDS = 15;

const QUIZ_Q1_QUESTION = "존엄사는 어떤 환자를 대상으로 하나요?";
const QUIZ_Q1_OPTIONS = [
  "회복 가능성이 없는 환자",
  "감기에 걸린 환자",
  "건강한 일반인",
];
const QUIZ_Q1_ANSWER = "회복 가능성이 없는 환자";

const QUIZ_Q2_QUESTION =
  "다음 중 소극적 존엄사(연명의료 중단)에 해당하는 것은 무엇인가요?";
const QUIZ_Q2_OPTIONS = [
  "인공호흡기 등 연명 치료를 중단하는 것",
  "건강한 사람의 운동을 중단하는 것",
  "병원의 일반 외래 진료를 받지 않는 것",
];
const QUIZ_Q2_ANSWER = "인공호흡기 등 연명 치료를 중단하는 것";

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
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2">
        {LIKERT_LABELS.map((label, idx) => {
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
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-800 mb-3">
        본인의 선택에 얼마나 확신하십니까?
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
        <span>1 = 전혀 확신 안 함</span>
        <span>7 = 매우 확신함</span>
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
      stanceForPreOpinion(preOpinion)
    );
  }, [commentCount, hasAiLabel, preOpinion]);

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

    const correct1 = quiz1Locked || quiz1 === QUIZ_Q1_ANSWER;
    const correct2 = quiz2Locked || quiz2 === QUIZ_Q2_ANSWER;

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
        quiz1 ?? QUIZ_Q1_ANSWER
      );
      await saveEuthanasiaResponse(
        participantId,
        "quiz_q2",
        quiz2 ?? QUIZ_Q2_ANSWER
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
        <h1 className="text-xl font-bold text-gray-900">본실험 2</h1>
        <span className="text-xs text-gray-500">단계 {stage} / 5</span>
      </div>

      {stage === 1 && (
        <section>
          {holdingRemaining !== null ? (
            <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <p className="font-semibold mb-1">
                오답이 있어요. 아래 설명을 다시 한 번 읽어주세요.
              </p>
              <p>
                {holdingRemaining}초 뒤에 자동으로 틀린 문항만 다시 출제됩니다.
              </p>
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
            <p className="text-sm text-gray-600 mb-4">
              아래 글을 읽고 이어지는 질문에 답해주세요.
            </p>
          )}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            존엄사란 무엇인가요?
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-3 mb-6">
            <p>
              <strong>존엄사(尊嚴死)</strong>는 회복 가능성이 없는 환자가 본인의
              의사에 따라 무의미한 연명 의료를 중단하거나, 의료진의 도움을 받아
              스스로 삶을 마무리하는 것을 말합니다.
            </p>
            <p>일반적으로 다음과 같이 구분됩니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>소극적 존엄사 (연명의료 중단)</strong>: 인공호흡기,
                심폐소생술 등 임종 과정을 연장하는 치료를 중단하는 것. 국내에서는
                2018년부터 「연명의료결정법」으로 제도화되어 있습니다.
              </li>
              <li>
                <strong>적극적 존엄사 (조력 존엄사)</strong>: 의료진이 환자의
                요청에 따라 약물 등으로 사망을 돕는 것. 국내에서는 아직 합법화되어
                있지 않으며, 최근 입법 논의가 진행 중입니다.
              </li>
            </ul>
            <p>
              찬성 측은 환자의 <strong>자기결정권</strong>과 고통 경감을 강조하고,
              반대 측은 <strong>생명 윤리</strong>, 악용 가능성, 의료진 부담 등을
              우려합니다.
            </p>
          </div>
          <button
            onClick={handleStage1Next}
            disabled={holdingRemaining !== null}
            className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {holdingRemaining !== null
              ? `${holdingRemaining}초 뒤 자동으로 진행`
              : "다음"}
          </button>
        </section>
      )}

      {stage === 2 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            확인 퀴즈
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {quiz1Locked || quiz2Locked
              ? "앞서 틀린 문항을 다시 풀어주세요. 모두 맞아야 다음으로 넘어갈 수 있습니다."
              : "앞 페이지의 설명을 바탕으로 두 문항 모두 정답을 골라주세요. 두 문항이 모두 맞아야 다음으로 넘어갈 수 있습니다."}
          </p>

          {!quiz1Locked && (
            <QuizQuestion
              label="1"
              question={QUIZ_Q1_QUESTION}
              options={QUIZ_Q1_OPTIONS}
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
              question={QUIZ_Q2_QUESTION}
              options={QUIZ_Q2_OPTIONS}
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
            제출
          </button>
        </section>
      )}

      {stage === 3 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            존엄사에 대한 본인의 의견을 선택해주세요.
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            <strong>존엄사 합법화</strong>에 대한 본인의 생각·의견과 가장 가까운
            것을 선택해주세요.
          </p>
          <LikertScale value={preOpinion} onChange={setPreOpinion} />
          {preOpinion !== null && (
            <ConfidenceScale
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
            {advancing ? "저장 중…" : "다음"}
          </button>
        </section>
      )}

      {stage === 4 && (
        <section>
          <RedditPost
            subreddit="ethicsdebate"
            postedBy="thinking_alone"
            postedAgo="6시간 전"
            title="존엄사 관련 쇼츠 봤는데… 다들 어떻게 생각함?"
            score={342}
            commentCount={comments.length}
          >
            <div className="mb-4 mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-md border border-gray-200 bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/3Ai462Sg7X0"
                title="존엄사 관련 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="space-y-3 text-gray-800 leading-relaxed">
              <p>
                얼마 전에 우연히 본 쇼츠 하나가 계속 머릿속에 남아서 같이
                이야기해보고 싶어 글 올려요.
              </p>
              <p>
                영상에서는 한 의사가 이런 이야기를 하더라고요. 말기 환자에게는
                평화로운 죽음을 선택할 권리가 있어야 한다고. 정신은 온전한데
                극심한 고통을 겪는 환자들을 곁에서 직접 봐왔고, 그래서 존엄하게
                죽음을 맞이할 권리를 지지한다고요.
              </p>
              <p>
                영상에서 그리는 &lsquo;존엄한 죽음&rsquo;의 모습은 이래요. 사랑하는
                사람들이 곁에 있고, 좋아하던 음악을 들으며, 함께 음식을 나누고
                추억을 이야기하다가 평화롭게 작별 인사를 하는 것.
              </p>
              <p>
                영상만 보면 &ldquo;당연히 그래야지&rdquo; 싶다가도, 막상 생각해보니
                단순하지 않더라고요.
              </p>
              <p>
                정말로 &lsquo;본인의 선택&rsquo;이라는 게 가능할까요? 가족에게
                부담 주기 싫어서, 치료비가 무서워서 선택하는 거라면 그것도
                자유의지일까?
              </p>
              <p>
                의사가 죽음을 돕는 게 의료의 본분과 충돌하지는 않을까?
              </p>
              <p>
                반대로, 회복 가능성이 전혀 없고 고통만 남은 상황에서
                &lsquo;살아라&rsquo;라고 하는 것이 더 잔인한 건 아닐까?
              </p>
              <p>
                만약 우리 가족, 혹은 내 일이라면 어떤 선택을 하게 될까?
              </p>
              <p className="font-medium text-gray-900">
                여러분은 어떻게 생각하세요? 찬성/반대 어느 쪽이든 이유가 궁금해요.
              </p>
            </div>
          </RedditPost>

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
              다음 단계로 넘어가려면 본인의 의견을 댓글로 남겨주세요.
            </p>
          )}

          <button
            onClick={handleStage4Next}
            disabled={!hasCommented}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </section>
      )}

      {stage === 5 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            다시 한 번 본인의 생각을 골라주세요
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            방금 댓글들을 보고 난 뒤, 존엄사 합법화에 대한 본인의 생각을 다시
            선택해주세요. 의견을 바꿔도 좋고, 그대로 유지해도 좋습니다.
          </p>
          <LikertScale value={finalOpinion} onChange={setFinalOpinion} />
          {finalOpinion !== null && (
            <ConfidenceScale
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
            {advancing ? "저장 중…" : "다음 (사후 설문)"}
          </button>
        </section>
      )}
    </PageWrapper>
  );
}
