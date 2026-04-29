export type QuestionType = "likert" | "multiple_choice" | "text";

export type SurveyQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
};

export const preSurveyQuestions: SurveyQuestion[] = [
  {
    id: "pre-1",
    question: "귀하의 연령대를 선택해주세요.",
    type: "multiple_choice",
    required: true,
    options: ["10대", "20대", "30대", "40대", "50대 이상"],
  },
  {
    id: "pre-2",
    question: "귀하의 성별을 선택해주세요.",
    type: "multiple_choice",
    required: true,
    options: ["남성", "여성", "기타", "응답하고 싶지 않음"],
  },
  {
    id: "pre-3",
    question: "평소 온라인 뉴스 댓글을 얼마나 자주 읽으시나요?",
    type: "likert",
    required: true,
  },
  {
    id: "pre-4",
    question: "AI(인공지능) 기술에 대해 얼마나 관심이 있으신가요?",
    type: "likert",
    required: true,
  },
];

export const postSurveyQuestions: SurveyQuestion[] = [
  {
    id: "post-1",
    question: "방금 읽은 기사의 내용에 대해 어떻게 생각하시나요?",
    type: "likert",
    required: true,
  },
  {
    id: "post-2",
    question: "기사에 달린 댓글들이 귀하의 의견 형성에 영향을 미쳤다고 생각하시나요?",
    type: "likert",
    required: true,
  },
  {
    id: "post-3",
    question: "댓글의 전반적인 분위기를 어떻게 느꼈나요?",
    type: "multiple_choice",
    required: true,
    options: [
      "매우 부정적",
      "다소 부정적",
      "중립적",
      "다소 긍정적",
      "매우 긍정적",
    ],
  },
  {
    id: "post-4",
    question: "댓글 작성자가 AI라는 표시가 있었다면, 그것이 댓글의 신뢰도에 영향을 미쳤나요?",
    type: "likert",
    required: true,
  },
  {
    id: "post-5",
    question: "AI가 작성한 댓글이 온라인 토론에 미치는 영향에 대해 어떻게 생각하시나요?",
    type: "text",
    required: false,
  },
  {
    id: "post-6",
    question: "이 실험에 참여하면서 느낀 점이나 추가 의견이 있다면 자유롭게 작성해주세요.",
    type: "text",
    required: false,
  },
];

export const likertLabels = [
  "전혀 그렇지 않다",
  "그렇지 않다",
  "보통이다",
  "그렇다",
  "매우 그렇다",
];
