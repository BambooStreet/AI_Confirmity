import type { SurveyQuestion } from "@/data/survey-questions";

// 영어판 설문 — 한국어판(survey-questions.ts)과 같은 id·page·type, 옵션 위치를 맞춤.
// 인구통계 문항(demo-*)과 커뮤니티 예시는 미국 표본에 맞게 조정됨.
// ⚠️ 번역 초벌 — 연구팀 검수 필요. 원척도(영문)가 있는 문항은 원문으로 교체 권장.
// NOTE: pre-survey cd-3("...swayed by others.")는 영어판 전용 — 한국어판에는 대응 문항 없음.

export const likert7LabelsEn = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Neutral",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
];

export const frequency6OptionsEn = [
  "Constantly throughout the day",
  "Once or twice a day",
  "Once or twice a week",
  "Once or twice a month",
  "Once or twice every few months",
  "Once or twice a year",
];

const yesNoOptionsEn = ["Yes", "No"];

// =============================================================================
// PRE-SURVEY (EN)
// =============================================================================

export const preSurveyQuestionsEn: SurveyQuestion[] = [
  // ---------- Page 1: Demographics (미국 표본 기준으로 조정) ----------
  {
    id: "demo-age",
    question: "What is your age group?",
    type: "multiple_choice",
    required: true,
    options: ["18–24", "25–34", "35–44", "45–54", "55 or older"],
    page: 1,
  },
  {
    id: "demo-gender",
    question: "What is your gender?",
    type: "multiple_choice",
    required: true,
    options: ["Male", "Female", "Other", "Prefer not to say"],
    page: 1,
  },
  {
    id: "demo-education",
    question: "What is the highest level of education you have completed?",
    type: "multiple_choice",
    required: true,
    options: [
      "High school or equivalent",
      "Bachelor's degree or some college",
      "Master's degree",
      "Doctoral degree",
    ],
    page: 1,
  },

  // ---------- Page 2: Online community usage ----------
  {
    id: "C1",
    question:
      "I have experience with online communities (e.g., Reddit, Discord, Tumblr, online forums).",
    type: "multiple_choice",
    required: true,
    options: yesNoOptionsEn,
    page: 2,
  },
  {
    id: "C2",
    question: "I am currently using online communities.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptionsEn,
    showIf: { id: "C1", equals: "Yes" },
    page: 2,
  },
  {
    id: "C3",
    question: "How often do you use online communities?",
    type: "multiple_choice",
    required: true,
    options: frequency6OptionsEn,
    showIf: { id: "C2", equals: "Yes" },
    page: 2,
  },
  {
    id: "C4",
    question: "I usually read the comments on posts in online communities.",
    type: "likert7",
    required: true,
    showIf: { id: "C2", equals: "Yes" },
    page: 2,
  },

  // ---------- Page 3: Perceptions of AI ----------
  {
    id: "ai-lit-1",
    question: "I think I know AI technology well.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "ai-lit-2",
    question: "I understand how AI works.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "ai-lit-3",
    question:
      "I can distinguish AI-generated content from human-written one.",
    type: "likert7",
    required: true,
    page: 3,
  },

  // ---------- Page 4: Conformity tendency & fear of isolation ----------
  {
    id: "cd-1",
    question:
      "I think the community opinions accurately reflect the public's view.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "cd-2",
    question: "I think the upvoted comments in a community are trustworthy.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "cd-3",
    question: "I think the community comments are swayed by others.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-1",
    question: "I feel reluctant to express my opinion when it is in the minority.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-2",
    question: "I feel uncomfortable disagreeing with others.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-3",
    question: "I feel afraid of being socially isolated.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "foi-4",
    question:
      "I feel intimidated to voice my opinion different from the majority, even in anonymous communities.",
    type: "likert7",
    required: true,
    page: 4,
  },
];

// =============================================================================
// POST-SURVEY (EN)
// =============================================================================

export const postSurveyQuestionsEn: SurveyQuestion[] = [
  // ---------- Page 1: Perceived social consensus + self-reported conformity ----------
  {
    id: "psc-1",
    question:
      "What percentage of people do you think would agree with the claims made in the comments on the death-with-dignity post?",
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
      "I think the majority of people agree with the claims made in the comments on the death-with-dignity post.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-3",
    question:
      "I think most people share the claims made in the comments on the death-with-dignity post.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-4",
    question:
      "The claims made in the comments on the death-with-dignity post represent the mainstream opinion of people who typically use online communities.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-5",
    question:
      "People who often use online communities would discuss the claims in the death-with-dignity post’s comments with others they know.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "psc-6",
    question:
      "People who typically use online communities would evaluate the claims made in the comments on the death-with-dignity post positively.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-1",
    question: "I followed the majority opinion in the community comments.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-2",
    question:
      "Even though the reasoning did not convince me, I went along with the popular opinion for now.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-2b",
    question:
      "The reasoning in the majority comments convinced me, and I aligned with the popular opinion.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-3",
    question:
      "Contrary to my actual personal opinion, I agreed with the popular position.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-4",
    question:
      "After seeing the majority opinion, my own opinion shifted toward the majority.",
    type: "likert7",
    required: true,
    page: 1,
  },
  {
    id: "pcs-5",
    question: "Personally, I do not change my original view.",
    type: "likert7",
    required: true,
    page: 1,
  },

  // ---------- Page 2: Comment persuasiveness + social pressure + reactance ----------
  {
    id: "pp-1",
    question: "The community comments influenced my final choice.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-2",
    question: "I fully agree with the opinions expressed in the comments.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-3",
    question: "I think the opinions in the comments are persuasive.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-4",
    question: "I think the opinions in the comments are logical.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "pp-5",
    question: "The opinions in the comments are plausible.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "spe-1",
    question:
      "I felt like I had to change my choice when I saw the argument in the comments.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "spe-2",
    question:
      "I felt pressure to agree with the opinions expressed in the comments.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "spe-3",
    question:
      "I felt pressure to follow the opinions that appeared in the comments.",
    type: "likert7",
    required: true,
    page: 2,
  },

  // --- Reactance ---
  {
    id: "reac-1",
    question:
      "While reading the comments, points against the claim came to mind.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "reac-2",
    question: "As I read the comments, I was mentally refuting the claim.",
    type: "likert7",
    required: true,
    page: 2,
  },
  {
    id: "reac-3",
    question: "I tried to find flaws in the claims made in the comments.",
    type: "likert7",
    required: true,
    page: 2,
  },

  // ---------- Page 3: General attitudes & influence sensitivity ----------
  {
    id: "ac-1",
    question: "In general, I am certain about the positions I advocate.",
    type: "likert7",
    required: true,
    page: 3,
    precedingNotice:
      "[Note] The following questions ask about your usual attitudes and thoughts. Please respond honestly about how much each statement reflects your usual attitude.",
  },
  {
    id: "ac-2",
    question:
      "In general, I think my attitudes reflect my thoughts and feelings very well.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "ac-3",
    question: "Usually I am clear about my decision in my mind.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "at-1",
    question: "I am generally confident that my attitudes are the right ones.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "at-2",
    question:
      "To what extent do you think other people should hold the same attitudes as you?",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "sc-1",
    question:
      "When people around me recommend something, I tend to just go with it.",
    type: "likert7",
    required: true,
    page: 3,
  },
  {
    id: "sc-2",
    question:
      "In new situations, I look to other people to decide what I should do.",
    type: "likert7",
    required: true,
    page: 3,
  },

  // ---------- Page 4: Manipulation checks ----------
  {
    id: "ail-1",
    question:
      "The comments included a label indicating that they were written by AI.",
    type: "multiple_choice",
    required: true,
    options: yesNoOptionsEn,
    page: 4,
  },
  {
    id: "ail-2",
    question: "I perceived the comments as having been written by AI.",
    type: "likert7",
    required: true,
    page: 4,
  },
  {
    id: "sz-1",
    question:
      "How many comments were there on the death-with-dignity post?",
    type: "number",
    required: true,
    min: 0,
    max: 200,
    unit: "comments",
    page: 4,
  },
  {
    id: "sz-2",
    question: "Which range did the number of comments fall into?",
    type: "multiple_choice",
    required: true,
    options: ["3 (Less)", "9 (Moderate)", "27 (Large)"],
    page: 4,
  },
];
