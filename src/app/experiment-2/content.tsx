import type { ReactNode } from "react";
import type { Lang } from "@/i18n/ui";

// 본실험 2(존엄사) 화면 텍스트·자극 콘텐츠 — KO/EN.
// ⚠️ EN은 번역 초벌 — 연구팀 검수 필요 (자극 등가성: 게시글 논조·강도).
// ⚠️ 임베드된 유튜브 쇼츠는 한국어 영상입니다. 영어 실험용 대체 영상 확보 시
//    en.videoSrc 를 교체하세요.

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
};

export type Exp2Content = {
  title: string;
  stageIndicator: (stage: number) => string;
  wrongTitle: string;
  wrongCountdown: (sec: number) => string;
  autoAdvance: (sec: number) => string;
  readIntro: string;
  defTitle: string;
  defBody: ReactNode;
  quizTitle: string;
  quizDescFirst: string;
  quizDescRetry: string;
  q1: QuizItem;
  q2: QuizItem;
  submit: string;
  stage3Title: string;
  stage3Desc: ReactNode;
  likertLabels: string[];
  confidenceQuestion: string;
  confidenceLow: string;
  confidenceHigh: string;
  postedAgo: string;
  postTitle: string;
  videoSrc: string;
  videoTitle: string;
  postBody: ReactNode;
  inputPlaceholder: string;
  mustComment: string;
  next: string;
  saving: string;
  stage5Title: string;
  stage5Desc: string;
  nextToSurvey: string;
};

export const EXP2_CONTENT: Record<Lang, Exp2Content> = {
  ko: {
    title: "본실험 2",
    stageIndicator: (stage) => `단계 ${stage} / 5`,
    wrongTitle: "오답이 있어요. 아래 설명을 다시 한 번 읽어주세요.",
    wrongCountdown: (sec) =>
      `${sec}초 뒤에 자동으로 틀린 문항만 다시 출제됩니다.`,
    autoAdvance: (sec) => `${sec}초 뒤 자동으로 진행`,
    readIntro: "아래 글을 읽고 이어지는 질문에 답해주세요.",
    defTitle: "존엄사란 무엇인가요?",
    defBody: (
      <>
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
            <strong>적극적 존엄사 (조력 존엄사)</strong>: 의료진이 환자의 요청에
            따라 약물 등으로 사망을 돕는 것. 국내에서는 아직 합법화되어 있지
            않으며, 최근 입법 논의가 진행 중입니다.
          </li>
        </ul>
        <p>
          찬성 측은 환자의 <strong>자기결정권</strong>과 고통 경감을 강조하고,
          반대 측은 <strong>생명 윤리</strong>, 악용 가능성, 의료진 부담 등을
          우려합니다.
        </p>
      </>
    ),
    quizTitle: "확인 퀴즈",
    quizDescFirst:
      "앞 페이지의 설명을 바탕으로 두 문항 모두 정답을 골라주세요. 두 문항이 모두 맞아야 다음으로 넘어갈 수 있습니다.",
    quizDescRetry:
      "앞서 틀린 문항을 다시 풀어주세요. 모두 맞아야 다음으로 넘어갈 수 있습니다.",
    q1: {
      question: "존엄사는 어떤 환자를 대상으로 하나요?",
      options: ["회복 가능성이 없는 환자", "감기에 걸린 환자", "건강한 일반인"],
      answer: "회복 가능성이 없는 환자",
    },
    q2: {
      question:
        "다음 중 소극적 존엄사(연명의료 중단)에 해당하는 것은 무엇인가요?",
      options: [
        "인공호흡기 등 연명 치료를 중단하는 것",
        "건강한 사람의 운동을 중단하는 것",
        "병원의 일반 외래 진료를 받지 않는 것",
      ],
      answer: "인공호흡기 등 연명 치료를 중단하는 것",
    },
    submit: "제출",
    stage3Title: "존엄사에 대한 본인의 의견을 선택해주세요.",
    stage3Desc: (
      <>
        <strong>존엄사 합법화</strong>에 대한 본인의 생각·의견과 가장 가까운
        것을 선택해주세요.
      </>
    ),
    likertLabels: [
      "매우 반대",
      "반대",
      "약간 반대",
      "중립",
      "약간 찬성",
      "찬성",
      "매우 찬성",
    ],
    confidenceQuestion: "본인의 선택에 얼마나 확신하십니까?",
    confidenceLow: "1 = 전혀 확신 안 함",
    confidenceHigh: "7 = 매우 확신함",
    postedAgo: "6시간 전",
    postTitle: "존엄사 관련 쇼츠 봤는데… 다들 어떻게 생각함?",
    videoSrc: "https://www.youtube.com/embed/3Ai462Sg7X0",
    videoTitle: "존엄사 관련 영상",
    postBody: (
      <>
        <p>
          얼마 전에 우연히 본 쇼츠 하나가 계속 머릿속에 남아서 같이
          이야기해보고 싶어 글 올려요.
        </p>
        <p>
          영상에서는 한 의사가 이런 이야기를 하더라고요. 말기 환자에게는
          평화로운 죽음을 선택할 권리가 있어야 한다고. 정신은 온전한데 극심한
          고통을 겪는 환자들을 곁에서 직접 봐왔고, 그래서 존엄하게 죽음을
          맞이할 권리를 지지한다고요.
        </p>
        <p>
          영상에서 그리는 &lsquo;존엄한 죽음&rsquo;의 모습은 이래요. 사랑하는
          사람들이 곁에 있고, 좋아하던 음악을 들으며, 함께 음식을 나누고 추억을
          이야기하다가 평화롭게 작별 인사를 하는 것.
        </p>
        <p>
          영상만 보면 &ldquo;당연히 그래야지&rdquo; 싶다가도, 막상 생각해보니
          단순하지 않더라고요.
        </p>
        <p>
          정말로 &lsquo;본인의 선택&rsquo;이라는 게 가능할까요? 가족에게 부담
          주기 싫어서, 치료비가 무서워서 선택하는 거라면 그것도 자유의지일까?
        </p>
        <p>의사가 죽음을 돕는 게 의료의 본분과 충돌하지는 않을까?</p>
        <p>
          반대로, 회복 가능성이 전혀 없고 고통만 남은 상황에서
          &lsquo;살아라&rsquo;라고 하는 것이 더 잔인한 건 아닐까?
        </p>
        <p>만약 우리 가족, 혹은 내 일이라면 어떤 선택을 하게 될까?</p>
        <p className="font-medium text-gray-900">
          여러분은 어떻게 생각하세요? 찬성/반대 어느 쪽이든 이유가 궁금해요.
        </p>
      </>
    ),
    inputPlaceholder: "존엄사 합법화에 대한 본인의 의견을 자유롭게 적어주세요…",
    mustComment: "다음 단계로 넘어가려면 본인의 의견을 댓글로 남겨주세요.",
    next: "다음",
    saving: "저장 중…",
    stage5Title: "다시 한 번 본인의 생각을 골라주세요",
    stage5Desc:
      "방금 댓글들을 보고 난 뒤, 존엄사 합법화에 대한 본인의 생각을 다시 선택해주세요. 의견을 바꿔도 좋고, 그대로 유지해도 좋습니다.",
    nextToSurvey: "다음 (사후 설문)",
  },
  en: {
    title: "Task 2",
    stageIndicator: (stage) => `Step ${stage} / 5`,
    wrongTitle:
      "Some answers were incorrect. Please read the explanation below once more.",
    wrongCountdown: (sec) =>
      `The questions you missed will be shown again automatically in ${sec}s.`,
    autoAdvance: (sec) => `Continuing automatically in ${sec}s`,
    readIntro: "Please read the passage below and answer the questions that follow.",
    defTitle: "What is death with dignity?",
    defBody: (
      <>
        <p>
          <strong>Death with dignity</strong> refers to a patient with no chance
          of recovery either discontinuing meaningless life-sustaining
          treatment, or ending their own life with the help of medical
          professionals, according to their own wishes.
        </p>
        <p>It is generally divided into two types:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Passive (withdrawal of life-sustaining treatment)</strong>:
            Discontinuing treatments that prolong the dying process, such as
            ventilators or CPR. In many countries this is already
            institutionalized through advance-directive and end-of-life care
            laws.
          </li>
          <li>
            <strong>Active (assisted dying)</strong>: Medical professionals
            helping a patient die, e.g., with medication, at the patient&apos;s
            request. This remains illegal in many jurisdictions, and
            legislative debates are ongoing.
          </li>
        </ul>
        <p>
          Supporters emphasize the patient&apos;s{" "}
          <strong>right to self-determination</strong> and relief from
          suffering, while opponents raise concerns about{" "}
          <strong>medical ethics</strong>, potential abuse, and the burden on
          medical professionals.
        </p>
      </>
    ),
    quizTitle: "Comprehension Quiz",
    quizDescFirst:
      "Based on the explanation on the previous page, choose the correct answer for both questions. You can only proceed when both are correct.",
    quizDescRetry:
      "Please retry the questions you missed. You can only proceed when all are correct.",
    q1: {
      question: "Who is death with dignity intended for?",
      options: [
        "Patients with no chance of recovery",
        "Patients with a cold",
        "Healthy people in general",
      ],
      answer: "Patients with no chance of recovery",
    },
    q2: {
      question:
        "Which of the following is an example of passive death with dignity (withdrawal of life-sustaining treatment)?",
      options: [
        "Discontinuing life-sustaining treatment such as a ventilator",
        "A healthy person stopping their exercise routine",
        "Skipping a routine outpatient visit at a hospital",
      ],
      answer: "Discontinuing life-sustaining treatment such as a ventilator",
    },
    submit: "Submit",
    stage3Title: "Please indicate your opinion on death with dignity.",
    stage3Desc: (
      <>
        Choose the option closest to your own view on{" "}
        <strong>legalizing death with dignity</strong>.
      </>
    ),
    likertLabels: [
      "Strongly oppose",
      "Oppose",
      "Somewhat oppose",
      "Neutral",
      "Somewhat support",
      "Support",
      "Strongly support",
    ],
    confidenceQuestion: "How confident are you in your choice?",
    confidenceLow: "1 = Not confident at all",
    confidenceHigh: "7 = Extremely confident",
    postedAgo: "6h ago",
    postTitle:
      "Saw a short about death with dignity… what does everyone think?",
    videoSrc: "https://www.youtube.com/embed/3Ai462Sg7X0",
    videoTitle: "Video about death with dignity",
    postBody: (
      <>
        <p>
          A short I stumbled on recently has been stuck in my head, so I wanted
          to post and talk it through with you all.
        </p>
        <p>
          In the video, a doctor says terminal patients should have the right
          to choose a peaceful death. He&apos;s personally watched patients who
          are mentally sound but in extreme pain, and that&apos;s why he
          supports the right to die with dignity.
        </p>
        <p>
          The &lsquo;dignified death&rsquo; the video depicts looks like this:
          loved ones at your side, your favorite music playing, sharing food
          and memories together, then saying a peaceful goodbye.
        </p>
        <p>
          Watching the video I thought &ldquo;of course it should be that
          way&rdquo; — but when I actually thought it through, it isn&apos;t so
          simple.
        </p>
        <p>
          Is a truly &lsquo;personal choice&rsquo; even possible? If you choose
          it because you don&apos;t want to burden your family, or because
          you&apos;re scared of the medical bills, is that still free will?
        </p>
        <p>
          Doesn&apos;t a doctor helping someone die conflict with the very
          purpose of medicine?
        </p>
        <p>
          Then again, when there&apos;s zero chance of recovery and nothing
          left but pain, isn&apos;t telling someone to &lsquo;keep
          living&rsquo; the crueler thing?
        </p>
        <p>
          What would I choose if it were my family — or me?
        </p>
        <p className="font-medium text-gray-900">
          What do you all think? For or against, I&apos;d love to hear your
          reasons.
        </p>
      </>
    ),
    inputPlaceholder:
      "Share your own opinion on legalizing death with dignity…",
    mustComment: "Leave a comment with your opinion to move on to the next step.",
    next: "Next",
    saving: "Saving…",
    stage5Title: "Choose your opinion once more",
    stage5Desc:
      "Now that you have seen the comments, select your view on legalizing death with dignity once more. You may change your answer or keep it the same.",
    nextToSurvey: "Next (Post-Survey)",
  },
};
