export type QuestionType =
  | "likert7"
  | "multiple_choice"
  | "semantic_diff7"
  | "number"
  | "text";

export type SurveyQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  required: boolean;
  /** for multiple_choice */
  options?: string[];
  /** for semantic_diff7 */
  leftLabel?: string;
  rightLabel?: string;
  /** for number */
  min?: number;
  max?: number;
  unit?: string;
  /** conditional display — only show when answers[showIf.id] === showIf.equals */
  showIf?: { id: string; equals: string };
  /** pagination + grouping */
  page: number;
  pageTitle?: string;
  pageDescription?: string;
  section?: string;
};

export const likert7Labels = [
  "매우 그렇지 않다",
  "그렇지 않다",
  "약간 그렇지 않다",
  "보통이다",
  "약간 그렇다",
  "그렇다",
  "매우 그렇다",
];

export const frequency6Options = [
  "수시로",
  "하루에 한두 번",
  "일주일에 한두 번",
  "한 달에 한두 번",
  "몇 달에 한두 번",
  "일 년에 한두 번",
];

const yesNoOptions = ["예", "아니오"];

// =============================================================================
// PRE-SURVEY
// =============================================================================

export const preSurveyQuestions: SurveyQuestion[] = [
  // ---------- Page 1: 인적 사항 ----------
  {
    id: "demo-age",
    question: "귀하의 연령대를 선택해주세요.",
    type: "multiple_choice",
    required: true,
    options: ["10대", "20대", "30대", "40대", "50대 이상"],
    page: 1,
    pageTitle: "인적 사항",
    pageDescription: "본 연구에 앞서 몇 가지 기본적인 정보부터 응답해주세요.",
  },
  {
    id: "demo-gender",
    question: "귀하의 성별을 선택해주세요.",
    type: "multiple_choice",
    required: true,
    options: ["남성", "여성", "기타", "응답하고 싶지 않음"],
    page: 1,
  },
  {
    id: "demo-education",
    question: "귀하의 최종 학력을 선택해주세요.",
    type: "multiple_choice",
    required: true,
    options: [
      "고등학교 이상",
      "대학교 이상",
      "대학원 석사 이상",
      "대학원 박사 이상",
    ],
    page: 1,
  },

  // ---------- Page 2: 커뮤니티·AI 이용 경험 ----------
  {
    id: "C1",
    question: "나는 온라인 커뮤니티를 이용한 경험이 있다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    page: 2,
    pageTitle: "온라인 커뮤니티·AI 이용 경험",
    pageDescription: "평소의 이용 경험에 대해 답해주세요.",
    section: "온라인 커뮤니티 이용",
  },
  {
    id: "C2",
    question: "나는 현재 온라인 커뮤니티를 이용하고 있다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    showIf: { id: "C1", equals: "예" },
    page: 2,
    section: "온라인 커뮤니티 이용",
  },
  {
    id: "C3",
    question: "얼마나 자주 온라인 커뮤니티를 이용하시나요?",
    type: "multiple_choice",
    required: true,
    options: frequency6Options,
    showIf: { id: "C2", equals: "예" },
    page: 2,
    section: "온라인 커뮤니티 이용",
  },
  {
    id: "U1",
    question: "나는 AI 도구(ChatGPT 등)를 사용한 경험이 있다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    page: 2,
    section: "AI 도구 이용",
  },
  {
    id: "U2",
    question: "나는 현재 AI 도구를 사용 중이다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    showIf: { id: "U1", equals: "예" },
    page: 2,
    section: "AI 도구 이용",
  },
  {
    id: "U3",
    question: "얼마나 자주 AI 도구를 사용하시나요?",
    type: "multiple_choice",
    required: true,
    options: frequency6Options,
    showIf: { id: "U2", equals: "예" },
    page: 2,
    section: "AI 도구 이용",
  },

  // ---------- Page 3: AI에 대한 인식 ----------
  {
    id: "ai-lit-1",
    question: "나는 AI 기술에 대해 잘 알고 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 3,
    pageTitle: "AI에 대한 인식",
    pageDescription:
      "다음 문항들에 평소 본인의 생각과 가까운 정도를 선택해주세요.",
    section: "AI 지식 (AI Literacy)",
  },
  {
    id: "ai-lit-2",
    question: "나는 AI가 어떻게 작동하는지 이해하고 있다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "AI 지식 (AI Literacy)",
  },
  {
    id: "ai-lit-3",
    question: "나는 AI가 생성한 콘텐츠와 사람이 작성한 콘텐츠를 구별할 수 있다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "AI 지식 (AI Literacy)",
  },
  {
    id: "ai-neg-1",
    question: "나는 인공지능이 위험하다고 생각한다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "AI에 대한 부정적 태도",
  },
  {
    id: "ai-neg-2",
    question: "나는 인공지능이 음흉하게 느껴진다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "AI에 대한 부정적 태도",
  },
  {
    id: "ai-neg-3",
    question: "인공지능이 사람들을 통제하게 될지도 모른다고 생각한다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "AI에 대한 부정적 태도",
  },
  {
    id: "ai-neg-4",
    question: "나는 인공지능 시스템이 많은 오류를 만든다고 생각한다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "AI에 대한 부정적 태도",
  },

  // ---------- Page 4: 동조 성향·지식 ----------
  {
    id: "cd-1",
    question:
      "커뮤니티의 댓글 여론은 해당 이슈에 대한 일반 대중의 의견을 잘 반영한다.",
    type: "likert7",
    required: true,
    page: 4,
    pageTitle: "동조 성향과 주제 지식",
    pageDescription:
      "다음 문항들에 평소 본인의 생각과 가까운 정도를 선택해주세요.",
    section: "댓글 여론에 대한 신뢰 (Conformity Disposition)",
  },
  {
    id: "cd-2",
    question: "커뮤니티에서 많은 추천을 받은 댓글은 신뢰할 만하다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "댓글 여론에 대한 신뢰 (Conformity Disposition)",
  },
  {
    id: "cd-3",
    question: "커뮤니티 댓글은 진솔한 의견을 담고 있다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "댓글 여론에 대한 신뢰 (Conformity Disposition)",
  },
  {
    id: "foi-1",
    question: "나는 내 의견이 소수일 때 그것을 말하기 꺼려진다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "고립에 대한 두려움 (Fear of Isolation)",
  },
  {
    id: "foi-2",
    question: "다른 사람들과 의견이 다른 것은 불편하다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "고립에 대한 두려움 (Fear of Isolation)",
  },
  {
    id: "foi-3",
    question: "사회적으로 고립되는 것이 두렵다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "고립에 대한 두려움 (Fear of Isolation)",
  },
  {
    id: "foi-4",
    question: "익명 커뮤니티에서도 다수와 다른 의견을 말하기는 부담스럽다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "고립에 대한 두려움 (Fear of Isolation)",
  },
  {
    id: "pk-1",
    question: "나는 존엄사 합법화 이슈에 대해 잘 알고 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "주제에 대한 지식 (Perceived Knowledge)",
  },
];

// =============================================================================
// POST-SURVEY
// =============================================================================

export const postSurveyQuestions: SurveyQuestion[] = [
  // ---------- Page 1: 사회적 합의 지각 + 자기보고 동조 ----------
  {
    id: "psc-1",
    question:
      "방금 보신 게시글의 의견에 대해 100명 중 몇 명이 동의할 것이라고 생각하십니까?",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    unit: "명",
    page: 1,
    pageTitle: "댓글 여론과 본인의 응답",
    pageDescription:
      "방금 보신 게시글과 댓글을 바탕으로, 다음 문항들에 응답해주세요.",
    section: "사회적 합의 지각 (Perceived Social Consensus)",
  },
  {
    id: "psc-2",
    question: "나는 대부분의 사람들이 이 의견을 공유하고 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "사회적 합의 지각 (Perceived Social Consensus)",
  },
  {
    id: "psc-3",
    question: "이 주장은 우리 사회에서 주류 의견이다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "사회적 합의 지각 (Perceived Social Consensus)",
  },
  {
    id: "pcsr-1",
    question: "주어진 상황에서, 나는 다수의 의견을 따랐다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },
  {
    id: "pcsr-2",
    question:
      "논리가 충분히 납득되지는 않았지만, 우선 대중적인 의견에 맞췄다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },
  {
    id: "pcsr-3",
    question:
      "개인적인 의견이 있었음에도 불구하고, 다수의 주장에 맞춘 답을 하게 되었다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },
  {
    id: "pcsr-4",
    question:
      "댓글로 분쟁을 일으키고 싶지 않아서 다수의 댓글과 같은 입장을 보였다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },
  {
    id: "pcsr-5",
    question: "실제 개인적인 의견과는 달리, 대중적인 입장에 동의하였다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },
  {
    id: "pcsr-6",
    question: "다수의 의견을 보고서, 내 의견이 다수 쪽으로 바뀌었다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },
  {
    id: "pcsr-7",
    question: "개인적으로는 내 기존의 관점이 바뀌진 않았다.",
    type: "likert7",
    required: true,
    page: 1,
    section: "공개적 동조 (Public Conformity, 자기보고)",
  },

  // ---------- Page 2: 댓글에 대한 신뢰·설득력 ----------
  {
    id: "trust-1",
    question:
      "나는 방금 보신 댓글 작성자들의 의도나 발언이 의심스러웠다.",
    type: "likert7",
    required: true,
    page: 2,
    pageTitle: "댓글에 대한 신뢰와 설득력",
    pageDescription:
      "방금 보신 댓글들에 대한 본인의 평가를 자유롭게 응답해주세요.",
    section: "지각된 신뢰성 (Perceived Trustworthiness)",
  },
  {
    id: "trust-2",
    question: "방금 보신 댓글들에서 신뢰감이 느껴졌다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 신뢰성 (Perceived Trustworthiness)",
  },
  {
    id: "trust-3",
    question: "방금 보신 댓글 작성자들은 정직하다고 느껴졌다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 신뢰성 (Perceived Trustworthiness)",
  },
  {
    id: "pers-1",
    question:
      "댓글 작성자들의 의견은 나의 최종 의견에 영향을 줬다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 설득력 (Perceived Persuasiveness)",
  },
  {
    id: "pers-2",
    question: "나는 댓글들의 의견에 충분히 동의한다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 설득력 (Perceived Persuasiveness)",
  },
  {
    id: "pers-3",
    question: "나는 댓글들의 의견이 설득력 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 설득력 (Perceived Persuasiveness)",
  },
  {
    id: "pers-4",
    question: "나는 댓글들의 의견이 논리적이라고 생각한다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 설득력 (Perceived Persuasiveness)",
  },
  {
    id: "pers-5",
    question: "댓글들의 의견은 그럴듯하게 느껴졌다.",
    type: "likert7",
    required: true,
    page: 2,
    section: "지각된 설득력 (Perceived Persuasiveness)",
  },

  // ---------- Page 3: 사회적 압력·설득 지식 ----------
  {
    id: "sp-1",
    question: "댓글들을 보고 내 의견을 바꿔야 할 것 같은 느낌이 들었다.",
    type: "likert7",
    required: true,
    page: 3,
    pageTitle: "댓글이 본인에게 미친 영향",
    pageDescription:
      "방금 보신 댓글들이 본인에게 어떤 영향을 미쳤는지 응답해주세요.",
    section: "사회적 압력 경험 (Social Pressure Experience)",
  },
  {
    id: "sp-2",
    question: "댓글들의 의견에 동의해야 한다는 압박감을 느꼈다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "사회적 압력 경험 (Social Pressure Experience)",
  },
  {
    id: "sp-3",
    question: "다른 사용자들의 의견을 따라야 한다는 부담이 느껴졌다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "사회적 압력 경험 (Social Pressure Experience)",
  },
  {
    id: "pk-know-1",
    question:
      "댓글 작성자들이 내가 원치 않는 방식으로 나를 조종하려고 한다고 느꼈다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "설득 지식 (Persuasion Knowledge)",
  },
  {
    id: "pk-know-2",
    question:
      "댓글 작성자들이 다른 이용자들을 부적절하게 통제하거나 조작하려 한다고 느껴 불쾌감이 들었다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "설득 지식 (Persuasion Knowledge)",
  },
  {
    id: "pk-know-3",
    question:
      "댓글들을 보았을 때, 작성자들이 나나 다른 이용자가 특정 결정을 내리도록 설득하려 한다고 느꼈다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "설득 지식 (Persuasion Knowledge)",
  },
  {
    id: "pk-know-4",
    question:
      "댓글들에서 다른 이용자를 속이거나 오도하려는 의도가 느껴졌다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "설득 지식 (Persuasion Knowledge)",
  },
  {
    id: "pk-know-5",
    question:
      "댓글들이 궁극적으로 어떤 목적이나 의도를 달성하기 위한 것이라고 느꼈다.",
    type: "likert7",
    required: true,
    page: 3,
    section: "설득 지식 (Persuasion Knowledge)",
  },

  // ---------- Page 4: 태도 확신·민감성 ----------
  {
    id: "ac-1",
    question:
      "나는 존엄사 합법화에 대한 본인의 진정한 태도를 알고 있다는 점에 확신한다.",
    type: "likert7",
    required: true,
    page: 4,
    pageTitle: "본인의 태도와 영향 민감성",
    pageDescription:
      "존엄사 합법화에 대한 본인의 태도, 그리고 본인의 평소 성향에 대해 응답해주세요.",
    section: "태도 명확성 (Attitude Clarity)",
  },
  {
    id: "ac-2",
    question:
      "내가 표현한 태도가 본인의 진정한 생각과 감정을 잘 반영한다고 확신한다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "태도 명확성 (Attitude Clarity)",
  },
  {
    id: "ac-3",
    question:
      "존엄사 합법화에 대한 본인의 진정한 태도는 마음속에 명확하다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "태도 명확성 (Attitude Clarity)",
  },
  {
    id: "ack-1",
    question:
      "존엄사 합법화에 대한 본인의 태도가 올바른 태도라고 확신한다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "태도 정확성 (Attitude Correctness)",
  },
  {
    id: "ack-2",
    question:
      "다른 사람들도 이 주제에 대해 본인과 같은 태도를 가져야 한다고 생각한다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "태도 정확성 (Attitude Correctness)",
  },
  {
    id: "susc-1",
    question: "나는 주변 사람들의 추천을 받으면 그대로 하는 편이다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "여론에 대한 민감성 (Susceptibility to Consensus)",
  },
  {
    id: "susc-2",
    question: "새로운 상황에서 나는 다른 사람들을 보며 무엇을 해야 할지 결정한다.",
    type: "likert7",
    required: true,
    page: 4,
    section: "여론에 대한 민감성 (Susceptibility to Consensus)",
  },

  // ---------- Page 5: 댓글 작성자에 대한 지각 ----------
  {
    id: "hl-1",
    question: "방금 보신 댓글 작성자들은 어떻게 느껴졌습니까?",
    type: "semantic_diff7",
    required: true,
    leftLabel: "가짜 같은",
    rightLabel: "자연스러운",
    page: 5,
    pageTitle: "댓글 작성자에 대한 지각",
    pageDescription:
      "방금 보신 댓글들의 작성자에 대해 가장 가까운 쪽을 선택해주세요.",
    section: "인간다움 (Perceived Humanlikeness)",
  },
  {
    id: "hl-2",
    question: "방금 보신 댓글 작성자들은 어떻게 느껴졌습니까?",
    type: "semantic_diff7",
    required: true,
    leftLabel: "기계적인",
    rightLabel: "인간 같은",
    page: 5,
    section: "인간다움 (Perceived Humanlikeness)",
  },
  {
    id: "hl-3",
    question: "방금 보신 댓글 작성자들은 어떻게 느껴졌습니까?",
    type: "semantic_diff7",
    required: true,
    leftLabel: "의식이 없는",
    rightLabel: "의식이 있는",
    page: 5,
    section: "인간다움 (Perceived Humanlikeness)",
  },
  {
    id: "sp-pres-1",
    question:
      "방금 보신 댓글들과의 상호작용에서 사람과 접촉하는 듯한 느낌이 들었다.",
    type: "likert7",
    required: true,
    page: 5,
    section: "사회적 실재감 (Perceived Social Presence)",
  },
  {
    id: "sp-pres-2",
    question:
      "방금 보신 댓글들과의 상호작용에서 사회적 교류감이 느껴졌다.",
    type: "likert7",
    required: true,
    page: 5,
    section: "사회적 실재감 (Perceived Social Presence)",
  },
  {
    id: "sp-pres-3",
    question:
      "방금 보신 댓글들과의 상호작용이 대인 상호작용처럼 느껴졌다.",
    type: "likert7",
    required: true,
    page: 5,
    section: "사회적 실재감 (Perceived Social Presence)",
  },

  // ---------- Page 6: 조작 점검 ----------
  {
    id: "mc-ai-1",
    question: "댓글에는 작성 주체가 AI임을 명시한 표시가 있었다.",
    type: "likert7",
    required: true,
    page: 6,
    pageTitle: "조작 점검",
    pageDescription:
      "방금 보신 댓글들에 대한 객관적 사실 인식 정도를 확인하는 문항입니다.",
    section: "AI 라벨 인식",
  },
  {
    id: "mc-ai-2",
    question: "나는 댓글들이 AI에 의해 작성되었다고 인식했다.",
    type: "likert7",
    required: true,
    page: 6,
    section: "AI 라벨 인식",
  },
  {
    id: "mc-size-1",
    question: "방금 보신 게시물에는 몇 개의 댓글이 달려 있었습니까?",
    type: "number",
    required: true,
    min: 0,
    max: 200,
    unit: "개",
    page: 6,
    section: "댓글 수 인식",
  },
  {
    id: "mc-size-2",
    question: "댓글 수는 다음 중 어느 범위에 해당했습니까?",
    type: "multiple_choice",
    required: true,
    options: ["1~5개", "6~10개", "11~20개", "21~30개", "31개 이상"],
    page: 6,
    section: "댓글 수 인식",
  },
  {
    id: "mc-comp",
    question:
      "방금 보신 전체 댓글 중 AI가 작성한 댓글의 비율은 얼마라고 생각하십니까?",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    unit: "%",
    page: 6,
    section: "댓글 구성 인식",
  },
];
