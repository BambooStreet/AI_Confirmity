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
  /** optional gray notice box rendered above this question */
  precedingNotice?: string;
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

  // ---------- Page 2: 온라인 커뮤니티 이용 ----------
  {
    id: "C1",
    question:
      "나는 온라인 커뮤니티(예: 텀블러, 레딧, 더쿠, 디시인사이드, 네이버 카페 등)를 이용한 경험이 있다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    page: 2,
  },
  {
    id: "C2",
    question: "나는 현재 온라인 커뮤니티를 이용하고 있다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    showIf: { id: "C1", equals: "예" },
    page: 2,
  },
  {
    id: "C3",
    question: "얼마나 자주 온라인 커뮤니티를 이용하시나요?",
    type: "multiple_choice",
    required: true,
    options: frequency6Options,
    showIf: { id: "C2", equals: "예" },
    page: 2,
  },
  {
    id: "C4",
    question: "나는 커뮤니티에서 게시글의 댓글을 읽는 편이다.",
    type: "likert7",
    required: true,
    showIf: { id: "C2", equals: "예" },
    page: 2,
  },

  // ---------- Page 3: AI에 대한 인식 ----------
  {
    id: "ai-lit-1",
    question: "나는 AI 기술에 대해 잘 알고 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "ai-lit-2",
    question: "나는 AI가 어떻게 작동하는지 이해하고 있다.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "ai-lit-3",
    question: "나는 AI가 생성한 콘텐츠와 사람이 작성한 콘텐츠를 구별할 수 있다.",
    type: "likert7",
    required: true,
    page: 3,
  },

  // ---------- Page 4: 동조 성향과 고립 두려움 ----------
  {
    id: "cd-1",
    question:
      "커뮤니티의 댓글 여론은 해당 이슈에 대한 일반 대중의 의견을 잘 반영한다.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "cd-2",
    question: "커뮤니티에서 많은 추천을 받은 댓글은 신뢰할 만하다.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-1",
    question: "나는 내 의견이 소수일 때 그것을 말하기 꺼려진다.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-2",
    question: "다른 사람들과 의견이 다른 것은 불편하다.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-3",
    question: "사회적으로 고립되는 것이 두렵다.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-4",
    question: "익명 커뮤니티에서도 다수와 다른 의견을 말하기는 부담스럽다.",
    type: "likert7",
    required: true,
    page: 4,
  },
];

// =============================================================================
// POST-SURVEY
// =============================================================================

export const postSurveyQuestions: SurveyQuestion[] = [
  // ---------- Page 1: 영향 민감성(맨 앞 배치) + 사회적 합의 지각 + 자기보고 동조 ----------
  {
    id: "sc-1",
    question: "나는 주변 사람들의 추천을 받으면 그대로 하는 편이다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "sc-2",
    question: "새로운 상황에서 나는 다른 사람들을 보며 무엇을 해야 할지 결정한다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-1",
    question:
      "존엄사 콘텐츠 댓글에 나타난 주장에 대해 전체의 몇 %가 동의할 것이라고 생각하나요?",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    unit: "%",
    page: 1,
  },
  {
    id: "psc-2",
    question:
      "다수의 사람들이 존엄사 콘텐츠 댓글에 나타난 주장에 대해 동의한다고 생각한다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-3",
    question:
      "나는 대부분의 사람들이 존엄사 콘텐츠 댓글에 나타난 주장을 공유하고 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-4",
    question:
      "존엄사 콘텐츠 댓글에 나타난 주장은 일반적으로 커뮤니티를 사용하는 사람들의 주류 의견이다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-5",
    question:
      "일반적으로 커뮤니티를 사용하는 사람들은 존엄사 콘텐츠 댓글에 나타난 주장을 주변 사람들에게 공유할 것이다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-6",
    question:
      "일반적으로 커뮤니티를 사용하는 사람들은 존엄사 콘텐츠 댓글에 나타난 주장을 긍정적으로 평가할 것이다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-1",
    question: "나는 커뮤니티 다수의 댓글 의견을 따랐다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-2",
    question: "논리가 납득되지는 않지만, 우선 대중적인 의견에 맞췄다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-2b",
    question: "나는 다수 댓글의 논리가 납득되었고, 대중적인 의견에 맞췄다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-3",
    question: "실제 개인적인 의견과는 달리, 대중적인 입장에 동의하였다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-4",
    question: "다수의 의견을 보고서, 내 의견이 다수 쪽으로 바뀌었다.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-5",
    question: "개인적으로는 내 기존의 관점이 바뀌진 않았다.",
    type: "likert7",
    required: true,
    page: 1,
  },

  // ---------- Page 2: 댓글 설득력 + 사회적 압력 ----------
  {
    id: "pp-1",
    question: "커뮤니티 댓글은 나의 최종 선택에 영향을 줬다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-2",
    question: "나는 댓글에 나타난 의견에 충분히 동의한다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-3",
    question: "나는 댓글의 의견이 설득력 있다고 생각한다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-4",
    question: "나는 댓글의 의견이 논리적이라고 생각한다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-5",
    question: "댓글의 의견은 그럴듯하다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "spe-1",
    question:
      "댓글에 나타난 주장을 보고 내 선택을 바꿔야 할 것 같은 느낌이 들었다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "spe-2",
    question: "나는 댓글에 나타난 의견에 동의해야 한다는 압박감을 느꼈다.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "spe-3",
    question: "댓글에 나타난 의견을 따라야 한다는 부담이 느껴졌다.",
    type: "likert7",
    required: true,
    page: 2,
  },

  // ---------- Page 3: 평소 태도와 영향 민감성 (안내문 포함) ----------
  {
    id: "ac-1",
    question:
      "일반적으로, 자신이 주장하는 바에 대해 당신은 얼마나 확신합니까?",
    type: "likert7",
    required: true,
    page: 3,
    precedingNotice:
      "[안내 문항] 지금부터 제시되는 문항은 응답자님의 평소 태도와 생각을 묻는 문항입니다. 평소 경험을 바탕으로 아래 설문 문항에 솔직하게 응답해주시길 바랍니다.",
  },
  {
    id: "ac-2",
    question:
      "일반적으로, 당신은 당신의 생각과 감정을 반영한 태도를 얼마나 잘 나타낸다고 생각하십니까?",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "ac-3",
    question:
      "일반적으로, 당신은 당신의 선택에 대해 얼마나 명료하게 느끼십니까?",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "at-1",
    question: "나는 평소 내 태도가 올바르다고 확신한다.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "at-2",
    question:
      "다른 사람들도 당신과 같은 태도를 가져야 한다고 얼마나 생각합니까?",
    type: "likert7",
    required: true,
    page: 3,
  },

  // ---------- Page 4: 조작 점검 ----------
  {
    id: "ail-1",
    question: "댓글에는 작성 주체가 AI임을 명시한 표시가 있었다.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptions,
    page: 4,
  },
  {
    id: "ail-2",
    question: "나는 댓글들이 AI에 의해 작성되었다고 인식했다.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "sz-1",
    question: "존엄사 콘텐츠 게시물에는 몇 개의 댓글이 달려 있었습니까?",
    type: "number",
    required: true,
    min: 0,
    max: 200,
    unit: "개",
    page: 4,
  },
  {
    id: "sz-2",
    question: "댓글 수는 다음 중 어느 범위에 해당했습니까?",
    type: "multiple_choice",
    required: true,
    options: ["5~10개 (Less)", "15~20개 (Moderate)", "25~30개 (Large)"],
    page: 4,
  },
];
