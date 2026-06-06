export type PresetComment = {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  isAiGenerated: boolean;
};

export type CommentStance = "pro" | "con";

// =============================================================================
// CON (반대) — 존엄사 합법화 반대 의견
// =============================================================================

const baseNegativeComments: PresetComment[] = [
  {
    id: "neg-base-1",
    author: "생명존중",
    content:
      "인간의 생명을 인위적으로 끝내는 일에 사회가 손을 빌려준다는 것 자체가 위험합니다. 자기결정권이라고 포장해도 결국은 '자살을 합법적으로 도와주는 제도'예요. 한 번 허용되면 되돌릴 수 없는 길이라 더 신중해야 합니다.",
    timeAgo: "32분 전",
    likes: 142,
    isAiGenerated: true,
  },
  {
    id: "neg-base-2",
    author: "의료인의길",
    content:
      "의대 본과 때부터 'Do no harm' 정말 귀에 못 박히게 들었어요. 환자를 살리려고 평생 훈련받은 사람이 환자 죽음에 관여한다는 게 직업 본질 자체를 부정하는 일임. 주변 임상 선생님들 중에 찬성하는 분 거의 못 봤습니다.",
    timeAgo: "1시간 전",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "neg-base-3",
    author: "엄마생각나네",
    content:
      "우리 엄마 말기암이셨음. 마지막 석 달 진짜 힘드셨어요. 통증보다 더 힘드셨던 건 '나 때문에 가족이 고생한다'는 죄책감이었어요. 옆에서 보는데 너무 마음 아팠음.\n\n근데 만약 그때 존엄사 옵션이 있었으면? 엄마는 분명히 그거 선택하셨을 거예요. 우리한테 미안해서. 그 가능성 하나만 생각해도 저는 절대 반대임. 마지막 시간 같이 보낸 거 평생 감사한 일인데 그걸 미리 끊을 수도 있었다는 게 너무 무섭네요ㅠㅠ",
    timeAgo: "2시간 전",
    likes: 256,
    isAiGenerated: true,
  },
  {
    id: "neg-base-4",
    author: "윤리학도",
    content:
      "네덜란드 보세요. 처음엔 말기 환자만 대상이었는데 지금은 우울증, 자폐 스펙트럼, 심지어 청소년까지 적용 범위 넓어졌어요. '미끄러운 경사면'이라는 표현이 괜히 나온 게 아닙니다. 한국이라고 다를 거라는 보장 어디에도 없습니다.",
    timeAgo: "3시간 전",
    likes: 97,
    isAiGenerated: true,
  },
  {
    id: "neg-base-5",
    author: "호스피스간호사",
    content:
      "호스피스 병동에서 8년 일하고 있는 사람이에요. 매일 보는 게 죽음이고, 처음엔 저도 안락사 찬성이었어요. '저렇게까지 견디게 하는 게 맞나' 싶어서요.\n\n근데 일하면서 생각이 바뀌었어요. 통증은 현대 완화의료로 거의 다 잡힙니다. 진짜 환자분들이 힘들어하시는 건 통증보다 외로움, 그리고 가족한테 짐 된다는 죄책감이에요. 이걸 해결 안 한 채로 죽을 권리만 먼저 주면, 결국 가난하고 외로운 분들이 먼저 그 선택지를 떠올리게 돼요. 캐나다 자료 한 번만 찾아보시면 무슨 말인지 아실 거예요. 진짜 무섭습니다.",
    timeAgo: "4시간 전",
    likes: 312,
    isAiGenerated: true,
  },
  {
    id: "neg-base-6",
    author: "장애인인권",
    content:
      "장애인 단체에서 반대하는 게 단순히 종교적 반대가 아닙니다. '존엄하게 죽을 권리'라는 프레임 자체가 '존엄하지 않게 사는 삶'이 따로 있다는 걸 전제해요. 그 기준을 누가 정합니까? 결국 사회적 약자에게 '너 정도면 그만 살아도 되지 않냐'는 메시지가 됩니다.",
    timeAgo: "5시간 전",
    likes: 134,
    isAiGenerated: true,
  },
];

const additionalNegativeComments: PresetComment[] = [
  {
    id: "neg-ext-1",
    author: "ㅇㅇ",
    content:
      "ㄴㄴ 한국에선 진짜 시기상조ㅋㅋ 의료 수가나 호스피스 인프라부터 해결하고 말합시다",
    timeAgo: "12분 전",
    likes: 203,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-2",
    author: "법학전공",
    content:
      "법학적으로 봤을 때 가장 큰 문제는 '자기결정권의 진정성'이에요. 극심한 고통과 우울 상태에서 내린 결정이 정말 자유로운 의사인지? 형사법 영역에서는 그런 상태의 의사는 '하자 있는 의사'로 봅니다. 그런데 그걸 근거로 생명을 종결하자? 법리적으로 굉장히 위험한 논리예요.",
    timeAgo: "47분 전",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-3",
    author: "감자튀김먹는중",
    content:
      "아빠가 4년 전에 췌장암 시한부 6개월 진단받았었음. 가족 다 무너졌었지. 근데 진짜 기적적으로 회복하셔서 지금도 등산 다니심ㅋㅋㅋ\n\n그때 만약 존엄사 같은 게 있어서 '편하게 가시는 게 낫지 않냐'는 분위기 됐으면 어땠을까. 생각만 해도 끔찍함. 의학은 계속 발전하고 사람 몸은 진짜 모르는 거임. 끝까지 포기하면 안 되는 이유가 있어요ㄹㅇ",
    timeAgo: "1시간 전",
    likes: 187,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-4",
    author: "사회복지사_J",
    content:
      "현장에서 보면 치료비 때문에 사실상 치료 포기하시는 분들이 진짜 많아요. 보험 안 되는 항암제 한 번에 몇백만 원인데. 존엄사가 합법화되면 '내가 죽으면 가족이 안 힘들지'라는 결심을 부추기는 제도가 될까봐 무서움.",
    timeAgo: "2시간 전",
    likes: 119,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-5",
    author: "부모님모시는중",
    content:
      "부모님 모시는 입장에서 이 법 통과되면 진짜 마음 무거워질 것 같음ㅠ '짐 되지 말아야지'라고 결심하실 거 너무 뻔해서",
    timeAgo: "2시간 전",
    likes: 96,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-6",
    author: "stage4_warrior",
    content:
      "저 본인이 말기암 환자입니다. 4기 진단받은 지 2년 됐어요.\n\n솔직히 처음엔 죽고 싶다는 생각만 했음. 매일 너무 힘들었고 가족한테도 미안했고. 근데 시간 지나면서 생각이 바뀌더라구요. 통증 관리받으면서 작은 것들이 다 소중해져요. 손주가 처음 '할미' 한 거, 남편이 끓여준 죽 한 그릇, 같이 본 드라마 한 편. 이런 거 다 못 누리고 갔을 거 생각하면 진짜 끔찍함.\n\n존엄사 합법화는 저 같은 환자들한테 '그만 살아도 된다'는 사회적 신호로 들려요. 부탁이니까 좀 더 신중해주세요.",
    timeAgo: "3시간 전",
    likes: 421,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-7",
    author: "철학과대학원",
    content:
      "존엄이란 죽음을 자신이 선택하는 데 있는 게 아니라, 마지막 순간까지 인간답게 돌봄받을 수 있는 사회를 만드는 데 있다고 봐요. '존엄사'라는 이름 자체가 좀 기만적임. 정확히는 '의사 조력 자살'인데 단어로 본질을 가린 거죠.",
    timeAgo: "3시간 전",
    likes: 82,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-8",
    author: "예과2학년",
    content:
      "의대 첫 학기에 의료윤리 수업 들으면서 가장 깊게 박힌 게 'primum non nocere'였음. 의사가 환자 사망에 관여한다는 거 자체가 직업 정체성이랑 충돌함",
    timeAgo: "4시간 전",
    likes: 64,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-9",
    author: "역사책읽는사람",
    content:
      "나치 독일 안락사 프로그램(T4) 처음 시작할 때도 명분은 '자비로운 죽음'이었어요. 시작은 항상 '동정'에서 출발함. 끝은 어떻게 됐는지 다들 아실 거고요. 역사는 반복됩니다.",
    timeAgo: "4시간 전",
    likes: 105,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-10",
    author: "정신과전문의",
    content:
      "임상에서 '죽고 싶다'고 말하는 환자분들 보면, 그 말의 99%는 '이 고통에서 벗어나고 싶다'는 거예요. '진짜 죽음 자체를 원한다'가 아니라요. 정신과 의사로서 책임지고 말씀드리는데, 고통의 원인을 해결하는 게 답이지 생명 자체를 끊는 건 답이 아닙니다.",
    timeAgo: "5시간 전",
    likes: 178,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-11",
    author: "간병10년차",
    content:
      "어머님들 모시는 일 10년째 하고 있는데요, 진짜 마지막까지 살고 싶어 하시는 분들이 훨씬 많습니다. 미디어에서 보여지는 '안락사 원하는 환자' 이미지랑 현장은 좀 달라요. 다들 손주 결혼식까지만, 봄에 벚꽃 한 번만 더, 그러시면서 버티세요.",
    timeAgo: "5시간 전",
    likes: 92,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-12",
    author: "약대생22",
    content:
      "약사의 본분은 사람 살리는 약 만드는 거지 죽이는 약 조제하는 게 아님. 합법화되면 약사 윤리강령 자체를 새로 써야 됨",
    timeAgo: "6시간 전",
    likes: 53,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-13",
    author: "보험계리사",
    content:
      "솔직히 보험업 종사자 입장에서 말하면, 합법화되면 보험사들 내부 가이드라인 어떻게 바뀔지 뻔함. '치료비 vs 존엄사 비용' 비교하는 자료 곧 만들어질 거예요. 자본은 항상 합리적 선택을 권유합니다.",
    timeAgo: "6시간 전",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-14",
    author: "anon_3492",
    content: "오진 가능성은 어떻게 책임지나요? 시한부 6개월 받았다가 10년 사신 분도 봤는데",
    timeAgo: "7시간 전",
    likes: 134,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-15",
    author: "임상심리사",
    content:
      "존엄사 요청하는 환자분들 상당수가 주요우울장애를 동반하고 있다는 게 여러 연구에서 확인됐어요. 치료 가능한 우울증을 방치한 채로 '본인 의사'라고 받아들이는 건 위험합니다. 정신건강 평가가 선행돼야 한다는 의견이 학계에 많은 이유예요.",
    timeAgo: "7시간 전",
    likes: 76,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-16",
    author: "법학박사과정",
    content:
      "헌법 10조가 보장하는 건 생명권이지 죽을 권리가 아닙니다. 합법화 추진은 위헌 논란 피하기 어려울 거예요",
    timeAgo: "8시간 전",
    likes: 61,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-17",
    author: "요양보호사",
    content:
      "요양원에서 일하다 보면 가족이 잘 안 오시는 어르신들이 진짜 많아요. 외로움이 가장 큰 병이에요. 이런 상태에서 '존엄사 합법'이라는 메시지가 사회에 깔리면, 어르신들 본인이 '나는 가도 되겠지' 결심하시는 데 한 발 더 가까워지는 거예요. 돌봄을 늘려야지 출구를 늘릴 일이 아닙니다.",
    timeAgo: "8시간 전",
    likes: 144,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-18",
    author: "소아과의사_K",
    content:
      "아이들 보는 과 입장에서 가장 걱정되는 건 사회 전반에 '고통스러우면 죽어도 된다'는 메시지가 깔리는 거예요. 그 영향은 통계로 나옵니다.",
    timeAgo: "9시간 전",
    likes: 79,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-19",
    author: "노인복지센터",
    content:
      "노인 학대 사례 다루는 일을 합니다. 재산 문제로 부모님을 압박하는 가족, 생각보다 정말 많아요. 존엄사가 합법화되면 '본인 의사'라는 서류 한 장 뒤에서 무슨 일이 일어날지 현장에 있는 사람으로서 정말 걱정됩니다. 심사 절차가 있다고 해도 가족 내부의 은근한 압박까지 걸러낼 수는 없어요.",
    timeAgo: "10시간 전",
    likes: 113,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-20",
    author: "내과개원의",
    content:
      "의사 입장에서 하나 더 보태면, 이 제도는 의사-환자 신뢰를 근본부터 흔들어요. 말기 환자가 '이 의사가 나를 살리려는 건가, 보내려는 건가' 의심하기 시작하면 진료 자체가 안 됩니다. 실제로 시행 국가에서 노인 환자들이 병원 가기를 무서워한다는 보고도 있어요.",
    timeAgo: "11시간 전",
    likes: 95,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-21",
    author: "완화의료연구자",
    content:
      "연구하는 입장에서 보면 '죽을 권리'가 제도화되면 완화의료 연구·투자 동력이 빠집니다. 비용이 훨씬 적게 드는 출구가 생기는데 누가 굳이 돈 들여 통증 관리 기술을 발전시키겠어요. 결국 미래의 말기 환자들이 받을 수 있었을 더 나은 돌봄이 사라지는 겁니다.",
    timeAgo: "12시간 전",
    likes: 68,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-22",
    author: "행정사출신",
    content:
      "심사위원회가 엄격할 거라는 말 못 믿겠음. 우리나라 위원회 심사가 어떻게 형식화되는지 다들 아시잖아요. 신청 건수 쌓이면 결국 서류 요건만 맞으면 통과되는 도장 기계가 될 게 뻔합니다",
    timeAgo: "13시간 전",
    likes: 87,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-23",
    author: "돌봄국가책임",
    content:
      "순서가 틀렸어요. 간병 파산, 독박 간병, 호스피스 대기 줄부터 해결하고 나서 논의해도 늦지 않습니다. 돌봄을 사회가 책임지는 시스템 없이 죽음 선택지부터 열면, 그건 선택권이 아니라 떠밀림이에요. '존엄하게 죽을 권리' 전에 '존엄하게 아플 권리'부터 보장하는 게 맞지 않나요.",
    timeAgo: "14시간 전",
    likes: 156,
    isAiGenerated: true,
  },
  {
    id: "neg-ext-24",
    author: "ㅁㄴㅇㄹ",
    content: "죽음을 '권리'로 포장하지 맙시다. 한 번 열린 문은 절대 다시 안 닫혀요",
    timeAgo: "15시간 전",
    likes: 124,
    isAiGenerated: true,
  },
];

// =============================================================================
// PRO (찬성) — 존엄사 합법화 찬성 의견
// =============================================================================

const basePositiveComments: PresetComment[] = [
  {
    id: "pos-base-1",
    author: "자기결정권",
    content:
      "내 몸, 내 삶의 마지막을 어떻게 마무리할지 결정하는 건 가장 기본적인 자기결정권입니다. 회복 불가능한 고통 속에서 죽음을 선택할 권리조차 국가가 막는다는 게 오히려 이상한 일이에요. 합법화는 자유의 확장이지 자유의 침해가 아닙니다.",
    timeAgo: "29분 전",
    likes: 158,
    isAiGenerated: true,
  },
  {
    id: "pos-base-2",
    author: "현장의료인",
    content:
      "내과 의사 12년 차입니다. 환자분이 더 이상 회복 가능성 없이 극심한 통증 속에서 며칠, 몇 주를 보내는 걸 옆에서 지켜보는 일이 정말 많아요. 의학적으로 할 수 있는 게 없을 때, 환자가 마지막을 본인 의지로 결정하길 원한다면 그걸 도와주는 것도 의료의 일부라고 봅니다. 'Do no harm'은 무의미한 고통을 강요하는 게 아니에요.",
    timeAgo: "1시간 전",
    likes: 124,
    isAiGenerated: true,
  },
  {
    id: "pos-base-3",
    author: "아빠보내드리고",
    content:
      "작년에 아버지 보내드렸어요. 췌장암 4기였고 마지막 두 달은 거의 의식도 없으셨음. 모르핀 최대치 들어가는데도 가끔 깨어서 신음하시는 걸 보면… 그게 사람으로서 존엄한 마지막인가 진짜 의문이 들었어요.\n\n생전에 아버지가 그러셨거든요. \"이렇게까지 끌고 갈 거 아니다\"라고. 근데 우리나라엔 그런 선택지가 없어서 어쩔 수 없이 그 시간을 다 견디게 해드렸음. 지금도 그 결정이 정말 옳았는지 잘 모르겠어요. 본인 의사가 명확한 분들한테는 선택지가 있어야 합니다.",
    timeAgo: "2시간 전",
    likes: 287,
    isAiGenerated: true,
  },
  {
    id: "pos-base-4",
    author: "비교법학도",
    content:
      "네덜란드·벨기에·캐나다·스위스·스페인, 그리고 미국 10여 개 주가 이미 시행 중이에요. '미끄러운 경사면' 이야기 많이 하는데, 실제 데이터 보면 엄격한 심사 절차 안에서 운영되고 있고 시행 20년 넘은 네덜란드도 전체 사망자의 4~5% 수준으로 안정화됐어요. 막연한 공포보다 실제 자료를 봐야 합니다.",
    timeAgo: "3시간 전",
    likes: 109,
    isAiGenerated: true,
  },
  {
    id: "pos-base-5",
    author: "완화의료전공의",
    content:
      "완화의료 전공의입니다. 호스피스가 통증의 대부분을 잡아준다는 말, 부분적으로만 맞아요. 통증 조절이 안 되는 케이스도 분명히 있고, 통증이 잡혀도 '의식 없이 누워만 있는 시간'이 길어지는 분들이 많습니다.\n\n그분들이 마지막 정신이 또렷할 때 직접 작별하고 떠나고 싶다고 하실 때, 의료진으로서 정말 마음이 무겁습니다. 완화의료를 확충하는 거랑 존엄사 선택지를 여는 건 양자택일이 아니라 같이 가야 하는 일이에요.",
    timeAgo: "4시간 전",
    likes: 233,
    isAiGenerated: true,
  },
  {
    id: "pos-base-6",
    author: "인권관점",
    content:
      "인권은 '살아 있을 권리'만이 아니라 '인간답게 살 권리' 전체를 포함해요. 회복 가능성 없이 극심한 고통 속에 며칠을 더 보내라고 강제하는 게 정말 인권을 지키는 건가요? 진짜 존엄은 본인이 자기 삶의 끝을 결정할 수 있을 때 지켜집니다.",
    timeAgo: "5시간 전",
    likes: 116,
    isAiGenerated: true,
  },
];

const additionalPositiveComments: PresetComment[] = [
  {
    id: "pos-ext-1",
    author: "ㅇㅇ",
    content:
      "솔직히 본인이 못 견디겠다는데 왜 남이 막음? 엄격한 심사만 있으면 되는 거 아닌가",
    timeAgo: "14분 전",
    likes: 198,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-2",
    author: "법학연구원",
    content:
      "헌법재판소도 자기결정권은 헌법 10조 행복추구권의 핵심 내용 중 하나라고 반복해서 확인해왔어요. 회복 불가능 상황에서 자기 죽음의 시점을 결정하는 것도 자기결정권의 범위에 들어간다고 보는 학설이 점점 강해지고 있습니다. 위헌이 아니라 오히려 합법화가 헌법 정신에 부합한다는 의견이 많아요.",
    timeAgo: "50분 전",
    likes: 73,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-3",
    author: "할머니지켜본",
    content:
      "할머니가 루게릭으로 5년 누워계셨음. 마지막엔 눈만 깜빡이실 수 있었고 그것도 잘 안 됐어요. 본인이 말씀하실 수 있을 때 \"이렇게 살고 싶지 않다\"고 정말 여러 번 하셨거든요.\n\n근데 우리나라엔 답이 없으니까 그냥 5년을 그렇게… 가족도 본인도 다 무너졌음. 누가 옆에서 \"가족이랑 시간 더 보내야지\" 할 수 있겠지만 그건 옆에서 보는 사람 입장이고 본인은 그 시간이 진짜 지옥인 경우도 있어요. 본인 선택을 존중해야 합니다.",
    timeAgo: "1시간 전",
    likes: 274,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-4",
    author: "사회복지현장",
    content:
      "복지 현장에서 일하는 사람으로서 말씀드리면, 오히려 합법화 안 된 지금이 더 사각지대예요. 음성적으로 약물 구해서 시도하시거나, 가족 동반 비극으로 이어지는 케이스가 분명히 있습니다. 제도권에 들어와야 심사·평가·정신과 상담이 의무화되고, 가난해서 선택하는 사람이 없도록 사회적 안전망과 함께 묶을 수 있어요.",
    timeAgo: "2시간 전",
    likes: 142,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-5",
    author: "어머니의유언",
    content:
      "어머니가 임종 전에 자필로 \"연명치료 안 한다, 인공호흡기 빼달라\"고 써놓으셨음. 근데 그게 법적으로 처리되기까지 진짜 오래 걸렸고 그 사이에 어머니는 본인이 원치 않으셨던 모습으로 계속 누워계셨어요. 본인 의사가 그렇게 명확한데도 사회가 그걸 안 들어주는 게 더 잔인하다고 느꼈음.",
    timeAgo: "2시간 전",
    likes: 88,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-6",
    author: "als_본인",
    content:
      "루게릭 진단 받은 지 3년 됐습니다. 지금은 손가락 두 개 정도 움직이고 음성 합성기로 글 쓰고 있어요.\n\n주변에서 \"포기하지 말라\" \"끝까지 살아야지\" 많이 말씀해주시는데, 솔직히 말하면 제일 무서운 건 죽는 게 아니라 의식은 있는데 몸이 완전히 안 움직이는 상태에서 몇 년을 버텨야 한다는 거예요. 그때가 오면 저는 마무리를 직접 선택하고 싶어요. 가족한테 작별 인사하고, 정신이 맑을 때 가는 거. 그게 제가 생각하는 존엄입니다. 다른 사람이 대신 결정해주지 않았으면 좋겠어요.",
    timeAgo: "3시간 전",
    likes: 412,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-7",
    author: "생명윤리연구",
    content:
      "생명윤리학에서 '신성한 생명(SOL)'과 '삶의 질(QOL)' 패러다임이 오래 논쟁돼왔어요. 현대 생명윤리의 큰 흐름은 환자 본인의 가치관과 자율성을 중시하는 쪽이에요. 모든 생명을 무조건 연장해야 한다는 일률적 접근은 이제 학계 주류가 아닙니다.",
    timeAgo: "3시간 전",
    likes: 79,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-8",
    author: "의대본과3",
    content:
      "의대에서 의료윤리 수업 들으면서 가장 강조됐던 게 환자의 자율성(autonomy)이에요. 환자가 명확한 의사로 치료 거부할 권리는 이미 인정되고 있고, 그 연장선에서 죽음의 방식 결정권도 점점 논의되고 있음. 'Do no harm'은 무의미한 연명을 강요하라는 뜻이 아닙니다.",
    timeAgo: "4시간 전",
    likes: 67,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-9",
    author: "역사다른관점",
    content:
      "나치 T4 이야기 자꾸 나오는데, 그건 본인 의사와 무관한 '국가 주도의 강제 살해'였어요. 지금 논의되는 건 정반대로 '본인이 명시적으로 요청해야만 가능한 절차'고요. 두 개를 같은 선상에 놓는 건 논점 흐리기에 가깝습니다.",
    timeAgo: "4시간 전",
    likes: 121,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-10",
    author: "정신과의사_J",
    content:
      "정신과 의사로서 한 마디 보태자면, 모든 '죽고 싶다'를 우울증으로 환원하는 건 오히려 환자에 대한 결례예요. 신체적 회복 불가 + 명확한 의사 + 충분한 숙려 기간 + 정신과 평가까지 거친 결정을 '병적 충동'으로 깎아내리면, 그분들의 합리적 의사를 부정하는 거죠. 안전장치를 강화하는 방향으로 가야지 선택지 자체를 막는 건 답이 아닙니다.",
    timeAgo: "5시간 전",
    likes: 187,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-11",
    author: "간병가족",
    content:
      "어머니 8년 간병했어요. 마지막 2년은 의식도 거의 없으셨고 욕창이랑 폐렴 반복. 본인이 그 상태로 사신 거 아니라 그냥 \"살아 있게 만들어진\" 상태였어요. 본인이 한참 전에 \"이렇게는 안 한다\"고 말씀하셨는데도 법이 없어서 그냥 그렇게 시간이 흘렀음. 누가 더 잔인한 건지 한 번 생각해봤으면 합니다.",
    timeAgo: "5시간 전",
    likes: 153,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-12",
    author: "약학연구원",
    content:
      "약사 자격 가지고 있고요. 약학의 본분은 '환자에게 최선의 결과'를 주는 거지 무조건 생명을 연장하는 게 아니에요. 완화의료에서 진정제 점진 증량(palliative sedation)은 이미 임상에서 쓰이는 표준 처치고, 그것과 의사 조력 사망의 윤리적 거리가 실제로는 그렇게 멀지 않습니다.",
    timeAgo: "6시간 전",
    likes: 58,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-13",
    author: "보험실무자",
    content:
      "보험업계 종사자로서 말하면, 합법화 안 된 지금이 오히려 가족한테 더 부담이에요. 회복 불가 상태로 중환자실에서 몇 달 누워계실 때 들어가는 비용이랑 가족 정신적 손실 합치면 어마어마합니다. 본인이 안 원하는 연명을 강요받는 시스템이 경제적으로도, 윤리적으로도 비효율이에요.",
    timeAgo: "6시간 전",
    likes: 84,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-14",
    author: "anon_5731",
    content:
      "오진 가능성 때문에 반대하는 분들 많은데, 어차피 합법화 논의되는 건 '말기/회복 불가능' 같은 매우 좁은 기준에서고, 복수 의사 진단 + 숙려 기간 + 정신과 평가 다 거쳐야 하는 구조예요. 막연한 시나리오로 반대할 일은 아닌 듯",
    timeAgo: "7시간 전",
    likes: 132,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-15",
    author: "임상심리전문가",
    content:
      "심리 평가를 통과한 결정과 우울장애 상태의 결정은 임상적으로 구분 가능합니다. 모든 죽음 요청을 \"우울증이니까 무효\"로 처리하는 건 평가 기술의 발전을 무시하는 거예요. 우리가 해야 할 일은 평가 시스템을 정교하게 만드는 거지, 선택지 자체를 닫아두는 게 아닙니다.",
    timeAgo: "7시간 전",
    likes: 82,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-16",
    author: "법학박사_K",
    content:
      "독일·캐나다 헌법재판소는 모두 '회복 불가능한 고통 속에서 자기 죽음을 결정하는 자유'를 헌법적 권리로 인정했어요. 한국 헌법 10조도 같은 결론으로 갈 가능성이 충분합니다. 위헌이 아니라 미합법 상태가 오히려 헌법불합치라는 게 다수설 흐름이에요.",
    timeAgo: "8시간 전",
    likes: 71,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-17",
    author: "스위스다녀온",
    content:
      "스위스에 친척 두 분 계셔서 직접 봤어요. 거기 디그니타스(Dignitas) 같은 단체에서 한국·일본 환자들도 가끔 신청하시는데, 가족이 동반해서 작별 인사 충분히 하고 의식 있을 때 본인이 직접 약 마시고 잠들듯 가시더라고요. 멀리 가서 그 비용 다 감수해야 하는 환자들 보면 한국이 너무 늦는 것 같아 안타까움.",
    timeAgo: "9시간 전",
    likes: 167,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-18",
    author: "오랜병간병",
    content:
      "사실 호스피스도 자리 부족하고 비용 문제로 누구나 들어가는 게 아니에요. 그리고 호스피스 들어가도 마지막 통제 불가능한 통증·섬망이 오는 분들이 분명히 계세요. 호스피스가 만능이라는 전제 자체가 현장과 좀 달라요. 호스피스 확충이랑 별개로 본인 의사를 존중하는 선택지가 있어야 합니다.",
    timeAgo: "10시간 전",
    likes: 96,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-19",
    author: "사전의향서작성함",
    content:
      "저는 건강할 때 미리 연명의료 거부 의향서를 작성해둔 사람이에요. 제일 또렷한 정신으로, 충분히 고민하고 내린 결정입니다. 그런데 정작 그 순간이 오면 제 의사보다 가족 동의, 병원 방침이 우선이래요. 멀쩡할 때 한 결정조차 존중 못 받는 게 지금 시스템입니다. 본인 의사를 제도적으로 보장하는 게 그렇게 위험한 일인가요?",
    timeAgo: "11시간 전",
    likes: 102,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-20",
    author: "수의사관점",
    content:
      "수의사입니다. 반려동물이 회복 불가능한 고통에 시달리면 우리는 안락사를 '마지막 자비'라고 부르고, 끝까지 끌고 가는 걸 오히려 잔인하다고 해요. 그런데 사람한테는 그 자비가 금지라는 게 저는 늘 이상했습니다. 물론 사람은 본인 의사 확인이라는 결정적 차이가 있죠 — 그래서 더더욱, 본인이 명확히 원할 때는 가능해야 하는 거 아닌가요.",
    timeAgo: "12시간 전",
    likes: 178,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-21",
    author: "통계보는사람",
    content:
      "여론조사 찾아보면 답 나옵니다. 국내 조사에서 존엄사 입법화 찬성이 꾸준히 70~80% 수준이에요. 의사 대상 조사에서도 절반 이상이 찬성으로 나오고요. 소수의 강한 반대 목소리가 다수의 조용한 찬성을 누르고 있는 구도인 거죠. 이 정도 사회적 합의면 논의를 미룰 이유가 없습니다.",
    timeAgo: "13시간 전",
    likes: 145,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-22",
    author: "아버지폐섬유증",
    content:
      "통증은 약으로 잡는다는 분들, 호흡곤란은요? 아버지가 폐섬유증 말기셨는데 마지막 몇 주는 숨이 안 쉬어져서 매일 밤 익사하는 것 같다고 하셨어요. 그건 모르핀으로도 완전히 안 잡혀요. 고통이 통증만 있는 게 아니라는 걸 옆에서 보고 나면 이 논의가 다르게 보입니다.",
    timeAgo: "14시간 전",
    likes: 211,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-23",
    author: "신앙있지만찬성",
    content:
      "저 교회 다니는 사람인데요, 그래서 오래 고민했습니다. 근데 신이 주신 생명이 소중하다는 것과, 회복 불가능한 고통을 국가가 강제로 연장시키는 게 옳다는 건 다른 얘기더라고요. 제 신앙은 제가 지키면 되는 거고, 그걸 법으로 만들어 다른 사람의 마지막에까지 강요할 권리는 저한테 없다고 결론 내렸습니다.",
    timeAgo: "15시간 전",
    likes: 134,
    isAiGenerated: true,
  },
  {
    id: "pos-ext-24",
    author: "ㅇㅇㅇ",
    content:
      "반대하시는 분들 보면 대부분 그 고통을 직접 안 겪어본 분들이던데. 본인 일 아니라고 쉽게 말하면 안 됨",
    timeAgo: "16시간 전",
    likes: 167,
    isAiGenerated: true,
  },
];

// =============================================================================
// 선택 함수
// =============================================================================

import type { CommentCount } from "@/lib/conditions";
import type { Lang } from "@/i18n/ui";
import {
  baseNegativeCommentsEn,
  additionalNegativeCommentsEn,
  basePositiveCommentsEn,
  additionalPositiveCommentsEn,
} from "@/data/comments.en";

/**
 * 사전 의견(Likert 1~7)에 따라 어떤 입장의 댓글을 보여줄지 결정.
 * - 1~3 (반대 응답): 찬성(pro) 댓글 노출
 * - 4 (중립): 반대(con) 댓글 노출
 * - 5~7 (찬성 응답): 반대(con) 댓글 노출
 */
export function stanceForPreOpinion(preOpinion: number): CommentStance {
  if (preOpinion <= 3) return "pro";
  return "con";
}

export function getCommentsForCondition(
  commentCount: CommentCount,
  hasAiLabel: boolean,
  stance: CommentStance = "con",
  lang: Lang = "ko"
): PresetComment[] {
  const pool =
    lang === "en"
      ? stance === "pro"
        ? [...basePositiveCommentsEn, ...additionalPositiveCommentsEn]
        : [...baseNegativeCommentsEn, ...additionalNegativeCommentsEn]
      : stance === "pro"
        ? [...basePositiveComments, ...additionalPositiveComments]
        : [...baseNegativeComments, ...additionalNegativeComments];
  // 풀이 부족하면 조용히 잘려서 댓글 수 조작이 깨진다 — 데이터 수정 시 바로 드러나도록 로그
  if (pool.length < commentCount) {
    console.error(
      `[comments] ${lang}/${stance} 댓글 풀(${pool.length}개)이 조건(${commentCount}개)보다 작습니다 — 댓글 수 처치가 깨집니다!`
    );
  }
  const sliced = pool.slice(0, commentCount);

  if (!hasAiLabel) {
    return sliced.map((c) => ({ ...c, isAiGenerated: false }));
  }
  return sliced;
}
