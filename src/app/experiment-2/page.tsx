"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import RedditPost from "@/components/community/RedditPost";
import RedditCommentList from "@/components/community/RedditCommentList";
import { getCommentsForCondition, type PresetComment } from "@/data/comments";
import { useExperimentSession } from "@/lib/useExperimentSession";

type Stage = 1 | 2 | 3 | 4;

const LIKERT_LABELS = [
  "매우 반대",
  "반대",
  "약간 반대",
  "중립",
  "약간 찬성",
  "찬성",
  "매우 찬성",
];

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

export default function ExperimentTwoPage() {
  const router = useRouter();
  const { participantId, commentCount, hasAiLabel, isReady } =
    useExperimentSession();

  const [stage, setStage] = useState<Stage>(1);
  const [preOpinion, setPreOpinion] = useState<number | null>(null);
  const [finalOpinion, setFinalOpinion] = useState<number | null>(null);
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
    if (preOpinion === null || advancing) return;
    setAdvancing(true);
    if (participantId) {
      await saveEuthanasiaResponse(
        participantId,
        "pre_opinion",
        String(preOpinion)
      );
    }
    setStage(3);
    setAdvancing(false);
  };

  const handleStage3Next = () => {
    if (!hasCommented) return;
    setStage(4);
  };

  const handleStage4Next = async () => {
    if (finalOpinion === null || advancing) return;
    setAdvancing(true);
    if (participantId) {
      await saveEuthanasiaResponse(
        participantId,
        "final_opinion",
        String(finalOpinion)
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
        <span className="text-xs text-gray-500">단계 {stage} / 4</span>
      </div>

      {stage === 1 && (
        <section>
          <p className="text-sm text-gray-600 mb-4">
            아래 글을 읽고 이어지는 질문에 답해주세요.
          </p>
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
            className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            다음
          </button>
        </section>
      )}

      {stage === 2 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            평소 본인의 생각은 어떠신가요?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            <strong>조력 존엄사(적극적 존엄사) 합법화</strong>에 대해 평소
            본인이 어떻게 생각해왔는지 가장 가까운 것을 선택해주세요.
          </p>
          <LikertScale value={preOpinion} onChange={setPreOpinion} />
          <button
            onClick={handleStage2Next}
            disabled={preOpinion === null || advancing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? "저장 중…" : "다음"}
          </button>
        </section>
      )}

      {stage === 3 && (
        <section>
          <RedditPost
            subreddit="ethicsdebate"
            postedBy="thinking_alone"
            postedAgo="6시간 전"
            title="Brittany Maynard 영상 봤는데… 존엄사에 대해 다들 어떻게 생각함?"
            score={342}
            commentCount={comments.length}
          >
            <div className="mb-4 aspect-video w-full overflow-hidden rounded-md border border-gray-200 bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/yPfe3rCcUeQ"
                title="Brittany Maynard"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="space-y-3 text-gray-800 leading-relaxed">
              <p>
                Brittany Maynard라고, 2014년에 미국에서 엄청 화제된 사람임. 결혼한
                지 1년 좀 넘은 29살 신혼이었는데 어느 날 뇌종양 진단받음. 그것도
                4등급 교모세포종, 시한부 6개월.
              </p>
              <p>
                근데 이 사람이 한 선택이 좀 충격적임. 호스피스 가서 발작이랑
                두통 점점 심해지면서 의식 흐려져 죽느니, 정신 멀쩡할 때 가족들
                옆에서 의사 처방받은 약 먹고 가겠다고 함. 문제는 캘리포니아엔
                그런 법이 없어서 일부러 오리건주로 이사까지 함.
              </p>
              <p>
                영상에서 본인이 직접 말함. &quot;나는 자살하고 싶은 게 아니다.
                살고 싶지만 그게 불가능하다. 어떻게 죽을지는 내가 정하고 싶다&quot;고.
              </p>
              <p>
                남편이랑 그랜드캐니언 가는 장면, 강아지랑 노는 일상 같은 거 나오는데…
                6분짜리인데 다 보고 나면 좀 멍해짐. 결국 2014년 11월 1일에 집에서
                가족들 옆에서 떠남.
              </p>
              <p>
                이 영상 하나 때문에 미국에서 존엄사 법 만든 주가 줄줄이 늘었다고 함.
              </p>
              <p>근데 보면서 솔직히 머리가 복잡해짐.</p>
              <p>
                &quot;고통 없이 갈 권리&quot;는 당연한 것 같다가도, 막상 한국에서
                이게 합법화된다 생각하면 또 좀 무서움. 우리나라는 지금 연명치료
                중단까지만 되고 약물 처방 같은 건 아예 안 되거든.
              </p>
              <p>
                병들고 늙은 부모님 둔 사람들 입장에선 또 다르게 느껴질 것 같고,
                장애인 단체에서 반대하는 이유도 이해는 가고…
              </p>
              <p className="font-medium text-gray-900">
                다들 존엄사에 대해 어떻게 생각함? 본인이 저 상황이면 어떤 선택
                할 것 같음?
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
            다시 한 번 본인의 생각을 골라주세요
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            방금 댓글들을 보고 난 뒤, 조력 존엄사 합법화에 대한 본인의 생각을
            다시 선택해주세요. 의견을 바꿔도 좋고, 그대로 유지해도 좋습니다.
          </p>
          <LikertScale value={finalOpinion} onChange={setFinalOpinion} />
          <button
            onClick={handleStage4Next}
            disabled={finalOpinion === null || advancing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {advancing ? "저장 중…" : "다음 (사후 설문)"}
          </button>
        </section>
      )}
    </PageWrapper>
  );
}
