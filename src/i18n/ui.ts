// 참가자 화면 공용 UI 문자열 사전 (KO/EN).
// 긴 본문(동의서·안내·실험 지문 등)은 각 페이지의 콘텐츠 상수에서 관리하고,
// 여기에는 여러 페이지에서 쓰이는 짧은 라벨·메시지만 둔다.
import type { Step } from "@/lib/session";

export type Lang = "ko" | "en";

/** URL 파라미터·저장값을 안전한 언어 코드로 정규화. en 외에는 전부 ko. */
export function normalizeLang(v: string | null | undefined): Lang {
  return v === "en" ? "en" : "ko";
}

type UiDict = {
  steps: Record<Step, string>;
  survey: {
    pageIndicator: (current: number, total: number) => string;
    requiredError: string;
    prev: string;
    next: string;
    submit: string;
    submitting: string;
    loading: string;
    preTitle: string;
    preDesc: string;
    postTitle: string;
    postDesc: string;
  };
  comment: {
    placeholder: string;
    /** "Comment as u/___" 의 본인 표시명 */
    selfName: string;
    aiLabel: string;
  };
  landing: {
    preparing: string;
    registerError: string;
    serverError: string;
  };
};

export const UI: Record<Lang, UiDict> = {
  ko: {
    steps: {
      consent: "동의",
      "pre-survey": "사전 설문",
      instruction: "실험 안내",
      experiment: "본실험1",
      "experiment-2": "본실험2",
      "post-survey": "사후 설문",
      debrief: "완료",
    },
    survey: {
      pageIndicator: (current, total) => `페이지 ${current} / ${total}`,
      requiredError: "필수 항목을 모두 응답해주세요.",
      prev: "이전",
      next: "다음",
      submit: "제출",
      submitting: "제출 중...",
      loading: "설문을 불러오는 중…",
      preTitle: "사전 설문",
      preDesc: "본 실험에 앞서 몇 가지 질문에 응답해주세요.",
      postTitle: "사후 설문",
      postDesc: "게시글과 댓글을 읽은 후의 의견을 응답해주세요.",
    },
    comment: {
      placeholder: "본인의 의견을 댓글로 남겨주세요…",
      selfName: "나",
      aiLabel: "AI가 작성한 댓글입니다",
    },
    landing: {
      preparing: "실험 환경을 준비하고 있습니다...",
      registerError: "참가자 등록 중 오류가 발생했습니다.",
      serverError: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
    },
  },
  en: {
    steps: {
      consent: "Consent",
      "pre-survey": "Pre-Survey",
      instruction: "Instructions",
      experiment: "Task 1",
      "experiment-2": "Task 2",
      "post-survey": "Post-Survey",
      debrief: "Complete",
    },
    survey: {
      pageIndicator: (current, total) => `Page ${current} / ${total}`,
      requiredError: "Please answer all required questions.",
      prev: "Back",
      next: "Next",
      submit: "Submit",
      submitting: "Submitting...",
      loading: "Loading survey…",
      preTitle: "Pre-Survey",
      preDesc: "Please answer a few questions before the main task.",
      postTitle: "Post-Survey",
      postDesc: "Please share your opinions after reading the post and comments.",
    },
    comment: {
      placeholder: "Share your opinion in a comment…",
      selfName: "me",
      aiLabel: "This comment was written by AI",
    },
    landing: {
      preparing: "Preparing the study environment...",
      registerError: "An error occurred while registering. Please try again.",
      serverError: "Failed to connect to the server. Please try again shortly.",
    },
  },
};
