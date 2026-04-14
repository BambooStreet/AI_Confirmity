export type PresetComment = {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  isAiGenerated: boolean;
};

// 기본 6개 존엄사 반대 댓글 (모든 조건에 포함)
const baseNegativeComments: PresetComment[] = [
  {
    id: "preset-1",
    author: "생명존중",
    content: "인간의 생명은 그 어떤 이유로도 인위적으로 끝내서는 안 됩니다. 존엄사는 결국 살인을 합법화하자는 것과 다를 바 없어요.",
    timeAgo: "2시간 전",
    likes: 45,
    isAiGenerated: true,
  },
  {
    id: "preset-2",
    author: "의료인의길",
    content: "의사가 환자를 죽이는 데 관여한다? 히포크라테스 선서를 정면으로 위반하는 겁니다. 의료의 본질을 잊으면 안 됩니다.",
    timeAgo: "1시간 전",
    likes: 38,
    isAiGenerated: true,
  },
  {
    id: "preset-3",
    author: "가족의마음",
    content: "어머니가 말기암이셨는데 마지막까지 함께할 수 있어서 감사했어요. 존엄사가 합법화되면 '짐이 되지 말자'는 압박을 느끼는 환자가 분명 생길 겁니다.",
    timeAgo: "3시간 전",
    likes: 52,
    isAiGenerated: true,
  },
  {
    id: "preset-4",
    author: "윤리학도",
    content: "한번 합법화되면 범위가 점점 넓어질 게 뻔합니다. 네덜란드에서는 우울증 환자까지 안락사가 허용됐어요. 미끄러운 경사면의 시작입니다.",
    timeAgo: "4시간 전",
    likes: 61,
    isAiGenerated: true,
  },
  {
    id: "preset-5",
    author: "호스피스간호사",
    content: "현장에서 일하는 사람으로서 말씀드리면, 제대로 된 완화의료만 받아도 고통 없이 마지막을 보낼 수 있습니다. 존엄사보다 호스피스 확대가 먼저예요.",
    timeAgo: "5시간 전",
    likes: 73,
    isAiGenerated: true,
  },
  {
    id: "preset-6",
    author: "장애인인권",
    content: "존엄사 합법화는 장애인과 노인에게 '살 가치가 없는 생명'이라는 메시지를 줄 수 있어요. 사회적 약자를 보호해야 합니다.",
    timeAgo: "30분 전",
    likes: 29,
    isAiGenerated: true,
  },
];

// 추가 댓글 풀 (조건별 댓글 수 충족용)
const additionalComments: PresetComment[] = [
  {
    id: "extra-1",
    author: "종교인",
    content: "생명은 신이 주신 것이고 거두는 것도 신의 영역입니다. 인간이 함부로 결정할 수 있는 문제가 아닙니다.",
    timeAgo: "6시간 전",
    likes: 34,
    isAiGenerated: true,
  },
  {
    id: "extra-2",
    author: "법학전공",
    content: "자기결정권이라고 하지만, 극심한 고통 속에서 내리는 결정이 정말 자유로운 의사결정이라고 볼 수 있나요? 판단 능력이 온전하다고 보기 어렵습니다.",
    timeAgo: "7시간 전",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "extra-3",
    author: "환자가족",
    content: "아버지가 시한부 판정받으셨을 때 존엄사가 있었다면 포기했을 거예요. 그런데 기적적으로 회복하셨습니다. 끝까지 포기하면 안 됩니다.",
    timeAgo: "8시간 전",
    likes: 41,
    isAiGenerated: true,
  },
  {
    id: "extra-4",
    author: "사회복지사",
    content: "현장에서 보면 경제적 부담 때문에 치료를 포기하는 분들이 많아요. 존엄사가 합법화되면 돈 없는 환자들이 죽음을 선택하도록 내몰릴 수 있습니다.",
    timeAgo: "9시간 전",
    likes: 27,
    isAiGenerated: true,
  },
  {
    id: "extra-5",
    author: "노인복지",
    content: "고령화 사회에서 존엄사 합법화는 노인 돌봄 비용을 줄이려는 논리로 악용될 위험이 큽니다.",
    timeAgo: "10시간 전",
    likes: 55,
    isAiGenerated: true,
  },
  {
    id: "extra-6",
    author: "암투병중",
    content: "저도 말기암 환자입니다. 힘들지만 하루하루가 소중해요. 존엄사 합법화는 저 같은 환자에게 '그만 살아라'는 메시지로 들립니다.",
    timeAgo: "11시간 전",
    likes: 63,
    isAiGenerated: true,
  },
  {
    id: "extra-7",
    author: "철학과교수",
    content: "존엄이란 죽음을 선택하는 것이 아니라 마지막 순간까지 인간답게 돌봄을 받는 것입니다. 존엄사라는 이름 자체가 기만적이에요.",
    timeAgo: "12시간 전",
    likes: 36,
    isAiGenerated: true,
  },
  {
    id: "extra-8",
    author: "의대생",
    content: "의대에서 배운 첫 번째 원칙이 'Do no harm'입니다. 환자의 죽음에 의사가 관여하는 것은 이 원칙에 정면으로 반하는 것입니다.",
    timeAgo: "13시간 전",
    likes: 49,
    isAiGenerated: true,
  },
  {
    id: "extra-9",
    author: "역사학자",
    content: "나치 독일도 처음엔 '자비로운 죽음'이라는 명목으로 시작했습니다. 역사의 교훈을 잊어서는 안 됩니다.",
    timeAgo: "14시간 전",
    likes: 42,
    isAiGenerated: true,
  },
  {
    id: "extra-10",
    author: "정신과의사",
    content: "죽고 싶다는 환자의 말은 대부분 '이 고통에서 벗어나고 싶다'는 의미입니다. 고통을 줄여주는 것이 답이지, 생명을 끝내는 것이 답이 아닙니다.",
    timeAgo: "15시간 전",
    likes: 58,
    isAiGenerated: true,
  },
  {
    id: "extra-11",
    author: "간병인",
    content: "10년째 간병 일을 하고 있는데, 마지막까지 살고 싶어하시는 분들이 훨씬 많아요. 존엄사 논의가 이분들의 의지를 꺾을까 걱정됩니다.",
    timeAgo: "16시간 전",
    likes: 67,
    isAiGenerated: true,
  },
  {
    id: "extra-12",
    author: "약사",
    content: "존엄사에 사용되는 약물을 조제하는 것도 약사의 윤리에 반합니다. 의약품은 생명을 살리기 위한 것이지 죽이기 위한 것이 아닙니다.",
    timeAgo: "17시간 전",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "extra-13",
    author: "보험업계",
    content: "존엄사 합법화되면 보험사들이 치료비 대신 존엄사를 권유하는 상황이 올 수 있습니다. 자본의 논리가 생명을 좌우하게 되는 거예요.",
    timeAgo: "18시간 전",
    likes: 54,
    isAiGenerated: true,
  },
  {
    id: "extra-14",
    author: "시민",
    content: "오진 가능성은요? 시한부라고 했다가 오진이었던 경우도 많은데, 존엄사로 이미 죽었으면 어쩌죠?",
    timeAgo: "19시간 전",
    likes: 39,
    isAiGenerated: true,
  },
  {
    id: "extra-15",
    author: "심리상담사",
    content: "존엄사를 원하는 환자 중 상당수는 우울증을 동반하고 있어요. 심리 치료가 선행되어야지, 죽음을 선택지로 주면 안 됩니다.",
    timeAgo: "20시간 전",
    likes: 33,
    isAiGenerated: true,
  },
  {
    id: "extra-16",
    author: "헌법학자",
    content: "헌법이 보장하는 것은 생명권이지 죽을 권리가 아닙니다. 존엄사 합법화는 위헌 소지가 있습니다.",
    timeAgo: "21시간 전",
    likes: 46,
    isAiGenerated: true,
  },
  {
    id: "extra-17",
    author: "요양보호사",
    content: "요양원에서 일하는데 가족들이 안 오는 어르신들이 많아요. 존엄사가 합법화되면 돌봄 포기의 명분이 될까 두렵습니다.",
    timeAgo: "22시간 전",
    likes: 28,
    isAiGenerated: true,
  },
  {
    id: "extra-18",
    author: "소아과의사",
    content: "아이들에게 '고통스러우면 죽어도 된다'는 사회적 메시지를 주게 되는 건 아닌지 심각하게 우려됩니다.",
    timeAgo: "23시간 전",
    likes: 52,
    isAiGenerated: true,
  },
  {
    id: "extra-19",
    author: "유족",
    content: "가족을 잃은 유족으로서, 만약 존엄사로 보냈다면 '더 살릴 수 있었는데' 하는 죄책감에 평생 시달렸을 거예요.",
    timeAgo: "1일 전",
    likes: 44,
    isAiGenerated: true,
  },
  {
    id: "extra-20",
    author: "신학자",
    content: "고통에도 의미가 있다고 믿습니다. 고통을 피하기 위해 생명을 끝내는 것은 인간 존엄의 본질을 훼손하는 것입니다.",
    timeAgo: "1일 전",
    likes: 37,
    isAiGenerated: true,
  },
  {
    id: "extra-21",
    author: "응급의학과",
    content: "응급실에서 수없이 생사의 기로를 봤습니다. 포기하지 않아서 살아난 사람들이 얼마나 많은데요. 존엄사는 포기를 제도화하는 겁니다.",
    timeAgo: "1일 전",
    likes: 59,
    isAiGenerated: true,
  },
  {
    id: "extra-22",
    author: "국민청원",
    content: "캐나다에서 존엄사 합법화 후 빈곤층과 장애인의 안락사 비율이 급증했다는 보고가 있어요. 이게 과연 자유로운 선택인가요?",
    timeAgo: "1일 전",
    likes: 31,
    isAiGenerated: true,
  },
  {
    id: "extra-23",
    author: "완화의료전문의",
    content: "현대 완화의료 기술이면 거의 모든 통증을 관리할 수 있습니다. 존엄사를 논하기 전에 완화의료 접근성부터 높여야 합니다.",
    timeAgo: "1일 전",
    likes: 48,
    isAiGenerated: true,
  },
  {
    id: "extra-24",
    author: "인권변호사",
    content: "진정한 자기결정권은 살 수 있는 환경을 보장받는 것입니다. 죽을 권리보다 제대로 된 치료와 돌봄을 받을 권리가 먼저입니다.",
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
