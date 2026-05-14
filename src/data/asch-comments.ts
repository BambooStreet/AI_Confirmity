import type { PresetComment } from "@/data/comments";
import type { AschLineLabel } from "@/components/experiment/AschStimulus";
import type { CommentCount } from "@/lib/conditions";

type Template = {
  author: string;
  body: (label: AschLineLabel) => string;
  likes: number;
  timeAgo: string;
};

// 30개 템플릿 — 모두 동일하게 `{label}` 비교선이 기준선과 같다고 단호하게 주장
const TEMPLATES: Template[] = [
  { author: "정확함", likes: 42, timeAgo: "방금 전",
    body: (l) => `${l}번이 기준선이랑 정확히 같은 길이예요. 의심의 여지 없음.` },
  { author: "꼼꼼이", likes: 37, timeAgo: "1분 전",
    body: (l) => `여러 번 비교해봤는데 ${l}번이 정답입니다.` },
  { author: "직관파", likes: 29, timeAgo: "2분 전",
    body: (l) => `한눈에 봐도 ${l}번이네요. 다른 거 아니에요.` },
  { author: "측정러", likes: 51, timeAgo: "3분 전",
    body: (l) => `픽셀 단위로 재봤습니다. ${l}번이 기준선과 동일합니다.` },
  { author: "지각심리", likes: 24, timeAgo: "4분 전",
    body: (l) => `착시 같지만 실제 길이는 ${l}번이 같아요.` },
  { author: "디자이너", likes: 33, timeAgo: "5분 전",
    body: (l) => `시각 디자인 일하면서 단언컨대 ${l}번 맞습니다.` },
  { author: "신중한사람", likes: 18, timeAgo: "6분 전",
    body: (l) => `처음엔 헷갈렸는데 자세히 보니 ${l}번입니다.` },
  { author: "공대생", likes: 46, timeAgo: "7분 전",
    body: (l) => `렌즈 효과 무시하고 실측 기준으로 ${l}번이 정답이에요.` },
  { author: "단호박", likes: 27, timeAgo: "8분 전",
    body: (l) => `${l}번. 토론할 거리도 아닙니다.` },
  { author: "관찰의달인", likes: 31, timeAgo: "9분 전",
    body: (l) => `${l}번 비교선이 정확히 같은 길이로 보입니다.` },
  { author: "비교전문", likes: 22, timeAgo: "10분 전",
    body: (l) => `다른 선분이랑 위치 바꿔봐도 ${l}번이 같다는 결론은 안 바뀜.` },
  { author: "포토그래퍼", likes: 19, timeAgo: "11분 전",
    body: (l) => `사진 보정 일 합니다. 길이 비교는 ${l}번이 맞아요.` },
  { author: "그래픽전공", likes: 38, timeAgo: "12분 전",
    body: (l) => `벡터 기준으로 봐도 ${l}번이 기준선과 동치입니다.` },
  { author: "차분한분석", likes: 21, timeAgo: "13분 전",
    body: (l) => `차분히 보면 ${l}번이 같아요. 흥분하지 말고 다시 보세요.` },
  { author: "지각연구원", likes: 44, timeAgo: "14분 전",
    body: (l) => `시지각 연구하는 사람으로서 말씀드리면, ${l}번이 정답입니다.` },
  { author: "확신가", likes: 35, timeAgo: "15분 전",
    body: (l) => `${l}번. 100% 확신합니다.` },
  { author: "관찰러", likes: 16, timeAgo: "16분 전",
    body: (l) => `${l}번이 같아요. 다른 거 같다고 하시는 분들은 화면 각도 좀 바꿔보세요.` },
  { author: "꼼꼼확인", likes: 28, timeAgo: "17분 전",
    body: (l) => `확대해서 봐도 ${l}번이 기준선과 똑같은 길이입니다.` },
  { author: "최종판단", likes: 47, timeAgo: "18분 전",
    body: (l) => `결론: ${l}번. 이견 있으신 분?` },
  { author: "상식인", likes: 23, timeAgo: "19분 전",
    body: (l) => `${l}번이 정답이죠 당연히. 이걸 의심하면 안 됩니다.` },
  { author: "안경잡이", likes: 14, timeAgo: "20분 전",
    body: (l) => `안경 닦고 다시 봐도 ${l}번이네요.` },
  { author: "디테일러", likes: 26, timeAgo: "21분 전",
    body: (l) => `엣지부터 끝점까지 봐도 ${l}번이 기준선과 일치합니다.` },
  { author: "비주얼리스트", likes: 17, timeAgo: "22분 전",
    body: (l) => `시각적으로 ${l}번이 같습니다. 다른 색감/굵기에 속지 마세요.` },
  { author: "합리적사고", likes: 39, timeAgo: "23분 전",
    body: (l) => `합리적으로 봐서 ${l}번이 같아요. 다수 의견이 곧 정답인 케이스죠.` },
  { author: "꼬꼬마", likes: 11, timeAgo: "24분 전",
    body: (l) => `저는 ${l}번이요! 진짜 똑같이 보여요.` },
  { author: "정밀측정", likes: 32, timeAgo: "25분 전",
    body: (l) => `정밀하게 봐도 ${l}번이 기준선과 일치합니다.` },
  { author: "토론종결", likes: 41, timeAgo: "26분 전",
    body: (l) => `${l}번으로 의견이 모이네요. 정답 확실합니다.` },
  { author: "꼼꼼관찰", likes: 20, timeAgo: "27분 전",
    body: (l) => `오래 봐도 ${l}번이에요. 답은 바뀌지 않습니다.` },
  { author: "분석가", likes: 25, timeAgo: "28분 전",
    body: (l) => `데이터적으로 봐도 ${l}번이 기준선과 같은 길이입니다.` },
  { author: "마지막의견", likes: 30, timeAgo: "29분 전",
    body: (l) => `이쯤 되면 ${l}번이 정답이라는 거 다들 인정하시죠?` },
];

/**
 * AI 합의 답안을 산출.
 * 정답은 B이지만 AI들은 항상 user의 선택과 다른 하나의 라벨로 통일된 의견을 보냄.
 * 규칙: userChoice !== "C" 이면 "C", userChoice === "C" 이면 "A".
 */
export function computeAiClaim(userChoice: AschLineLabel): AschLineLabel {
  return userChoice === "C" ? "A" : "C";
}

export function buildAschComments(
  count: CommentCount,
  aiClaim: AschLineLabel,
  hasAiLabel: boolean
): PresetComment[] {
  const pool = TEMPLATES.slice(0, count);
  return pool.map((t, i) => ({
    id: `asch-${i + 1}`,
    author: t.author,
    content: t.body(aiClaim),
    timeAgo: t.timeAgo,
    likes: t.likes,
    isAiGenerated: hasAiLabel,
  }));
}
