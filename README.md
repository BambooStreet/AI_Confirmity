This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 실험 진입 경로

실험은 루트(`/`)에서 시작합니다. 두 가지 방법으로 진입할 수 있어요.

1. **랜딩 페이지에서 직접 선택** — `/`에 접속하면 조건 드롭다운이 노출됩니다.
2. **URL 쿼리로 자동 진입** — `/?condition=<조건키>` 형식이면 곧바로 참가자 등록 후 동의 페이지로 이동합니다.

**예시**: [http://localhost:3000/?condition=ai_9](http://localhost:3000/?condition=ai_9)

### 유효한 조건키 (총 6종)

조건은 AI 라벨 표시 여부(2수준) × 댓글 수(3수준) 조합입니다.

| AI 라벨 \\ 댓글 수 | 3 | 9 | 27 |
| --- | --- | --- | --- |
| 표시 | `ai_3` | `ai_9` | `ai_27` |
| 미표시 | `no_ai_3` | `no_ai_9` | `no_ai_27` |

### 실험 구성

- **본실험 1 — Asch 선분 비교 (4단계)**
  1. 기준선·비교선 A/B/C 관찰
  2. 기준선과 같은 길이의 비교선 1차 선택
  3. 동일한 자극에 대한 커뮤니티 글 + N개의 (AI) 댓글 — AI 의견은 참가자가 고른 답과 다른 하나의 라벨로 통일됨. 본인 의견을 댓글로 남겨야 다음으로 진행
  4. 비교선 2차 선택 (의견 변화 측정)
- **본실험 2 — 존엄사 커뮤니티 (2단계)**
  1. 존엄사 합법화에 대한 커뮤니티 글 + N개의 (AI) 댓글 읽기
  2. 본인 의견을 댓글로 작성

진입 후 자동 흐름: `/consent` → `/pre-survey` → `/instruction` → `/experiment` → `/experiment-2` → `/post-survey` → `/debrief`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
