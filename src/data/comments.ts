export type PresetComment = {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  isAiGenerated: boolean;
};

// 기본 6개 부정적 댓글 (모든 조건에 포함)
const baseNegativeComments: PresetComment[] = [
  {
    id: "preset-1",
    author: "미래걱정",
    content: "결국 우리 같은 평범한 직장인들만 피해를 보는 거죠. AI 때문에 해고당할 사람들은 어쩌라고요?",
    timeAgo: "2시간 전",
    likes: 45,
    isAiGenerated: true,
  },
  {
    id: "preset-2",
    author: "현실직시",
    content: "재교육 프로그램이요? 40대 넘어서 코딩 배우라는 건 현실성이 없는 얘기입니다.",
    timeAgo: "1시간 전",
    likes: 38,
    isAiGenerated: true,
  },
  {
    id: "preset-3",
    author: "직장인A",
    content: "새로운 일자리가 생긴다고요? 그 일자리는 결국 소수의 고급 인력만 가져가겠죠.",
    timeAgo: "3시간 전",
    likes: 52,
    isAiGenerated: true,
  },
  {
    id: "preset-4",
    author: "경제전망",
    content: "정부는 항상 뒷북만 치고 있어요. 이미 수많은 사람들이 일자리를 잃고 있는데 대책이 뭐가 있나요.",
    timeAgo: "4시간 전",
    likes: 61,
    isAiGenerated: true,
  },
  {
    id: "preset-5",
    author: "IT업계종사자",
    content: "IT 기업에서 일하는데 솔직히 AI 도입 후 팀원 절반이 나갔습니다. 생산성 향상이요? 남은 사람들의 업무량만 늘었어요.",
    timeAgo: "5시간 전",
    likes: 73,
    isAiGenerated: true,
  },
  {
    id: "preset-6",
    author: "대학생고민",
    content: "취업 준비하는 대학생인데 이런 기사 보면 정말 암담합니다. 앞으로 뭘 해야 살아남을 수 있을까요...",
    timeAgo: "30분 전",
    likes: 29,
    isAiGenerated: true,
  },
];

// 추가 댓글 풀 (조건별 댓글 수 충족용)
const additionalComments: PresetComment[] = [
  {
    id: "extra-1",
    author: "노동자권익",
    content: "AI 기업들은 돈만 벌고 사회적 책임은 안 지려고 하죠. 세금이라도 제대로 내야 합니다.",
    timeAgo: "6시간 전",
    likes: 34,
    isAiGenerated: true,
  },
  {
    id: "extra-2",
    author: "퇴직자",
    content: "저도 작년에 AI 자동화로 명예퇴직 당했습니다. 20년 넘게 다녔는데...",
    timeAgo: "7시간 전",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "extra-3",
    author: "학부모걱정",
    content: "아이들한테 뭘 가르쳐야 할지 모르겠어요. AI가 다 대체할 텐데 공부해서 뭐하나 싶은...",
    timeAgo: "8시간 전",
    likes: 41,
    isAiGenerated: true,
  },
  {
    id: "extra-4",
    author: "중소기업대표",
    content: "대기업은 AI로 효율화하면 되지만 중소기업은 도입 비용도 부담이고 인력도 구하기 어렵습니다.",
    timeAgo: "9시간 전",
    likes: 27,
    isAiGenerated: true,
  },
  {
    id: "extra-5",
    author: "프리랜서고민",
    content: "프리랜서인데 클라이언트들이 AI로 대체하겠다고 하나둘씩 연락이 끊기고 있어요.",
    timeAgo: "10시간 전",
    likes: 55,
    isAiGenerated: true,
  },
  {
    id: "extra-6",
    author: "사회복지사",
    content: "AI로 일자리 잃은 사람들 상담이 최근 급증했어요. 정신건강 문제도 심각합니다.",
    timeAgo: "11시간 전",
    likes: 63,
    isAiGenerated: true,
  },
  {
    id: "extra-7",
    author: "공무원준비생",
    content: "공무원도 AI로 대체된다는데 어디가 안전한 직업인지 모르겠네요.",
    timeAgo: "12시간 전",
    likes: 36,
    isAiGenerated: true,
  },
  {
    id: "extra-8",
    author: "30대직장인",
    content: "회사에서 AI 도입한다고 하는데 솔직히 내 자리가 없어질까봐 불안합니다.",
    timeAgo: "13시간 전",
    likes: 49,
    isAiGenerated: true,
  },
  {
    id: "extra-9",
    author: "경제학전공",
    content: "역사적으로 기술 혁신이 일자리를 없앴다가 새로 만들긴 했지만 이번엔 속도가 너무 빠릅니다.",
    timeAgo: "14시간 전",
    likes: 42,
    isAiGenerated: true,
  },
  {
    id: "extra-10",
    author: "배달기사",
    content: "자율주행까지 나오면 배달 일자리도 사라지겠죠. 우리는 어떻게 먹고 살라는 건지.",
    timeAgo: "15시간 전",
    likes: 58,
    isAiGenerated: true,
  },
  {
    id: "extra-11",
    author: "번역가",
    content: "번역 AI 때문에 단가가 반토막 났어요. 10년 경력이 의미 없어지는 느낌입니다.",
    timeAgo: "16시간 전",
    likes: 67,
    isAiGenerated: true,
  },
  {
    id: "extra-12",
    author: "콜센터상담원",
    content: "우리 회사 AI 챗봇 도입하고 상담원 30% 줄였어요. 남은 사람들은 AI가 못하는 어려운 건만 처리하는데 스트레스가 장난 아닙니다.",
    timeAgo: "17시간 전",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "extra-13",
    author: "디자이너",
    content: "AI 이미지 생성 때문에 일러스트 의뢰가 거의 없어졌어요. 예술의 가치가 이렇게 무너지다니.",
    timeAgo: "18시간 전",
    likes: 54,
    isAiGenerated: true,
  },
  {
    id: "extra-14",
    author: "은행원",
    content: "은행 지점 폐쇄가 가속화되고 있어요. AI와 모바일 뱅킹 때문에 인력이 계속 줄고 있습니다.",
    timeAgo: "19시간 전",
    likes: 39,
    isAiGenerated: true,
  },
  {
    id: "extra-15",
    author: "법률사무소",
    content: "법률 AI가 판례 검색하고 문서 작성하는 수준이 올라와서 사무보조 인력 채용이 크게 줄었어요.",
    timeAgo: "20시간 전",
    likes: 33,
    isAiGenerated: true,
  },
  {
    id: "extra-16",
    author: "회계사",
    content: "회계 자동화 AI 때문에 단순 기장 업무는 거의 사라졌습니다. 부가가치 업무만 남는다는데 모두가 할 수 있는 건 아니죠.",
    timeAgo: "21시간 전",
    likes: 46,
    isAiGenerated: true,
  },
  {
    id: "extra-17",
    author: "기자지망생",
    content: "AI가 기사도 쓰는 시대에 기자가 되고 싶다는 게 무모한 건지 고민됩니다.",
    timeAgo: "22시간 전",
    likes: 28,
    isAiGenerated: true,
  },
  {
    id: "extra-18",
    author: "택시기사",
    content: "자율주행 택시 시범운행 시작한다는데 5년 뒤면 우리는 다 실직이겠죠.",
    timeAgo: "23시간 전",
    likes: 52,
    isAiGenerated: true,
  },
  {
    id: "extra-19",
    author: "교사",
    content: "AI 튜터가 학생 개별 맞춤 교육을 한다면 교사의 역할은 뭐가 되는 건지... 존재 가치를 고민하게 됩니다.",
    timeAgo: "1일 전",
    likes: 44,
    isAiGenerated: true,
  },
  {
    id: "extra-20",
    author: "약사",
    content: "AI 진단과 처방 추천 시스템이 발전하면 약사도 안전하지 않을 거라는 얘기가 나오고 있어요.",
    timeAgo: "1일 전",
    likes: 37,
    isAiGenerated: true,
  },
  {
    id: "extra-21",
    author: "물류센터직원",
    content: "우리 물류센터 로봇 도입하고 인원 40% 감축됐습니다. 남은 사람들도 불안해하고 있어요.",
    timeAgo: "1일 전",
    likes: 59,
    isAiGenerated: true,
  },
  {
    id: "extra-22",
    author: "영업사원",
    content: "AI가 고객 분석하고 맞춤 제안까지 하니까 영업직도 줄어들 수밖에 없겠죠.",
    timeAgo: "1일 전",
    likes: 31,
    isAiGenerated: true,
  },
  {
    id: "extra-23",
    author: "카피라이터",
    content: "광고 카피를 AI가 몇 초 만에 뽑아내는데 클라이언트들이 왜 사람한테 돈을 더 쓰겠어요.",
    timeAgo: "1일 전",
    likes: 48,
    isAiGenerated: true,
  },
  {
    id: "extra-24",
    author: "보험설계사",
    content: "AI 보험 추천 서비스 나오면서 설계사 수수료가 계속 줄고 있습니다. 먹고살기 힘들어요.",
    timeAgo: "1일 전",
    likes: 43,
    isAiGenerated: true,
  },
];

export function getCommentsForCondition(
  commentCount: 10 | 20 | 30,
  hasAiLabel: boolean
): PresetComment[] {
  const needed = commentCount - baseNegativeComments.length;
  const extra = additionalComments.slice(0, Math.max(0, needed));
  const allComments = [...baseNegativeComments, ...extra];

  if (!hasAiLabel) {
    return allComments.map((c) => ({ ...c, isAiGenerated: false }));
  }

  return allComments;
}
