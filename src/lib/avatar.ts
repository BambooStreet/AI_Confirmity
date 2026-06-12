// 유저명을 시드로 결정적(deterministic) 색을 골라, 사람 실루엣 아바타(SVG data-uri)를 생성.
// 외부 의존성·네트워크 요청 없음 — 완전 오프라인. 같은 author = 항상 같은 색의 실루엣.
// 한 번 생성한 결과는 모듈 캐시에 저장해 리렌더마다 재생성하지 않음.
const cache = new Map<string, string>();

// 다양한 실루엣 색 팔레트
const palette = [
  "#F59E0B", // 주황 (치즈태비)
  "#6B7280", // 회색
  "#92400E", // 갈색
  "#EC4899", // 분홍
  "#14B8A6", // 청록
  "#6366F1", // 인디고
  "#374151", // 검정
  "#10B981", // 초록
  "#EF4444", // 빨강
  "#0EA5E9", // 하늘
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

// 사람 실루엣(머리 + 어깨 bust) — 눈·코·입 없는 기본 프로필 아이콘 형태.
// 색 원 배경 + 실루엣을 배경 원으로 클립해 "원 안의 사람" 모양.
function personSvg(color: string): string {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
    '<defs><clipPath id="cp"><circle cx="32" cy="32" r="32"/></clipPath></defs>',
    `<circle cx="32" cy="32" r="32" fill="${color}" fill-opacity="0.15"/>`,
    `<g fill="${color}" clip-path="url(#cp)">`,
    '<circle cx="32" cy="23" r="11"/>',
    "<path d=\"M8 64 C8 46 18 40 32 40 C46 40 56 46 56 64 Z\"/>",
    "</g>",
    "</svg>",
  ].join("");
}

export function avatarDataUri(seed: string): string {
  const cached = cache.get(seed);
  if (cached) return cached;
  const color = palette[hash(seed) % palette.length];
  const uri =
    "data:image/svg+xml;utf8," + encodeURIComponent(personSvg(color));
  cache.set(seed, uri);
  return uri;
}
